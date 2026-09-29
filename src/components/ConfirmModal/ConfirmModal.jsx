import { useEffect, useRef } from "react";
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
  const modalRef = useRef(null);
  const cancelBtnRef = useRef(null);

  // Focus management: move focus into the dialog on open, keep Tab trapped
  // inside it, and restore focus to the triggering element on close.
  useEffect(() => {
    if (!isOpen) return undefined;

    const previouslyFocused = document.activeElement;
    cancelBtnRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onCancel();
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = modalRef.current?.querySelectorAll("button");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <Backdrop onClick={onCancel}>
      <ModalBox
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h4 id="modal-title">{title}</h4>
        <p>{message}</p>
        <div className="modal-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
            ref={cancelBtnRef}
          >
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
