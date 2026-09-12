import './InputField.css';

export default function InputField({
  id,
  name,
  label,
  placeholder,
  type = 'number',
  step = 'any',
  min,
  max,
  value,
  onChange,
  required = true,
  disabled = false,
  suffix,
  isError = false,
  autoComplete = 'off',
}) {
  const inputId = id || (name ? `input-${name}` : undefined);

  return (
    <div className={`custom-input-group ${isError ? 'has-error' : ''}`}>
      {label && (
        <label className="custom-input-label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className="custom-input-wrapper">
        <input
          id={inputId}
          name={name || id}
          className="custom-input-field"
          placeholder={placeholder}
          type={type}
          step={step}
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={isError}
        />
        {suffix && <span className="custom-input-suffix">{suffix}</span>}
        <span className="custom-input-border" />
      </div>
    </div>
  );
}
