import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  z-index: var(--z-modal);
  padding: var(--space-4);
`;

export const ModalBox = styled.div`
  background: var(--white);
  padding: var(--space-8);
  border-radius: var(--borderRadius);
  box-shadow: var(--shadow-4);
  max-width: 400px;
  width: 100%;

  h4 {
    margin-bottom: var(--space-3);
    font-size: var(--fs-lg);
    color: var(--grey-900);
  }

  p {
    color: var(--grey-600);
    margin-bottom: var(--space-6);
    line-height: 1.6;
  }

  .modal-actions {
    display: flex;
    gap: var(--space-3);
    justify-content: flex-end;
  }

  .cancel-btn {
    background: var(--grey-200);
    color: var(--grey-700);
    border: none;
    padding: var(--space-2) var(--space-4);
    border-radius: var(--borderRadius);
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    transition: var(--transition);
    min-height: 44px;

    &:hover {
      background: var(--grey-300);
    }
  }

  .confirm-btn {
    background: var(--red-dark);
    color: var(--white);
    border: none;
    padding: var(--space-2) var(--space-4);
    border-radius: var(--borderRadius);
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    transition: var(--transition);
    font-weight: 600;
    min-height: 44px;

    &:hover {
      background: color-mix(in srgb, var(--red-dark) 85%, black);
    }
  }
`;

const Wrapper = styled.div`
  ${Backdrop}
  ${ModalBox}
`;

export default Wrapper;
