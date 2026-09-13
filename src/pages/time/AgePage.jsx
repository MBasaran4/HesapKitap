import { useState, useMemo } from 'react';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import RadioGroup from '../../components/common/RadioGroup';
import SubmitButton from '../../components/common/SubmitButton';
import ResultCard from '../../components/common/ResultCard';
import { pause } from '../../utils/helpers';
import { useLanguage } from '../../context/LanguageContext';
import './AgePage.css';

const DEFAULT_MONTH_NAMES = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
];

export default function AgePage() {
  const { language, t } = useLanguage();
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

  const monthNames = useMemo(() => {
    const list = t('calculators.age.months');
    return Array.isArray(list) ? list : DEFAULT_MONTH_NAMES;
  }, [t]);

  const modeOptions = useMemo(
    () => [
      { value: 'today', label: t('calculators.age.modeToday') },
      { value: 'future', label: t('calculators.age.modeFuture') },
    ],
    [t]
  );

  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => String(i + 1)), []);
  const months = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        value: String(i + 1),
        label: `${i + 1} - ${monthNames[i] || DEFAULT_MONTH_NAMES[i]}`,
      })),
    [monthNames]
  );

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
      setResult(t('calculators.age.validation.invalidBirthDate'));
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
        setResult(t('calculators.age.validation.invalidTargetDate'));
        return;
      }
    }

    if (compareDate <= birthDate) {
      setIsError(true);
      setResult(t('calculators.age.validation.targetBeforeBirth'));
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
    const localeCode = language === 'en' ? 'en-US' : 'tr-TR';

    const currentMonthName = monthNames[compareDate.getMonth()] || DEFAULT_MONTH_NAMES[compareDate.getMonth()];
    const formattedCompare = `${compareDate.getDate()} ${currentMonthName} ${compareDate.getFullYear()}`;

    setResult(t('calculators.age.results.header', { date: formattedCompare }));
    setStatus(
      t('calculators.age.results.ageBreakdown', {
        years,
        months: monthsDiff,
        days: daysDiff,
      })
    );

    let detailStr = t('calculators.age.results.totalDays', {
      days: totalDays.toLocaleString(localeCode),
    });

    if (calcDateMode === 'today') {
      const today = new Date();
      let nextBirthday = new Date(today.getFullYear(), bMonth - 1, bDay);
      if (today > nextBirthday) {
        nextBirthday = new Date(today.getFullYear() + 1, bMonth - 1, bDay);
      }
      const daysToNext = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      detailStr += t('calculators.age.results.daysUntilBirthday', { days: daysToNext });
    }

    setDetail(detailStr);
    setLoading(false);
  };

  const formulaInfo = (
    <div>
      <p>
        <strong>{t('calculators.age.info.title')}</strong>
        <br />
        {t('calculators.age.info.desc1')}
        <br />
        {t('calculators.age.info.desc2')}
      </p>
    </div>
  );

  return (
    <CalculatorLayout
      category={t('calculators.age.category')}
      title={t('calculators.age.title')}
      description={t('calculators.age.description')}
      infoTitle={t('calculators.age.infoTitle')}
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
          label={t('calculators.age.modeLabel')}
          options={modeOptions}
          selectedValue={calcDateMode}
          onChange={handleModeChange}
          direction="column"
        />

        <div className="date-section-title">{t('calculators.age.birthDateTitle')}</div>
        <div className="date-picker-row">
          <div className="date-select-wrapper">
            <label className="date-select-label" htmlFor="birth-day">
              {t('calculators.age.dayLabel')}
            </label>
            <select
              id="birth-day"
              className="date-select-field"
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
            >
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="date-select-wrapper">
            <label className="date-select-label" htmlFor="birth-month">
              {t('calculators.age.monthLabel')}
            </label>
            <select
              id="birth-month"
              className="date-select-field"
              value={birthMonth}
              onChange={(e) => setBirthMonth(e.target.value)}
            >
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <div className="date-select-wrapper">
            <label className="date-select-label" htmlFor="birth-year">
              {t('calculators.age.yearLabel')}
            </label>
            <select
              id="birth-year"
              className="date-select-field"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
            >
              {birthYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {calcDateMode === 'future' && (
          <>
            <div className="date-section-title">{t('calculators.age.targetDateTitle')}</div>
            <div className="date-picker-row">
              <div className="date-select-wrapper">
                <label className="date-select-label" htmlFor="target-day">
                  {t('calculators.age.dayLabel')}
                </label>
                <select
                  id="target-day"
                  className="date-select-field"
                  value={targetDay}
                  onChange={(e) => setTargetDay(e.target.value)}
                >
                  {days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="date-select-wrapper">
                <label className="date-select-label" htmlFor="target-month">
                  {t('calculators.age.monthLabel')}
                </label>
                <select
                  id="target-month"
                  className="date-select-field"
                  value={targetMonth}
                  onChange={(e) => setTargetMonth(e.target.value)}
                >
                  {months.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="date-select-wrapper">
                <label className="date-select-label" htmlFor="target-year">
                  {t('calculators.age.yearLabel')}
                </label>
                <select
                  id="target-year"
                  className="date-select-field"
                  value={targetYear}
                  onChange={(e) => setTargetYear(e.target.value)}
                >
                  {targetYears.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}

        <SubmitButton loading={loading} onClick={hesapla} text={t('common.calculate')} />
      </form>
    </CalculatorLayout>
  );
}
