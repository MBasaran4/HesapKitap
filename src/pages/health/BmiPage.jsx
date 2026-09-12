import { useState } from 'react';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import InputField from '../../components/common/InputField';
import SubmitButton from '../../components/common/SubmitButton';
import ResultCard from '../../components/common/ResultCard';
import { pause } from '../../utils/helpers';

export default function BmiPage() {
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
      setSonuc('Lütfen boyunuzu giriniz.');
      return;
    }

    if (b < 50 || b > 250) {
      setIsError(true);
      setSonuc('Boy 50 cm ile 250 cm arasında olmalıdır.');
      return;
    }

    if (!kilo || isNaN(k)) {
      setIsError(true);
      setSonuc('Lütfen kilonuzu giriniz.');
      return;
    }

    if (k < 20 || k > 350) {
      setIsError(true);
      setSonuc('Kilo 20 kg ile 350 kg arasında olmalıdır.');
      return;
    }

    setLoading(true);
    await pause(250);

    const boyMetre = b / 100;
    const endeks = k / (boyMetre * boyMetre);
    const minKilo = boyMetre * boyMetre * 18.5;
    const maxKilo = boyMetre * boyMetre * 24.9;

    setSonuc(`Boy Kilo Endeksiniz: ${endeks.toFixed(2)} kg/m²`);

    if (endeks < 18.5) {
      setDurum('Kilonuz Zayıf');
    } else if (endeks < 24.9) {
      setDurum('Kilonuz Normal');
    } else if (endeks < 29.9) {
      setDurum('Kilonuz Fazla (Toplu)');
    } else if (endeks < 34.9) {
      setDurum('1. Derece Obezite');
    } else if (endeks < 39.9) {
      setDurum('2. Derece Obezite');
    } else {
      setDurum('3. Derece Morbid Obezite');
    }

    setNormal(`Boyunuza göre ideal kilo aralığınız: ${minKilo.toFixed(1)} - ${maxKilo.toFixed(1)} kg`);
    setLoading(false);
  };

  const formulaInfo = (
    <div>
      <p>
        <strong>Formül:</strong> Vücut Kitle İndeksi (VKİ) = Kilo (kg) / [Boy (m)]²
      </p>
      <p>
        <strong>Dünya Sağlık Örgütü (WHO) Aralıkları:</strong>
        <br />
        • 18.5 altı: Zayıf
        <br />
        • 18.5 - 24.9: Normal Kilolu
        <br />
        • 25.0 - 29.9: Fazla Kilolu
        <br />
        • 30.0 ve üzeri: Obezite
      </p>
    </div>
  );

  return (
    <CalculatorLayout
      category="Sağlık"
      title="Boy Kilo Endeksi Hesaplama"
      description="Boyunuzu ve kilonuzu girerek Vücut Kitle İndeksinizi (VKİ) ve ideal kilo aralığınızı kolayca hesaplayın."
      infoTitle="VKİ Nasıl Hesaplanır?"
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
          label="Boyunuz"
          placeholder="Örn: 175"
          type="number"
          step="0.5"
          min="50"
          max="250"
          value={boy}
          onChange={(e) => setBoy(e.target.value)}
          suffix="cm"
          required
        />

        <InputField
          id="bmi-kilo"
          label="Kilonuz"
          placeholder="Örn: 70"
          type="number"
          step="0.1"
          min="20"
          max="350"
          value={kilo}
          onChange={(e) => setKilo(e.target.value)}
          suffix="kg"
          required
        />

        <SubmitButton loading={loading} onClick={hesapla} text="Hesapla" />
      </form>
    </CalculatorLayout>
  );
}
