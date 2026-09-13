import { useState, useMemo } from 'react';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import RadioGroup from '../../components/common/RadioGroup';
import InputField from '../../components/common/InputField';
import SubmitButton from '../../components/common/SubmitButton';
import ResultCard from '../../components/common/ResultCard';
import { pause } from '../../utils/helpers';
import { useLanguage } from '../../context/LanguageContext';
import './GradePage.css';

export default function GradePage() {
  const { t } = useLanguage();
  const [calcType, setCalcType] = useState('average');
  const [numberExams, setNumberExams] = useState('1');
  const [needPoint, setNeedPoint] = useState('50');

  const [vizes, setVizes] = useState([
    { score: '', rate: '40' },
    { score: '', rate: '20' },
    { score: '', rate: '20' },
  ]);

  const [finalScore, setFinalScore] = useState('');
  const [finalRate, setFinalRate] = useState('60');

  const [result, setResult] = useState('');
  const [status, setStatus] = useState('');
  const [detail, setDetail] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const calcTypeOptions = useMemo(
    () => [
      { value: 'average', label: t('calculators.grade.typeAverage') },
      { value: 'finalPoint', label: t('calculators.grade.typeFinalPoint') },
    ],
    [t]
  );

  const examCountOptions = useMemo(
    () => [
      { value: '1', label: t('calculators.grade.examCount1') },
      { value: '2', label: t('calculators.grade.examCount2') },
      { value: '3', label: t('calculators.grade.examCount3') },
    ],
    [t]
  );

  const handleCalcTypeChange = (e) => {
    setCalcType(e.target.value);
    setResult('');
    setStatus('');
    setDetail('');
    setIsError(false);
  };

  const handleExamCountChange = (e) => {
    const count = e.target.value;
    setNumberExams(count);
    if (count === '1') {
      setVizes([
        { score: '', rate: '40' },
        { score: '', rate: '20' },
        { score: '', rate: '20' },
      ]);
      setFinalRate('60');
    } else if (count === '2') {
      setVizes([
        { score: '', rate: '20' },
        { score: '', rate: '20' },
        { score: '', rate: '20' },
      ]);
      setFinalRate('60');
    } else {
      setVizes([
        { score: '', rate: '15' },
        { score: '', rate: '15' },
        { score: '', rate: '10' },
      ]);
      setFinalRate('60');
    }
    setResult('');
    setStatus('');
    setDetail('');
    setIsError(false);
  };

  const handleVizeChange = (index, field, value) => {
    setVizes((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const hesapla = async (e) => {
    e?.preventDefault();
    setResult('');
    setStatus('');
    setDetail('');
    setIsError(false);

    const count = parseInt(numberExams, 10);
    const activeVizes = vizes.slice(0, count);

    for (let i = 0; i < count; i += 1) {
      const v = activeVizes[i];
      const s = parseFloat(v.score);
      const r = parseFloat(v.rate);

      if (v.score === '' || isNaN(s) || s < 0 || s > 100) {
        setIsError(true);
        setResult(t('calculators.grade.validation.vizeScoreInvalid', { idx: i + 1 }));
        return;
      }
      if (v.rate === '' || isNaN(r) || r <= 0 || r > 100) {
        setIsError(true);
        setResult(t('calculators.grade.validation.vizeRateInvalid', { idx: i + 1 }));
        return;
      }
    }

    const totalVizeRate = activeVizes.reduce((sum, v) => sum + parseFloat(v.rate), 0);

    if (calcType === 'average') {
      const fScore = parseFloat(finalScore);
      const fRate = parseFloat(finalRate);

      if (finalScore === '' || isNaN(fScore) || fScore < 0 || fScore > 100) {
        setIsError(true);
        setResult(t('calculators.grade.validation.finalScoreInvalid'));
        return;
      }
      if (finalRate === '' || isNaN(fRate) || fRate <= 0 || fRate > 100) {
        setIsError(true);
        setResult(t('calculators.grade.validation.finalRateInvalid'));
        return;
      }

      if (Math.round(totalVizeRate + fRate) !== 100) {
        setIsError(true);
        setResult(
          t('calculators.grade.validation.rateSumMustBe100', {
            sum: totalVizeRate + fRate,
          })
        );
        return;
      }

      setLoading(true);
      await pause(250);

      const vizeContribution = activeVizes.reduce((sum, v) => sum + (parseFloat(v.score) * parseFloat(v.rate)) / 100, 0);
      const finalContribution = (fScore * fRate) / 100;
      const totalAverage = vizeContribution + finalContribution;

      setResult(t('calculators.grade.results.averageScore', { avg: totalAverage.toFixed(2) }));
      if (totalAverage >= 50) {
        setStatus(t('calculators.grade.results.statusPassed'));
      } else {
        setStatus(t('calculators.grade.results.statusFailed'));
      }
      setDetail(
        t('calculators.grade.results.averageDetail', {
          vize: vizeContribution.toFixed(2),
          final: finalContribution.toFixed(2),
        })
      );
      setLoading(false);
    } else {
      const targetPoint = parseFloat(needPoint);
      if (needPoint === '' || isNaN(targetPoint) || targetPoint <= 0 || targetPoint > 100) {
        setIsError(true);
        setResult(t('calculators.grade.validation.thresholdInvalid'));
        return;
      }

      const remainingRate = 100 - totalVizeRate;
      if (remainingRate <= 0) {
        setIsError(true);
        setResult(t('calculators.grade.validation.vizeRateOverflow', { sum: totalVizeRate }));
        return;
      }

      setLoading(true);
      await pause(250);

      const vizeContribution = activeVizes.reduce((sum, v) => sum + (parseFloat(v.score) * parseFloat(v.rate)) / 100, 0);
      const neededFinal = ((targetPoint - vizeContribution) * 100) / remainingRate;

      if (neededFinal <= 0) {
        setResult(t('calculators.grade.results.passWithZero'));
        setStatus(t('calculators.grade.results.passWithZeroStatus'));
        setDetail(
          t('calculators.grade.results.passWithZeroDetail', {
            vize: vizeContribution.toFixed(2),
            target: targetPoint,
          })
        );
      } else if (neededFinal > 100) {
        setResult(t('calculators.grade.results.impossibleTitle', { needed: neededFinal.toFixed(1) }));
        setStatus(t('calculators.grade.results.impossibleStatus'));
        setDetail(
          t('calculators.grade.results.impossibleDetail', {
            rate: remainingRate,
            target: targetPoint,
          })
        );
      } else {
        setResult(t('calculators.grade.results.neededTitle', { needed: neededFinal.toFixed(1) }));
        setStatus(t('calculators.grade.results.neededStatus', { ceil: Math.ceil(neededFinal) }));
        setDetail(
          t('calculators.grade.results.neededDetail', {
            vize: vizeContribution.toFixed(2),
            target: targetPoint,
            rate: remainingRate,
          })
        );
      }

      setLoading(false);
    }
  };

  const count = parseInt(numberExams, 10);

  const formulaInfo = (
    <div>
      <p>
        <strong>{t('calculators.grade.info.title')}</strong>
        <br />
        {t('calculators.grade.info.formulaAvg')}
        <br />
        {t('calculators.grade.info.formulaFinal')}
      </p>
    </div>
  );

  return (
    <CalculatorLayout
      category={t('calculators.grade.category')}
      title={t('calculators.grade.title')}
      description={t('calculators.grade.description')}
      infoTitle={t('calculators.grade.infoTitle')}
      infoContent={formulaInfo}
      result={
        <ResultCard
          result={result}
          status={status}
          detail={detail}
          isError={isError}
        />
      }
    >
      <form className="calculator-form" onSubmit={hesapla}>
        <RadioGroup
          name="calcType"
          label={t('calculators.grade.calcTypeLabel')}
          options={calcTypeOptions}
          selectedValue={calcType}
          onChange={handleCalcTypeChange}
          direction="column"
        />

        <RadioGroup
          name="numberExams"
          label={t('calculators.grade.examCountLabel')}
          options={examCountOptions}
          selectedValue={numberExams}
          onChange={handleExamCountChange}
          direction="row"
        />

        {calcType === 'finalPoint' && (
          <InputField
            id="target-need-point"
            label={t('calculators.grade.thresholdLabel')}
            placeholder={t('calculators.grade.thresholdPlaceholder')}
            type="number"
            step="1"
            min="10"
            max="100"
            value={needPoint}
            onChange={(e) => setNeedPoint(e.target.value)}
            suffix={t('calculators.grade.unitPoints')}
            required
          />
        )}

        <div className="grade-section-title">{t('calculators.grade.vizeSectionTitle')}</div>
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="exam-row">
            <span className="exam-row-label">
              {t('calculators.grade.vizeLabel', { idx: idx + 1 })}
            </span>
            <div className="exam-input-col">
              <InputField
                id={`vize-${idx}-score`}
                placeholder={t('calculators.grade.scorePlaceholder')}
                type="number"
                step="any"
                min="0"
                max="100"
                value={vizes[idx].score}
                onChange={(e) => handleVizeChange(idx, 'score', e.target.value)}
                required
              />
            </div>
            <div className="exam-input-col">
              <InputField
                id={`vize-${idx}-rate`}
                placeholder={t('calculators.grade.ratePlaceholder')}
                type="number"
                step="any"
                min="1"
                max="100"
                value={vizes[idx].rate}
                onChange={(e) => handleVizeChange(idx, 'rate', e.target.value)}
                suffix={t('calculators.grade.unitPercent')}
                required
              />
            </div>
          </div>
        ))}

        {calcType === 'average' && (
          <>
            <div className="grade-section-title">{t('calculators.grade.finalSectionTitle')}</div>
            <div className="exam-row">
              <span className="exam-row-label">{t('calculators.grade.finalLabel')}</span>
              <div className="exam-input-col">
                <InputField
                  id="final-score"
                  placeholder={t('calculators.grade.scorePlaceholder')}
                  type="number"
                  step="any"
                  min="0"
                  max="100"
                  value={finalScore}
                  onChange={(e) => setFinalScore(e.target.value)}
                  required
                />
              </div>
              <div className="exam-input-col">
                <InputField
                  id="final-rate"
                  placeholder={t('calculators.grade.ratePlaceholder')}
                  type="number"
                  step="any"
                  min="1"
                  max="100"
                  value={finalRate}
                  onChange={(e) => setFinalRate(e.target.value)}
                  suffix={t('calculators.grade.unitPercent')}
                  required
                />
              </div>
            </div>
          </>
        )}

        <SubmitButton loading={loading} onClick={hesapla} text={t('common.calculate')} />
      </form>
    </CalculatorLayout>
  );
}
