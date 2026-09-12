import { useState } from 'react';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import RadioGroup from '../../components/common/RadioGroup';
import InputField from '../../components/common/InputField';
import SubmitButton from '../../components/common/SubmitButton';
import ResultCard from '../../components/common/ResultCard';
import { pause } from '../../utils/helpers';

export default function AreaPage() {
  const [shape, setShape] = useState('rectangle');
  const [wid, setWid] = useState('');
  const [hei, setHei] = useState('');
  const [rad, setRad] = useState('');
  const [result, setResult] = useState('');
  const [detail, setDetail] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const shapeOptions = [
    { value: 'rectangle', label: 'Dikdörtgen veya Kare' },
    { value: 'triangle', label: 'Üçgen' },
    { value: 'circle', label: 'Daire' },
  ];

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
        setResult('Lütfen geçerli bir taban genişliği (0\'dan büyük) giriniz.');
        return;
      }
      if (!hei || isNaN(h) || h <= 0) {
        setIsError(true);
        setResult('Lütfen geçerli bir yükseklik (0\'dan büyük) giriniz.');
        return;
      }
      if (w > 100000 || h > 100000) {
        setIsError(true);
        setResult('Ölçü değerleri en fazla 100.000 cm olabilir.');
        return;
      }

      setLoading(true);
      await pause(250);
      const area = w * h;
      setResult(`Alan: ${area.toFixed(2)} cm²`);
      setDetail(`Formül: Taban (${w}) × Yükseklik (${h}) = ${area.toFixed(2)} cm²`);
      setLoading(false);
    } else if (shape === 'triangle') {
      if (!wid || isNaN(w) || w <= 0) {
        setIsError(true);
        setResult('Lütfen geçerli bir taban uzunluğu (0\'dan büyük) giriniz.');
        return;
      }
      if (!hei || isNaN(h) || h <= 0) {
        setIsError(true);
        setResult('Lütfen geçerli bir yükseklik (0\'dan büyük) giriniz.');
        return;
      }
      if (w > 100000 || h > 100000) {
        setIsError(true);
        setResult('Ölçü değerleri en fazla 100.000 cm olabilir.');
        return;
      }

      setLoading(true);
      await pause(250);
      const area = (w * h) / 2;
      setResult(`Alan: ${area.toFixed(2)} cm²`);
      setDetail(`Formül: [Taban (${w}) × Yükseklik (${h})] / 2 = ${area.toFixed(2)} cm²`);
      setLoading(false);
    } else if (shape === 'circle') {
      if (!rad || isNaN(r) || r <= 0) {
        setIsError(true);
        setResult('Lütfen geçerli bir yarıçap (0\'dan büyük) giriniz.');
        return;
      }
      if (r > 100000) {
        setIsError(true);
        setResult('Yarıçap değeri en fazla 100.000 cm olabilir.');
        return;
      }

      setLoading(true);
      await pause(250);
      const area = Math.PI * r * r;
      setResult(`Alan: ${area.toFixed(2)} cm²`);
      setDetail(`Formül: π × r² = π × (${r})² ≈ ${area.toFixed(2)} cm²`);
      setLoading(false);
    }
  };

  const formulaInfo = (
    <div>
      <p>
        <strong>Geometrik Alan Formülleri:</strong>
        <br />
        • <strong>Dikdörtgen / Kare:</strong> Alan = Taban × Yükseklik
        <br />
        • <strong>Üçgen:</strong> Alan = (Taban × Yükseklik) / 2
        <br />
        • <strong>Daire:</strong> Alan = π × r² (π ≈ 3.14159...)
      </p>
    </div>
  );

  return (
    <CalculatorLayout
      category="Matematik"
      title="Alan Hesaplama"
      description="Dikdörtgen, kare, üçgen ve daire gibi temel geometrik şekillerin alanını hızlı ve hassas şekilde hesaplayın."
      infoTitle="Alan Formülleri"
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
          label="Geometrik Şekil Seçin"
          options={shapeOptions}
          selectedValue={shape}
          onChange={handleShapeChange}
          direction="column"
        />

        {(shape === 'rectangle' || shape === 'triangle') && (
          <>
            <InputField
              id="area-width"
              label="Taban Uzunluğu"
              placeholder="Örn: 10"
              type="number"
              step="any"
              min="0.01"
              value={wid}
              onChange={(e) => setWid(e.target.value)}
              suffix="cm"
              required
            />
            <InputField
              id="area-height"
              label="Yükseklik"
              placeholder="Örn: 5"
              type="number"
              step="any"
              min="0.01"
              value={hei}
              onChange={(e) => setHei(e.target.value)}
              suffix="cm"
              required
            />
          </>
        )}

        {shape === 'circle' && (
          <InputField
            id="area-radius"
            label="Daire Yarıçapı (r)"
            placeholder="Örn: 7"
            type="number"
            step="any"
            min="0.01"
            value={rad}
            onChange={(e) => setRad(e.target.value)}
            suffix="cm"
            required
          />
        )}

        <SubmitButton loading={loading} onClick={hesapla} text="Hesapla" />
      </form>
    </CalculatorLayout>
  );
}
