const FormRow = ({ type, name, value, handleChange, labelText, onBlur }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        className="form-input"
      />
    </div>
  );
};
export default FormRow;
