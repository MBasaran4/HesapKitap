import { useState } from 'react';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import RadioGroup from '../../components/common/RadioGroup';
import InputField from '../../components/common/InputField';
import SubmitButton from '../../components/common/SubmitButton';
import ResultCard from '../../components/common/ResultCard';
import { pause } from '../../utils/helpers';

export default function BmrPage() {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState('');
  const [detail, setDetail] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const genderOptions = [
    { value: 'male', label: 'Erkek' },
    { value: 'female', label: 'Kadın' },
  ];

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
      setResult('Lütfen cinsiyet seçiniz.');
      return;
    }

    if (!age || isNaN(a)) {
      setIsError(true);
      setResult('Lütfen yaşınızı giriniz.');
      return;
    }

    if (a < 1 || a > 120) {
      setIsError(true);
      setResult('Yaş 1 ile 120 arasında olmalıdır.');
      return;
    }

    if (!height || isNaN(h)) {
      setIsError(true);
      setResult('Lütfen boyunuzu giriniz.');
      return;
    }

    if (h < 50 || h > 260) {
      setIsError(true);
      setResult('Boy 50 cm ile 260 cm arasında olmalıdır.');
      return;
    }

    if (!weight || isNaN(w)) {
      setIsError(true);
      setResult('Lütfen kilonuzu giriniz.');
      return;
    }

    if (w < 20 || w > 350) {
      setIsError(true);
      setResult('Kilo 20 kg ile 350 kg arasında olmalıdır.');
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
    setResult(`Bazal Metabolizma Hızınız: ${bmrRounded.toLocaleString('tr-TR')} kcal/gün`);
    setDetail(
      `Hareketsiz yaşam için tahmini günlük kalori: ${Math.round(bmrRounded * 1.2).toLocaleString('tr-TR')} kcal | ` +
      `Orta aktif yaşam için: ${Math.round(bmrRounded * 1.55).toLocaleString('tr-TR')} kcal`
    );
    setLoading(false);
  };

  const formulaInfo = (
    <div>
      <p>
        <strong>Harris-Benedict Denklemi:</strong>
        <br />
        • Erkek: BMR = 66.47 + (13.75 × Kilo) + (5 × Boy) - (6.76 × Yaş)
        <br />
        • Kadın: BMR = 655.1 + (9.563 × Kilo) + (1.85 × Boy) - (4.68 × Yaş)
      </p>
      <p>
        <strong>Aktivite Çarpanları:</strong>
        <br />
        • Masa başı / Hareketsiz: BMR × 1.2
        <br />
        • Hafif Egzersiz (haftada 1-3 gün): BMR × 1.375
        <br />
        • Orta Düzey Egzersiz (haftada 3-5 gün): BMR × 1.55
        <br />
        • Ağır Spor / Yoğun Antrenman: BMR × 1.725
      </p>
    </div>
  );

  return (
    <CalculatorLayout
      category="Sağlık"
      title="Metabolizma Hızı Hesaplama"
      description="Harris-Benedict formülü ile vücudunuzun dinlenme halindeyken harcadığı günlük minimum kalori ihtiyacını (BMR) hesaplayın."
      infoTitle="BMR ve Kalori İhtiyacı Nedir?"
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
          label="Cinsiyetiniz"
          options={genderOptions}
          selectedValue={gender}
          onChange={(e) => setGender(e.target.value)}
          direction="row"
        />

        <InputField
          id="bmr-age"
          label="Yaşınız"
          placeholder="Örn: 25"
          type="number"
          step="1"
          min="1"
          max="120"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          suffix="yaş"
          required
        />

        <InputField
          id="bmr-height"
          label="Boyunuz"
          placeholder="Örn: 178"
          type="number"
          step="0.5"
          min="50"
          max="260"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          suffix="cm"
          required
        />

        <InputField
          id="bmr-weight"
          label="Kilonuz"
          placeholder="Örn: 75"
          type="number"
          step="0.1"
          min="20"
          max="350"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          suffix="kg"
          required
        />

        <SubmitButton loading={loading} onClick={hesapla} text="Hesapla" />
      </form>
    </CalculatorLayout>
  );
}
