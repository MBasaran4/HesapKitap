import './RadioGroup.css';

export default function RadioGroup({
  name,
  label,
  options = [],
  selectedValue,
  onChange,
  direction = 'column',
  className = '',
}) {
  return (
    <fieldset className={`custom-radio-fieldset ${className}`}>
      {label && <legend className="custom-radio-legend">{label}</legend>}
      <div className={`custom-radio-group ${direction}`} role="radiogroup">
        {options.map((option) => {
          const isChecked = selectedValue === option.value;
          const optionId = `${name}-${option.value}`;
          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={`custom-radio-label ${isChecked ? 'selected' : ''}`}
            >
              <input
                id={optionId}
                type="radio"
                name={name}
                value={option.value}
                checked={isChecked}
                onChange={onChange}
                className="custom-radio-input"
              />
              <span className="custom-radio-custom" aria-hidden="true" />
              <span className="custom-radio-text">{option.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
