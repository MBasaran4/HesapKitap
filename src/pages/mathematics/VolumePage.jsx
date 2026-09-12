import { useState } from 'react';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import RadioGroup from '../../components/common/RadioGroup';
import InputField from '../../components/common/InputField';
import SubmitButton from '../../components/common/SubmitButton';
import ResultCard from '../../components/common/ResultCard';
import { pause } from '../../utils/helpers';

export default function VolumePage() {
  const [shape, setShape] = useState('recPrism');
  const [widA, setWidA] = useState('');
  const [widB, setWidB] = useState('');
  const [hei, setHei] = useState('');
  const [rad, setRad] = useState('');
  const [result, setResult] = useState('');
  const [detail, setDetail] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const shapeOptions = [
    { value: 'recPrism', label: 'Dikdörtgenler Prizması' },
    { value: 'cube', label: 'Küp' },
    { value: 'sphere', label: 'Küre' },
    { value: 'cylinder', label: 'Silindir' },
    { value: 'cone', label: 'Koni' },
    { value: 'sqrPyramid', label: 'Kare Piramit' },
  ];

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
        setResult('Lütfen taban uzunluğu, taban genişliği ve yükseklik için 0\'dan büyük değerler giriniz.');
        return;
      }
      setLoading(true);
      await pause(250);
      const volume = a * b * h;
      setResult(`Hacim: ${volume.toFixed(2)} cm³`);
      setDetail(`Formül: a × b × h = ${a} × ${b} × ${h} = ${volume.toFixed(2)} cm³`);
      setLoading(false);
    } else if (shape === 'cube') {
      if (!widA || isNaN(a) || a <= 0) {
        setIsError(true);
        setResult('Lütfen geçerli bir kenar uzunluğu (0\'dan büyük) giriniz.');
        return;
      }
      setLoading(true);
      await pause(250);
      const volume = a * a * a;
      setResult(`Hacim: ${volume.toFixed(2)} cm³`);
      setDetail(`Formül: a³ = (${a})³ = ${volume.toFixed(2)} cm³`);
      setLoading(false);
    } else if (shape === 'sphere') {
      if (!rad || isNaN(r) || r <= 0) {
        setIsError(true);
        setResult('Lütfen geçerli bir yarıçap (0\'dan büyük) giriniz.');
        return;
      }
      setLoading(true);
      await pause(250);
      const volume = (4 / 3) * Math.PI * r * r * r;
      setResult(`Hacim: ${volume.toFixed(2)} cm³`);
      setDetail(`Formül: (4/3) × π × r³ = (4/3) × π × (${r})³ ≈ ${volume.toFixed(2)} cm³`);
      setLoading(false);
    } else if (shape === 'cylinder') {
      if (!rad || isNaN(r) || r <= 0 || !hei || isNaN(h) || h <= 0) {
        setIsError(true);
        setResult('Lütfen geçerli yarıçap ve yükseklik değerleri giriniz.');
        return;
      }
      setLoading(true);
      await pause(250);
      const volume = Math.PI * r * r * h;
      setResult(`Hacim: ${volume.toFixed(2)} cm³`);
      setDetail(`Formül: π × r² × h = π × (${r})² × ${h} ≈ ${volume.toFixed(2)} cm³`);
      setLoading(false);
    } else if (shape === 'cone') {
      if (!rad || isNaN(r) || r <= 0 || !hei || isNaN(h) || h <= 0) {
        setIsError(true);
        setResult('Lütfen geçerli yarıçap ve yükseklik değerleri giriniz.');
        return;
      }
      setLoading(true);
      await pause(250);
      const volume = (1 / 3) * Math.PI * r * r * h;
      setResult(`Hacim: ${volume.toFixed(2)} cm³`);
      setDetail(`Formül: (1/3) × π × r² × h = (1/3) × π × (${r})² × ${h} ≈ ${volume.toFixed(2)} cm³`);
      setLoading(false);
    } else if (shape === 'sqrPyramid') {
      if (!widA || isNaN(a) || a <= 0 || !hei || isNaN(h) || h <= 0) {
        setIsError(true);
        setResult('Lütfen taban kenarı ve yükseklik için 0\'dan büyük değerler giriniz.');
        return;
      }
      setLoading(true);
      await pause(250);
      // Doğrulanmış Piramit Hacim Formülü: (Taban Alanı × Yükseklik) / 3
      const volume = (a * a * h) / 3;
      setResult(`Hacim: ${volume.toFixed(2)} cm³`);
      setDetail(`Formül: (Taban Alanı × Yükseklik) / 3 = (${a}² × ${h}) / 3 = ${volume.toFixed(2)} cm³`);
      setLoading(false);
    }
  };

  const formulaInfo = (
    <div>
      <p>
        <strong>Geometrik Cisimlerin Hacim Formülleri:</strong>
        <br />
        • <strong>Dikdörtgenler Prizması:</strong> V = a × b × h
        <br />
        • <strong>Küp:</strong> V = a³
        <br />
        • <strong>Küre:</strong> V = (4/3) × π × r³
        <br />
        • <strong>Silindir:</strong> V = π × r² × h
        <br />
        • <strong>Koni:</strong> V = (1/3) × π × r² × h
        <br />
        • <strong>Kare Piramit:</strong> V = (a² × h) / 3
      </p>
    </div>
  );

  return (
    <CalculatorLayout
      category="Matematik"
      title="Hacim Hesaplama"
      description="Prizma, küp, küre, silindir, koni ve piramit gibi 3 boyutlu geometrik cisimlerin hacmini hassas şekilde hesaplayın."
      infoTitle="Hacim Formülleri"
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
          label="Geometrik Cisim Seçin"
          options={shapeOptions}
          selectedValue={shape}
          onChange={handleShapeChange}
          direction="column"
        />

        {shape === 'recPrism' && (
          <>
            <InputField
              id="vol-wida"
              label="Taban Uzunluğu (a)"
              placeholder="Örn: 8"
              type="number"
              step="any"
              min="0.01"
              value={widA}
              onChange={(e) => setWidA(e.target.value)}
              suffix="cm"
              required
            />
            <InputField
              id="vol-widb"
              label="Taban Genişliği (b)"
              placeholder="Örn: 5"
              type="number"
              step="any"
              min="0.01"
              value={widB}
              onChange={(e) => setWidB(e.target.value)}
              suffix="cm"
              required
            />
            <InputField
              id="vol-hei"
              label="Yükseklik (h)"
              placeholder="Örn: 10"
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

        {shape === 'cube' && (
          <InputField
            id="vol-wida"
            label="Kenar Uzunluğu (a)"
            placeholder="Örn: 6"
            type="number"
            step="any"
            min="0.01"
            value={widA}
            onChange={(e) => setWidA(e.target.value)}
            suffix="cm"
            required
          />
        )}

        {shape === 'sphere' && (
          <InputField
            id="vol-rad"
            label="Yarıçap (r)"
            placeholder="Örn: 5"
            type="number"
            step="any"
            min="0.01"
            value={rad}
            onChange={(e) => setRad(e.target.value)}
            suffix="cm"
            required
          />
        )}

        {(shape === 'cylinder' || shape === 'cone') && (
          <>
            <InputField
              id="vol-rad"
              label="Taban Yarıçapı (r)"
              placeholder="Örn: 4"
              type="number"
              step="any"
              min="0.01"
              value={rad}
              onChange={(e) => setRad(e.target.value)}
              suffix="cm"
              required
            />
            <InputField
              id="vol-hei"
              label="Yükseklik (h)"
              placeholder="Örn: 12"
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

        {shape === 'sqrPyramid' && (
          <>
            <InputField
              id="vol-wida"
              label="Taban Kenar Uzunluğu (a)"
              placeholder="Örn: 6"
              type="number"
              step="any"
              min="0.01"
              value={widA}
              onChange={(e) => setWidA(e.target.value)}
              suffix="cm"
              required
            />
            <InputField
              id="vol-hei"
              label="Piramit Yüksekliği (h)"
              placeholder="Örn: 10"
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

        <SubmitButton loading={loading} onClick={hesapla} text="Hesapla" />
      </form>
    </CalculatorLayout>
  );
}
