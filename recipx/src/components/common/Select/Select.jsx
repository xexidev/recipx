import './Select.css'

export default function Select ({ id, name, className, multiple, required, disabled, onChange, options, hasLabel, label, labelId, labelClassName }) {
  return (
    <>
      { hasLabel && <label htmlFor={id} id={labelId} className={labelClassName}>{label}</label> }
      <select
        id={id}
        name={name}
        className={className ? `${className} select-component` : 'select-component'}
        onChange={onChange}
        multiple={multiple}
        required={required}
        disabled={disabled}
      >
        { options?.map((option, index) =>
          <option key={index} value={option.value}>{option.label}</option>
        )}
      </select>
    </>
  )
}
