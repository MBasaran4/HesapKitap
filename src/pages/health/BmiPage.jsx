import { useState } from 'react';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import InputField from '../../components/common/InputField';
import SubmitButton from '../../components/common/SubmitButton';
import ResultCard from '../../components/common/ResultCard';
import { pause } from '../../utils/helpers';
import { useLanguage } from '../../context/LanguageContext';

export default function BmiPage() {
  const { t } = useLanguage();
  const [boy, setBoy] = useState('');
  const [kilo, setKilo] = useState('');
  const [sonuc, setSonuc] = useState('');
  const [durum, setDurum] = useState('');
  const [normal, setNormal] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const hesapla = async (e) => {
    e?.preventDefault();
    setSonuc('');
    setDurum('');
    setNormal('');
    setIsError(false);

    const b = parseFloat(boy);
    const k = parseFloat(kilo);

    if (!boy || isNaN(b)) {
      setIsError(true);
      setSonuc(t('calculators.bmi.validation.heightRequired'));
      return;
    }

    if (b < 50 || b > 250) {
      setIsError(true);
      setSonuc(t('calculators.bmi.validation.heightRange'));
      return;
    }

    if (!kilo || isNaN(k)) {
      setIsError(true);
      setSonuc(t('calculators.bmi.validation.weightRequired'));
      return;
    }

    if (k < 20 || k > 350) {
      setIsError(true);
      setSonuc(t('calculators.bmi.validation.weightRange'));
      return;
    }

    setLoading(true);
    await pause(250);

    const boyMetre = b / 100;
    const endeks = k / (boyMetre * boyMetre);
    const minKilo = boyMetre * boyMetre * 18.5;
    const maxKilo = boyMetre * boyMetre * 24.9;

    setSonuc(t('calculators.bmi.results.score', { score: endeks.toFixed(2) }));

    if (endeks < 18.5) {
      setDurum(t('calculators.bmi.results.underweight'));
    } else if (endeks < 24.9) {
      setDurum(t('calculators.bmi.results.normal'));
    } else if (endeks < 29.9) {
      setDurum(t('calculators.bmi.results.overweight'));
    } else if (endeks < 34.9) {
      setDurum(t('calculators.bmi.results.obese1'));
    } else if (endeks < 39.9) {
      setDurum(t('calculators.bmi.results.obese2'));
    } else {
      setDurum(t('calculators.bmi.results.obese3'));
    }

    setNormal(
      t('calculators.bmi.results.idealRange', {
        min: minKilo.toFixed(1),
        max: maxKilo.toFixed(1),
      })
    );
    setLoading(false);
  };

  const formulaInfo = (
    <div>
      <p>
        <strong>{t('calculators.bmi.info.formulaText')}</strong>
      </p>
      <p>
        <strong>{t('calculators.bmi.info.whoRanges')}</strong>
        <br />
        {t('calculators.bmi.info.rangeUnderweight')}
        <br />
        {t('calculators.bmi.info.rangeNormal')}
        <br />
        {t('calculators.bmi.info.rangeOverweight')}
        <br />
        {t('calculators.bmi.info.rangeObese')}
      </p>
    </div>
  );

  return (
    <CalculatorLayout
      category={t('calculators.bmi.category')}
      title={t('calculators.bmi.title')}
      description={t('calculators.bmi.description')}
      infoTitle={t('calculators.bmi.infoTitle')}
      infoContent={formulaInfo}
      result={
        <ResultCard
          result={sonuc}
          status={durum}
          detail={normal}
          isError={isError}
        />
      }
    >
      <form className="calculator-form" onSubmit={hesapla}>
        <InputField
          id="bmi-boy"
          label={t('calculators.bmi.heightLabel')}
          placeholder={t('calculators.bmi.heightPlaceholder')}
          type="number"
          step="0.5"
          min="50"
          max="250"
          value={boy}
          onChange={(e) => setBoy(e.target.value)}
          suffix={t('calculators.bmi.unitCm')}
          required
        />

        <InputField
          id="bmi-kilo"
          label={t('calculators.bmi.weightLabel')}
          placeholder={t('calculators.bmi.weightPlaceholder')}
          type="number"
          step="0.1"
          min="20"
          max="350"
          value={kilo}
          onChange={(e) => setKilo(e.target.value)}
          suffix={t('calculators.bmi.unitKg')}
          required
        />

        <SubmitButton loading={loading} onClick={hesapla} text={t('common.calculate')} />
      </form>
    </CalculatorLayout>
  );
}
