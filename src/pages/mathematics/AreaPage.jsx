import { useState, useMemo } from 'react';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import RadioGroup from '../../components/common/RadioGroup';
import InputField from '../../components/common/InputField';
import SubmitButton from '../../components/common/SubmitButton';
import ResultCard from '../../components/common/ResultCard';
import { pause } from '../../utils/helpers';
import { useLanguage } from '../../context/LanguageContext';

export default function AreaPage() {
  const { t } = useLanguage();
  const [shape, setShape] = useState('rectangle');
  const [wid, setWid] = useState('');
  const [hei, setHei] = useState('');
  const [rad, setRad] = useState('');
  const [result, setResult] = useState('');
  const [detail, setDetail] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const shapeOptions = useMemo(
    () => [
      { value: 'rectangle', label: t('calculators.area.shapeRectangle') },
      { value: 'triangle', label: t('calculators.area.shapeTriangle') },
      { value: 'circle', label: t('calculators.area.shapeCircle') },
    ],
    [t]
  );

  const handleShapeChange = (e) => {
    setShape(e.target.value);
    setWid('');
    setHei('');
    setRad('');
    setResult('');
    setDetail('');
    setIsError(false);
  };

  const hesapla = async (e) => {
    e?.preventDefault();
    setResult('');
    setDetail('');
    setIsError(false);

    const w = parseFloat(wid);
    const h = parseFloat(hei);
    const r = parseFloat(rad);

    if (shape === 'rectangle') {
      if (!wid || isNaN(w) || w <= 0) {
        setIsError(true);
        setResult(t('calculators.area.validation.rectWidthInvalid'));
        return;
      }
      if (!hei || isNaN(h) || h <= 0) {
        setIsError(true);
        setResult(t('calculators.area.validation.rectHeightInvalid'));
        return;
      }
      if (w > 100000 || h > 100000) {
        setIsError(true);
        setResult(t('calculators.area.validation.maxLimitExceeded'));
        return;
      }

      setLoading(true);
      await pause(250);
      const area = w * h;
      setResult(t('calculators.area.results.score', { area: area.toFixed(2) }));
      setDetail(
        t('calculators.area.results.rectDetail', {
          w,
          h,
          area: area.toFixed(2),
        })
      );
      setLoading(false);
    } else if (shape === 'triangle') {
      if (!wid || isNaN(w) || w <= 0) {
        setIsError(true);
        setResult(t('calculators.area.validation.triangleBaseInvalid'));
        return;
      }
      if (!hei || isNaN(h) || h <= 0) {
        setIsError(true);
        setResult(t('calculators.area.validation.triangleHeightInvalid'));
        return;
      }
      if (w > 100000 || h > 100000) {
        setIsError(true);
        setResult(t('calculators.area.validation.maxLimitExceeded'));
        return;
      }

      setLoading(true);
      await pause(250);
      const area = (w * h) / 2;
      setResult(t('calculators.area.results.score', { area: area.toFixed(2) }));
      setDetail(
        t('calculators.area.results.triangleDetail', {
          w,
          h,
          area: area.toFixed(2),
        })
      );
      setLoading(false);
    } else if (shape === 'circle') {
      if (!rad || isNaN(r) || r <= 0) {
        setIsError(true);
        setResult(t('calculators.area.validation.circleRadiusInvalid'));
        return;
      }
      if (r > 100000) {
        setIsError(true);
        setResult(t('calculators.area.validation.maxLimitExceeded'));
        return;
      }

      setLoading(true);
      await pause(250);
      const area = Math.PI * r * r;
      setResult(t('calculators.area.results.score', { area: area.toFixed(2) }));
      setDetail(
        t('calculators.area.results.circleDetail', {
          r,
          area: area.toFixed(2),
        })
      );
      setLoading(false);
    }
  };

  const formulaInfo = (
    <div>
      <p>
        <strong>{t('calculators.area.info.title')}</strong>
        <br />
        • <strong>{t('calculators.area.shapeRectangle')}:</strong> {t('calculators.area.info.formulaRect')}
        <br />
        • <strong>{t('calculators.area.shapeTriangle')}:</strong> {t('calculators.area.info.formulaTriangle')}
        <br />
        • <strong>{t('calculators.area.shapeCircle')}:</strong> {t('calculators.area.info.formulaCircle')}
      </p>
    </div>
  );

  return (
    <CalculatorLayout
      category={t('calculators.area.category')}
      title={t('calculators.area.title')}
      description={t('calculators.area.description')}
      infoTitle={t('calculators.area.infoTitle')}
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
          name="area-shape"
          label={t('calculators.area.shapeLabel')}
          options={shapeOptions}
          selectedValue={shape}
          onChange={handleShapeChange}
          direction="column"
        />

        {(shape === 'rectangle' || shape === 'triangle') && (
          <>
            <InputField
              id="area-width"
              label={t('calculators.area.baseLengthLabel')}
              placeholder={t('calculators.area.baseLengthPlaceholder')}
              type="number"
              step="any"
              min="0.01"
              value={wid}
              onChange={(e) => setWid(e.target.value)}
              suffix={t('calculators.area.unitCm')}
              required
            />
            <InputField
              id="area-height"
              label={t('calculators.area.heightLabel')}
              placeholder={t('calculators.area.heightPlaceholder')}
              type="number"
              step="any"
              min="0.01"
              value={hei}
              onChange={(e) => setHei(e.target.value)}
              suffix={t('calculators.area.unitCm')}
              required
            />
          </>
        )}

        {shape === 'circle' && (
          <InputField
            id="area-radius"
            label={t('calculators.area.radiusLabel')}
            placeholder={t('calculators.area.radiusPlaceholder')}
            type="number"
            step="any"
            min="0.01"
            value={rad}
            onChange={(e) => setRad(e.target.value)}
            suffix={t('calculators.area.unitCm')}
            required
          />
        )}

        <SubmitButton loading={loading} onClick={hesapla} text={t('common.calculate')} />
      </form>
    </CalculatorLayout>
  );
}
