import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: var(--space-8);
  padding: var(--space-4) 0;
  gap: var(--space-2);

  .page-indicator {
    font-size: var(--fs-sm);
    color: var(--grey-500);
    font-weight: 500;
    /* Keep the indicator on the left; cluster the controls together on the right */
    margin-right: auto;
  }

  .btn-container {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    justify-content: center;
  }

  .pageBtn {
    background: var(--white);
    border: 2px solid var(--grey-200);
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: var(--fs-sm);
    color: var(--grey-600);
    transition: var(--transition);
    border-radius: var(--radius-lg);
    cursor: pointer;

    &:hover {
      border-color: var(--primary-300);
      color: var(--primary-600);
      background: var(--primary-50);
    }
  }

  .active {
    background: var(--primary-600);
    border-color: var(--primary-600);
    color: var(--white);

    &:hover {
      background: var(--primary-700);
      border-color: var(--primary-700);
      color: var(--white);
    }
  }

  .prev-btn,
  .next-btn {
    background: var(--white);
    border: 2px solid var(--grey-200);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    gap: var(--space-2);
    cursor: pointer;
    transition: var(--transition);
    padding: var(--space-2) var(--space-4);
    min-height: 44px;
    font-weight: 600;
    font-size: var(--fs-sm);
    color: var(--grey-600);

    &:hover {
      border-color: var(--primary-300);
      color: var(--primary-600);
      background: var(--primary-50);
    }
  }

  @media (max-width: 576px) {
    justify-content: center;
    gap: var(--space-2);

    .page-indicator {
      /* Full-width, centered above the controls on small screens */
      width: 100%;
      text-align: center;
      margin-right: 0;
      margin-bottom: var(--space-2);
    }
  }
`;

export default Wrapper;
