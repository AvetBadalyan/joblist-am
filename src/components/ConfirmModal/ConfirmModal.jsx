import { Backdrop, ModalBox } from '../../assets/wrappers/ConfirmModal'

const ConfirmModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Delete',
  cancelText = 'Cancel',
}) => {
  if (!isOpen) return null

  return (
    <Backdrop onClick={onCancel} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      {/* Stop clicks inside the box from closing the modal */}
      <ModalBox onClick={(e) => e.stopPropagation()}>
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
  )
}

export default ConfirmModal
