import Wrapper from "../../assets/wrappers/StatusDropdown";

const STATUS_OPTIONS = ["applied", "reviewing", "interview", "offer", "rejected"];

const StatusDropdown = ({ value, onChange, disabled = false }) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <Wrapper>
      <select
        className={`status-select status-${value}`}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        aria-label="Application status"
      >
        {STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </Wrapper>
  );
};

export default StatusDropdown;
