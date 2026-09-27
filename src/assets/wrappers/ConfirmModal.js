import styled from 'styled-components'

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  z-index: 1000;
`

export const ModalBox = styled.div`
  background: var(--white);
  border-radius: var(--borderRadius);
  box-shadow: var(--shadow-4);
  padding: 2rem;
  width: 90%;
  max-width: 420px;

  h4 {
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
    color: var(--grey-900);
  }

  p {
    margin-bottom: 1.5rem;
    color: var(--grey-500);
    line-height: 1.6;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
  }

  .cancel-btn {
    background: var(--grey-100);
    color: var(--grey-700);
    border: transparent;
    border-radius: var(--borderRadius);
    padding: 0.375rem 0.75rem;
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: var(--grey-200);
    }
  }

  .confirm-btn {
    background: var(--red-light);
    color: var(--red-dark);
    border: transparent;
    border-radius: var(--borderRadius);
    padding: 0.375rem 0.75rem;
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;

    &:hover {
      background: var(--red-dark);
      color: var(--white);
    }
  }
`
