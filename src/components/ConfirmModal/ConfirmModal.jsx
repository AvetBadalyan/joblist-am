import { useEffect } from "react";
import { Backdrop, ModalBox } from "../../assets/wrappers/ConfirmModal";

const ConfirmModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Delete",
  cancelText = "Cancel",
}) => {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <Backdrop onClick={onCancel} aria-hidden="true">
      <ModalBox
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h4 id="modal-title">{title}</h4>
        <p>{message}</p>
        <div className="modal-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>
            {cancelText}
          </button>
          <button type="button" className="confirm-btn" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </ModalBox>
    </Backdrop>
  );
};

export default ConfirmModal;
