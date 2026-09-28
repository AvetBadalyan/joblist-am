import styled from "styled-components";

const Wrapper = styled.article`
  padding: var(--space-6);
  background: var(--white);
  border-radius: var(--radius-2xl);
  transition: var(--transition);
  box-shadow: var(--shadow-card);
  border: 1px solid var(--grey-100);
  border-bottom: 5px solid ${(props) => props.color};

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-card-hover);
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
  }

  .count {
    display: block;
    font-family: var(--font-heading);
    font-weight: 800;
    font-size: var(--fs-3xl);
    color: ${(props) => props.color};
    line-height: 1;
  }

  .title {
    margin: 0;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: left;
    margin-top: var(--space-3);
    color: var(--grey-500);
    font-size: var(--fs-sm);
    font-weight: 600;
  }

  .icon {
    width: 56px;
    height: 56px;
    background: ${(props) => props.bcg};
    border-radius: var(--radius-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    svg {
      font-size: var(--fs-2xl);
      color: ${(props) => props.color};
    }
  }

  @media (min-width: 576px) {
    padding: var(--space-8);

    .count {
      font-size: var(--fs-stat);
    }

    .icon {
      width: 70px;
      height: 60px;

      svg {
        font-size: var(--fs-3xl);
      }
    }
  }

  @media (max-width: 359px) {
    padding: var(--space-4);

    .count {
      font-size: var(--fs-2xl);
    }

    .icon {
      width: 44px;
      height: 44px;

      svg {
        font-size: var(--fs-xl);
      }
    }
  }
`;

export default Wrapper;
