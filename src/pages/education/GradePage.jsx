import { useState } from 'react';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import RadioGroup from '../../components/common/RadioGroup';
import InputField from '../../components/common/InputField';
import SubmitButton from '../../components/common/SubmitButton';
import ResultCard from '../../components/common/ResultCard';
import { pause } from '../../utils/helpers';
import './GradePage.css';

export default function GradePage() {
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

  const calcTypeOptions = [
    { value: 'average', label: 'Vize Final Ortalaması' },
    { value: 'finalPoint', label: 'Geçmek için Gereken Final Puanı' },
  ];

  const examCountOptions = [
    { value: '1', label: '1 Vize' },
    { value: '2', label: '2 Vize' },
    { value: '3', label: '3 Vize' },
  ];

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
        setResult(`Lütfen ${i + 1}. Vize için 0 ile 100 arasında bir not giriniz.`);
        return;
      }
      if (v.rate === '' || isNaN(r) || r <= 0 || r > 100) {
        setIsError(true);
        setResult(`Lütfen ${i + 1}. Vize için geçerli bir yüzde oranı (1 - 100) giriniz.`);
        return;
      }
    }

    const totalVizeRate = activeVizes.reduce((sum, v) => sum + parseFloat(v.rate), 0);

    if (calcType === 'average') {
      const fScore = parseFloat(finalScore);
      const fRate = parseFloat(finalRate);

      if (finalScore === '' || isNaN(fScore) || fScore < 0 || fScore > 100) {
        setIsError(true);
        setResult('Lütfen Final için 0 ile 100 arasında bir not giriniz.');
        return;
      }
      if (finalRate === '' || isNaN(fRate) || fRate <= 0 || fRate > 100) {
        setIsError(true);
        setResult('Lütfen Final için geçerli bir yüzde oranı giriniz.');
        return;
      }

      if (Math.round(totalVizeRate + fRate) !== 100) {
        setIsError(true);
        setResult(`Sınav oranları toplamı %100 olmalıdır. (Şu anki toplam: %${totalVizeRate + fRate})`);
        return;
      }

      setLoading(true);
      await pause(250);

      const vizeContribution = activeVizes.reduce((sum, v) => sum + (parseFloat(v.score) * parseFloat(v.rate)) / 100, 0);
      const finalContribution = (fScore * fRate) / 100;
      const totalAverage = vizeContribution + finalContribution;

      setResult(`Dönem Sonu Not Ortalaması: ${totalAverage.toFixed(2)}`);
      if (totalAverage >= 50) {
        setStatus('Durum: Başarılı (Dersi Geçtiniz 🎉)');
      } else {
        setStatus('Durum: Başarısız (Geçme Notunun Altında Kaldınız)');
      }
      setDetail(`Vize Katkısı: ${vizeContribution.toFixed(2)} puan | Final Katkısı: ${finalContribution.toFixed(2)} puan`);
      setLoading(false);
    } else {
      const targetPoint = parseFloat(needPoint);
      if (needPoint === '' || isNaN(targetPoint) || targetPoint <= 0 || targetPoint > 100) {
        setIsError(true);
        setResult('Lütfen 1 ile 100 arasında bir ders geçme baraj notu giriniz.');
        return;
      }

      const remainingRate = 100 - totalVizeRate;
      if (remainingRate <= 0) {
        setIsError(true);
        setResult(`Vize oranları toplamı (%${totalVizeRate}) %100 veya daha fazla olamaz. Final için oran kalmalıdır.`);
        return;
      }

      setLoading(true);
      await pause(250);

      const vizeContribution = activeVizes.reduce((sum, v) => sum + (parseFloat(v.score) * parseFloat(v.rate)) / 100, 0);
      const neededFinal = ((targetPoint - vizeContribution) * 100) / remainingRate;

      if (neededFinal <= 0) {
        setResult('Final sınavından 0 alsanız bile dersi geçiyorsunuz!');
        setStatus('Tebrikler, vize notlarınız tek başına geçme barajını aşıyor.');
        setDetail(`Mevcut Vize Puanı: ${vizeContribution.toFixed(2)} | Hedef Baraj: ${targetPoint}`);
      } else if (neededFinal > 100) {
        setResult(`Gereken Final Notu: ${neededFinal.toFixed(1)}`);
        setStatus('Uyarı: 100 üzerinden geçmek matematiksel olarak mümkün görünmüyor.');
        setDetail(`Final etki oranı (%${remainingRate}) ile hedeflenen ${targetPoint} ortalamaya ulaşılamıyor.`);
      } else {
        setResult(`Geçmek için Gereken Minimum Final Notu: ${neededFinal.toFixed(1)}`);
        setStatus(`Final sınavından en az ${Math.ceil(neededFinal)} almalısınız.`);
        setDetail(`Mevcut Vize Puanı: ${vizeContribution.toFixed(2)} | Hedef: ${targetPoint} | Final Etki Oranı: %${remainingRate}`);
      }

      setLoading(false);
    }
  };

  const count = parseInt(numberExams, 10);

  const formulaInfo = (
    <div>
      <p>
        <strong>Not Ağırlıklı Ortalama Formülü:</strong>
        <br />
        • Ortalama = (1. Vize × %Oran) + (2. Vize × %Oran) + ... + (Final × %Oran)
        <br />
        • Geçmek için Gereken Final Notu = [Hedef Not - (Vize Toplam Puanı)] / (Final Oranı)
      </p>
    </div>
  );

  return (
    <CalculatorLayout
      category="Eğitim"
      title="Vize Final Not Hesaplama"
      description="Üniversite ve lise dersleriniz için vize ve final sınavı ortalamanızı hesaplayın veya dersi geçmek için finalden kaç almanız gerektiğini öğrenin."
      infoTitle="Not Hesaplama Mantığı"
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
          label="Hesaplama Türü"
          options={calcTypeOptions}
          selectedValue={calcType}
          onChange={handleCalcTypeChange}
          direction="column"
        />

        <RadioGroup
          name="numberExams"
          label="Vize Sınavı Sayısı"
          options={examCountOptions}
          selectedValue={numberExams}
          onChange={handleExamCountChange}
          direction="row"
        />

        {calcType === 'finalPoint' && (
          <InputField
            id="target-need-point"
            label="Ders Geçme Baraj Notu"
            placeholder="Örn: 50 veya 60"
            type="number"
            step="1"
            min="10"
            max="100"
            value={needPoint}
            onChange={(e) => setNeedPoint(e.target.value)}
            suffix="puan"
            required
          />
        )}

        <div className="grade-section-title">Vize Notları ve Yüzdelik Oranları</div>
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="exam-row">
            <span className="exam-row-label">{idx + 1}. Vize:</span>
            <div className="exam-input-col">
              <InputField
                id={`vize-${idx}-score`}
                placeholder="Not (0-100)"
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
                placeholder="Oran %"
                type="number"
                step="any"
                min="1"
                max="100"
                value={vizes[idx].rate}
                onChange={(e) => handleVizeChange(idx, 'rate', e.target.value)}
                suffix="%"
                required
              />
            </div>
          </div>
        ))}

        {calcType === 'average' && (
          <>
            <div className="grade-section-title">Final Notu ve Oranı</div>
            <div className="exam-row">
              <span className="exam-row-label">Final:</span>
              <div className="exam-input-col">
                <InputField
                  id="final-score"
                  placeholder="Not (0-100)"
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
                  placeholder="Oran %"
                  type="number"
                  step="any"
                  min="1"
                  max="100"
                  value={finalRate}
                  onChange={(e) => setFinalRate(e.target.value)}
                  suffix="%"
                  required
                />
              </div>
            </div>
          </>
        )}

        <SubmitButton loading={loading} onClick={hesapla} text="Hesapla" />
      </form>
    </CalculatorLayout>
  );
}
