const FormRowTextArea = ({
  name,
  value,
  handleChange,
  labelText,
  required = false,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className="form-input"
        required={required}
      />
    </div>
  );
};

export default FormRowTextArea;
