import { useState, useMemo } from 'react';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import RadioGroup from '../../components/common/RadioGroup';
import InputField from '../../components/common/InputField';
import SubmitButton from '../../components/common/SubmitButton';
import ResultCard from '../../components/common/ResultCard';
import { pause } from '../../utils/helpers';
import { useLanguage } from '../../context/LanguageContext';

export default function VolumePage() {
  const { t } = useLanguage();
  const [shape, setShape] = useState('recPrism');
  const [widA, setWidA] = useState('');
  const [widB, setWidB] = useState('');
  const [hei, setHei] = useState('');
  const [rad, setRad] = useState('');
  const [result, setResult] = useState('');
  const [detail, setDetail] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const shapeOptions = useMemo(
    () => [
      { value: 'recPrism', label: t('calculators.volume.shapes.recPrism') },
      { value: 'cube', label: t('calculators.volume.shapes.cube') },
      { value: 'sphere', label: t('calculators.volume.shapes.sphere') },
      { value: 'cylinder', label: t('calculators.volume.shapes.cylinder') },
      { value: 'cone', label: t('calculators.volume.shapes.cone') },
      { value: 'sqrPyramid', label: t('calculators.volume.shapes.sqrPyramid') },
    ],
    [t]
  );

  const handleShapeChange = (e) => {
    setShape(e.target.value);
    setWidA('');
    setWidB('');
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

    const a = parseFloat(widA);
    const b = parseFloat(widB);
    const h = parseFloat(hei);
    const r = parseFloat(rad);

    if (shape === 'recPrism') {
      if (!widA || isNaN(a) || a <= 0 || !widB || isNaN(b) || b <= 0 || !hei || isNaN(h) || h <= 0) {
        setIsError(true);
        setResult(t('calculators.volume.validation.recPrismInvalid'));
        return;
      }
      setLoading(true);
      await pause(250);
      const volume = a * b * h;
      setResult(t('calculators.volume.results.score', { volume: volume.toFixed(2) }));
      setDetail(
        t('calculators.volume.results.recPrismDetail', {
          a,
          b,
          h,
          volume: volume.toFixed(2),
        })
      );
      setLoading(false);
    } else if (shape === 'cube') {
      if (!widA || isNaN(a) || a <= 0) {
        setIsError(true);
        setResult(t('calculators.volume.validation.cubeInvalid'));
        return;
      }
      setLoading(true);
      await pause(250);
      const volume = a * a * a;
      setResult(t('calculators.volume.results.score', { volume: volume.toFixed(2) }));
      setDetail(
        t('calculators.volume.results.cubeDetail', {
          a,
          volume: volume.toFixed(2),
        })
      );
      setLoading(false);
    } else if (shape === 'sphere') {
      if (!rad || isNaN(r) || r <= 0) {
        setIsError(true);
        setResult(t('calculators.volume.validation.sphereInvalid'));
        return;
      }
      setLoading(true);
      await pause(250);
      const volume = (4 / 3) * Math.PI * r * r * r;
      setResult(t('calculators.volume.results.score', { volume: volume.toFixed(2) }));
      setDetail(
        t('calculators.volume.results.sphereDetail', {
          r,
          volume: volume.toFixed(2),
        })
      );
      setLoading(false);
    } else if (shape === 'cylinder') {
      if (!rad || isNaN(r) || r <= 0 || !hei || isNaN(h) || h <= 0) {
        setIsError(true);
        setResult(t('calculators.volume.validation.cylinderInvalid'));
        return;
      }
      setLoading(true);
      await pause(250);
      const volume = Math.PI * r * r * h;
      setResult(t('calculators.volume.results.score', { volume: volume.toFixed(2) }));
      setDetail(
        t('calculators.volume.results.cylinderDetail', {
          r,
          h,
          volume: volume.toFixed(2),
        })
      );
      setLoading(false);
    } else if (shape === 'cone') {
      if (!rad || isNaN(r) || r <= 0 || !hei || isNaN(h) || h <= 0) {
        setIsError(true);
        setResult(t('calculators.volume.validation.coneInvalid'));
        return;
      }
      setLoading(true);
      await pause(250);
      const volume = (1 / 3) * Math.PI * r * r * h;
      setResult(t('calculators.volume.results.score', { volume: volume.toFixed(2) }));
      setDetail(
        t('calculators.volume.results.coneDetail', {
          r,
          h,
          volume: volume.toFixed(2),
        })
      );
      setLoading(false);
    } else if (shape === 'sqrPyramid') {
      if (!widA || isNaN(a) || a <= 0 || !hei || isNaN(h) || h <= 0) {
        setIsError(true);
        setResult(t('calculators.volume.validation.pyramidInvalid'));
        return;
      }
      setLoading(true);
      await pause(250);
      const volume = (a * a * h) / 3;
      setResult(t('calculators.volume.results.score', { volume: volume.toFixed(2) }));
      setDetail(
        t('calculators.volume.results.pyramidDetail', {
          a,
          h,
          volume: volume.toFixed(2),
        })
      );
      setLoading(false);
    }
  };

  const formulaInfo = (
    <div>
      <p>
        <strong>{t('calculators.volume.info.title')}</strong>
        <br />
        • <strong>{t('calculators.volume.shapes.recPrism')}:</strong> {t('calculators.volume.info.formulaRecPrism')}
        <br />
        • <strong>{t('calculators.volume.shapes.cube')}:</strong> {t('calculators.volume.info.formulaCube')}
        <br />
        • <strong>{t('calculators.volume.shapes.sphere')}:</strong> {t('calculators.volume.info.formulaSphere')}
        <br />
        • <strong>{t('calculators.volume.shapes.cylinder')}:</strong> {t('calculators.volume.info.formulaCylinder')}
        <br />
        • <strong>{t('calculators.volume.shapes.cone')}:</strong> {t('calculators.volume.info.formulaCone')}
        <br />
        • <strong>{t('calculators.volume.shapes.sqrPyramid')}:</strong> {t('calculators.volume.info.formulaPyramid')}
      </p>
    </div>
  );

  return (
    <CalculatorLayout
      category={t('calculators.volume.category')}
      title={t('calculators.volume.title')}
      description={t('calculators.volume.description')}
      infoTitle={t('calculators.volume.infoTitle')}
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
          name="volume-shape"
          label={t('calculators.volume.shapeLabel')}
          options={shapeOptions}
          selectedValue={shape}
          onChange={handleShapeChange}
          direction="column"
        />

        {shape === 'recPrism' && (
          <>
            <InputField
              id="vol-wida"
              label={t('calculators.volume.labels.baseLengthA')}
              placeholder={t('calculators.volume.placeholders.edge8')}
              type="number"
              step="any"
              min="0.01"
              value={widA}
              onChange={(e) => setWidA(e.target.value)}
              suffix={t('calculators.volume.unitCm')}
              required
            />
            <InputField
              id="vol-widb"
              label={t('calculators.volume.labels.baseWidthB')}
              placeholder={t('calculators.volume.placeholders.edge5')}
              type="number"
              step="any"
              min="0.01"
              value={widB}
              onChange={(e) => setWidB(e.target.value)}
              suffix={t('calculators.volume.unitCm')}
              required
            />
            <InputField
              id="vol-hei"
              label={t('calculators.volume.labels.heightH')}
              placeholder={t('calculators.volume.placeholders.edge10')}
              type="number"
              step="any"
              min="0.01"
              value={hei}
              onChange={(e) => setHei(e.target.value)}
              suffix={t('calculators.volume.unitCm')}
              required
            />
          </>
        )}

        {shape === 'cube' && (
          <InputField
            id="vol-wida"
            label={t('calculators.volume.labels.cubeEdgeA')}
            placeholder={t('calculators.volume.placeholders.edge6')}
            type="number"
            step="any"
            min="0.01"
            value={widA}
            onChange={(e) => setWidA(e.target.value)}
            suffix={t('calculators.volume.unitCm')}
            required
          />
        )}

        {shape === 'sphere' && (
          <InputField
            id="vol-rad"
            label={t('calculators.volume.labels.sphereRadiusR')}
            placeholder={t('calculators.volume.placeholders.edge5')}
            type="number"
            step="any"
            min="0.01"
            value={rad}
            onChange={(e) => setRad(e.target.value)}
            suffix={t('calculators.volume.unitCm')}
            required
          />
        )}

        {(shape === 'cylinder' || shape === 'cone') && (
          <>
            <InputField
              id="vol-rad"
              label={t('calculators.volume.labels.cylinderRadiusR')}
              placeholder={t('calculators.volume.placeholders.edge4')}
              type="number"
              step="any"
              min="0.01"
              value={rad}
              onChange={(e) => setRad(e.target.value)}
              suffix={t('calculators.volume.unitCm')}
              required
            />
            <InputField
              id="vol-hei"
              label={t('calculators.volume.labels.heightH')}
              placeholder={t('calculators.volume.placeholders.edge12')}
              type="number"
              step="any"
              min="0.01"
              value={hei}
              onChange={(e) => setHei(e.target.value)}
              suffix={t('calculators.volume.unitCm')}
              required
            />
          </>
        )}

        {shape === 'sqrPyramid' && (
          <>
            <InputField
              id="vol-wida"
              label={t('calculators.volume.labels.pyramidBaseA')}
              placeholder={t('calculators.volume.placeholders.edge6')}
              type="number"
              step="any"
              min="0.01"
              value={widA}
              onChange={(e) => setWidA(e.target.value)}
              suffix={t('calculators.volume.unitCm')}
              required
            />
            <InputField
              id="vol-hei"
              label={t('calculators.volume.labels.pyramidHeightH')}
              placeholder={t('calculators.volume.placeholders.edge10')}
              type="number"
              step="any"
              min="0.01"
              value={hei}
              onChange={(e) => setHei(e.target.value)}
              suffix={t('calculators.volume.unitCm')}
              required
            />
          </>
        )}

        <SubmitButton loading={loading} onClick={hesapla} text={t('common.calculate')} />
      </form>
    </CalculatorLayout>
  );
}
