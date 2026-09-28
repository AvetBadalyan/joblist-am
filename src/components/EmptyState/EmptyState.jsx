import Wrapper from "../../assets/wrappers/EmptyState";

const EmptyState = ({
  message = "No jobs to display",
  actionText,
  onAction,
}) => {
  return (
    <Wrapper>
      <h2>{message}</h2>
      {actionText && onAction && (
        <button type="button" className="btn btn-block" onClick={onAction}>
          {actionText}
        </button>
      )}
    </Wrapper>
  );
};

export default EmptyState;
