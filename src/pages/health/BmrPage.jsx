import { useState, useMemo } from 'react';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import RadioGroup from '../../components/common/RadioGroup';
import InputField from '../../components/common/InputField';
import SubmitButton from '../../components/common/SubmitButton';
import ResultCard from '../../components/common/ResultCard';
import { pause } from '../../utils/helpers';
import { useLanguage } from '../../context/LanguageContext';

export default function BmrPage() {
  const { language, t } = useLanguage();
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState('');
  const [detail, setDetail] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const genderOptions = useMemo(
    () => [
      { value: 'male', label: t('calculators.bmr.genderMale') },
      { value: 'female', label: t('calculators.bmr.genderFemale') },
    ],
    [t]
  );

  const hesapla = async (e) => {
    e?.preventDefault();
    setResult('');
    setDetail('');
    setIsError(false);

    const a = parseFloat(age);
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (!gender) {
      setIsError(true);
      setResult(t('calculators.bmr.validation.genderRequired'));
      return;
    }

    if (!age || isNaN(a)) {
      setIsError(true);
      setResult(t('calculators.bmr.validation.ageRequired'));
      return;
    }

    if (a < 1 || a > 120) {
      setIsError(true);
      setResult(t('calculators.bmr.validation.ageRange'));
      return;
    }

    if (!height || isNaN(h)) {
      setIsError(true);
      setResult(t('calculators.bmr.validation.heightRequired'));
      return;
    }

    if (h < 50 || h > 260) {
      setIsError(true);
      setResult(t('calculators.bmr.validation.heightRange'));
      return;
    }

    if (!weight || isNaN(w)) {
      setIsError(true);
      setResult(t('calculators.bmr.validation.weightRequired'));
      return;
    }

    if (w < 20 || w > 350) {
      setIsError(true);
      setResult(t('calculators.bmr.validation.weightRange'));
      return;
    }

    setLoading(true);
    await pause(250);

    let bmr = 0;
    if (gender === 'male') {
      // Harris-Benedict Formülü (Erkek)
      bmr = 66.47 + 13.75 * w + 5 * h - 6.76 * a;
    } else {
      // Harris-Benedict Formülü (Kadın)
      bmr = 655.1 + 9.563 * w + 1.85 * h - 4.68 * a;
    }

    const bmrRounded = Math.round(bmr);
    const localeCode = language === 'en' ? 'en-US' : 'tr-TR';
    const bmrFormatted = bmrRounded.toLocaleString(localeCode);
    const sedentaryFormatted = Math.round(bmrRounded * 1.2).toLocaleString(localeCode);
    const moderateFormatted = Math.round(bmrRounded * 1.55).toLocaleString(localeCode);

    setResult(t('calculators.bmr.results.score', { bmr: bmrFormatted }));
    setDetail(
      t('calculators.bmr.results.detail', {
        sedentary: sedentaryFormatted,
        moderate: moderateFormatted,
      })
    );
    setLoading(false);
  };

  const formulaInfo = (
    <div>
      <p>
        <strong>{t('calculators.bmr.info.formulaTitle')}</strong>
        <br />
        {t('calculators.bmr.info.formulaMale')}
        <br />
        {t('calculators.bmr.info.formulaFemale')}
      </p>
      <p>
        <strong>{t('calculators.bmr.info.activityTitle')}</strong>
        <br />
        {t('calculators.bmr.info.actSedentary')}
        <br />
        {t('calculators.bmr.info.actLight')}
        <br />
        {t('calculators.bmr.info.actModerate')}
        <br />
        {t('calculators.bmr.info.actHeavy')}
      </p>
    </div>
  );

  return (
    <CalculatorLayout
      category={t('calculators.bmr.category')}
      title={t('calculators.bmr.title')}
      description={t('calculators.bmr.description')}
      infoTitle={t('calculators.bmr.infoTitle')}
      infoContent={formulaInfo}
      result={
        <ResultCard
          result={result}
          detail={detail}
          isError={isError}
        />
      }
    >
      <form className="calculator-form" onSubmit={hesapla}>
        <RadioGroup
          name="bmr-gender"
          label={t('calculators.bmr.genderLabel')}
          options={genderOptions}
          selectedValue={gender}
          onChange={(e) => setGender(e.target.value)}
          direction="row"
        />

        <InputField
          id="bmr-age"
          label={t('calculators.bmr.ageLabel')}
          placeholder={t('calculators.bmr.agePlaceholder')}
          type="number"
          step="1"
          min="1"
          max="120"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          suffix={t('calculators.bmr.unitAge')}
          required
        />

        <InputField
          id="bmr-height"
          label={t('calculators.bmr.heightLabel')}
          placeholder={t('calculators.bmr.heightPlaceholder')}
          type="number"
          step="0.5"
          min="50"
          max="260"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          suffix={t('calculators.bmr.unitCm')}
          required
        />

        <InputField
          id="bmr-weight"
          label={t('calculators.bmr.weightLabel')}
          placeholder={t('calculators.bmr.weightPlaceholder')}
          type="number"
          step="0.1"
          min="20"
          max="350"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          suffix={t('calculators.bmr.unitKg')}
          required
        />

        <SubmitButton loading={loading} onClick={hesapla} text={t('common.calculate')} />
      </form>
    </CalculatorLayout>
  );
}
