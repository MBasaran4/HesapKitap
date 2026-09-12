import { useState, useMemo } from 'react';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import RadioGroup from '../../components/common/RadioGroup';
import SubmitButton from '../../components/common/SubmitButton';
import ResultCard from '../../components/common/ResultCard';
import { pause } from '../../utils/helpers';
import './AgePage.css';

const MONTH_NAMES = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
];

export default function AgePage() {
  const currentYear = new Date().getFullYear();

  const [calcDateMode, setCalcDateMode] = useState('today');
  const [birthDay, setBirthDay] = useState('1');
  const [birthMonth, setBirthMonth] = useState('1');
  const [birthYear, setBirthYear] = useState('2000');

  const [targetDay, setTargetDay] = useState('1');
  const [targetMonth, setTargetMonth] = useState('1');
  const [targetYear, setTargetYear] = useState(String(currentYear + 1));

  const [result, setResult] = useState('');
  const [status, setStatus] = useState('');
  const [detail, setDetail] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const modeOptions = [
    { value: 'today', label: 'Bugün için hesapla' },
    { value: 'future', label: 'İleri bir tarih için hesapla' },
  ];

  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => String(i + 1)), []);
  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => ({ value: String(i + 1), label: `${i + 1} - ${MONTH_NAMES[i]}` })), []);
  
  const birthYears = useMemo(() => {
    const list = [];
    for (let y = currentYear; y >= 1900; y -= 1) {
      list.push(String(y));
    }
    return list;
  }, [currentYear]);

  const targetYears = useMemo(() => {
    const list = [];
    for (let y = currentYear + 30; y >= currentYear; y -= 1) {
      list.push(String(y));
    }
    return list;
  }, [currentYear]);

  const handleModeChange = (e) => {
    setCalcDateMode(e.target.value);
    setResult('');
    setStatus('');
    setDetail('');
    setIsError(false);
  };

  const hesapla = async (e) => {
    e?.preventDefault();
    setResult('');
    setStatus('');
    setDetail('');
    setIsError(false);

    const bYear = parseInt(birthYear, 10);
    const bMonth = parseInt(birthMonth, 10);
    const bDay = parseInt(birthDay, 10);

    const birthDate = new Date(bYear, bMonth - 1, bDay);

    // Takvim kontrolü (Şubat 30 veya 31 gibi imkansız tarihler)
    if (
      birthDate.getFullYear() !== bYear ||
      birthDate.getMonth() !== bMonth - 1 ||
      birthDate.getDate() !== bDay
    ) {
      setIsError(true);
      setResult('Lütfen geçerli bir takvim günü seçiniz (seçilen ayda bu gün bulunmuyor).');
      return;
    }

    let compareDate;
    if (calcDateMode === 'today') {
      compareDate = new Date();
    } else {
      const tYear = parseInt(targetYear, 10);
      const tMonth = parseInt(targetMonth, 10);
      const tDay = parseInt(targetDay, 10);
      compareDate = new Date(tYear, tMonth - 1, tDay);

      if (
        compareDate.getFullYear() !== tYear ||
        compareDate.getMonth() !== tMonth - 1 ||
        compareDate.getDate() !== tDay
      ) {
        setIsError(true);
        setResult('Lütfen geçerli bir hedef takvim günü seçiniz.');
        return;
      }
    }

    if (compareDate <= birthDate) {
      setIsError(true);
      setResult('Hesaplanacak tarih, doğum tarihinden sonraki bir gün olmalıdır.');
      return;
    }

    setLoading(true);
    await pause(250);

    // Tam yaş hesaplama (Yıl, Ay, Gün)
    let years = compareDate.getFullYear() - birthDate.getFullYear();
    let monthsDiff = compareDate.getMonth() - birthDate.getMonth();
    let daysDiff = compareDate.getDate() - birthDate.getDate();

    if (daysDiff < 0) {
      monthsDiff -= 1;
      const prevMonthLastDay = new Date(compareDate.getFullYear(), compareDate.getMonth(), 0).getDate();
      daysDiff += prevMonthLastDay;
    }

    if (monthsDiff < 0) {
      years -= 1;
      monthsDiff += 12;
    }

    // Gerçek gün farkı (Milisaniye bazında artık yıllar dahil)
    const diffMs = compareDate.getTime() - birthDate.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    const formattedCompare = `${compareDate.getDate()} ${MONTH_NAMES[compareDate.getMonth()]} ${compareDate.getFullYear()}`;
    setResult(`${formattedCompare} tarihindeki yaşınız:`);
    setStatus(`${years} Yıl, ${monthsDiff} Ay, ${daysDiff} Gün`);

    let detailStr = `Toplam yaşanılan gün: ${totalDays.toLocaleString('tr-TR')} gün`;

    if (calcDateMode === 'today') {
      const today = new Date();
      let nextBirthday = new Date(today.getFullYear(), bMonth - 1, bDay);
      if (today > nextBirthday) {
        nextBirthday = new Date(today.getFullYear() + 1, bMonth - 1, bDay);
      }
      const daysToNext = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      detailStr += ` | Sonraki doğum gününüze ${daysToNext} gün kaldı`;
    }

    setDetail(detailStr);
    setLoading(false);
  };

  const formulaInfo = (
    <div>
      <p>
        <strong>Yaş ve Gün Nasıl Hesaplanır?</strong>
        <br />
        • Yaşınız, doğum tarihiniz ile hedef tarih arasındaki artık yıllar (366 gün) ve ayların gerçek gün sayıları (28, 29, 30, 31) dikkate alınarak tam takvim farkı olarak hesaplanır.
        <br />
        • Toplam gün sayısı milisaniye hassasiyetiyle tam geçen 24 saatlik periyotları gösterir.
      </p>
    </div>
  );

  return (
    <CalculatorLayout
      category="Zaman"
      title="Yaş Hesaplama"
      description="Doğum tarihinizi girerek tam yaşınızı, yaşadığınız toplam gün sayısını ve bir sonraki doğum gününüze kalan süreyi öğrenin."
      infoTitle="Yaş Hesaplama Detayları"
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
          name="calcDateMode"
          label="Hesaplama Modu"
          options={modeOptions}
          selectedValue={calcDateMode}
          onChange={handleModeChange}
          direction="column"
        />

        <div className="date-section-title">Doğum Tarihiniz</div>
        <div className="date-picker-row">
          <div className="date-select-wrapper">
            <label className="date-select-label" htmlFor="birth-day">Gün</label>
            <select
              id="birth-day"
              className="date-select-field"
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
            >
              {days.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="date-select-wrapper">
            <label className="date-select-label" htmlFor="birth-month">Ay</label>
            <select
              id="birth-month"
              className="date-select-field"
              value={birthMonth}
              onChange={(e) => setBirthMonth(e.target.value)}
            >
              {months.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>

          <div className="date-select-wrapper">
            <label className="date-select-label" htmlFor="birth-year">Yıl</label>
            <select
              id="birth-year"
              className="date-select-field"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
            >
              {birthYears.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {calcDateMode === 'future' && (
          <>
            <div className="date-section-title">Hesaplanacak Hedef Tarih</div>
            <div className="date-picker-row">
              <div className="date-select-wrapper">
                <label className="date-select-label" htmlFor="target-day">Gün</label>
                <select
                  id="target-day"
                  className="date-select-field"
                  value={targetDay}
                  onChange={(e) => setTargetDay(e.target.value)}
                >
                  {days.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="date-select-wrapper">
                <label className="date-select-label" htmlFor="target-month">Ay</label>
                <select
                  id="target-month"
                  className="date-select-field"
                  value={targetMonth}
                  onChange={(e) => setTargetMonth(e.target.value)}
                >
                  {months.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>

              <div className="date-select-wrapper">
                <label className="date-select-label" htmlFor="target-year">Yıl</label>
                <select
                  id="target-year"
                  className="date-select-field"
                  value={targetYear}
                  onChange={(e) => setTargetYear(e.target.value)}
                >
                  {targetYears.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}

        <SubmitButton loading={loading} onClick={hesapla} text="Hesapla" />
      </form>
    </CalculatorLayout>
  );
}
