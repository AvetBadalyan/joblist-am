import styled from "styled-components";

const Wrapper = styled.article`
  padding: var(--space-8);
  background: var(--white);
  border-radius: var(--borderRadius);
  border-bottom: 5px solid ${(props) => props.color};
  transition: var(--transition);

  &:hover {
    transform: scale(1.02);
    box-shadow: var(--shadow-3);
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .count {
    display: block;
    font-weight: 700;
    font-size: var(--fs-stat);
    color: ${(props) => props.color};
  }

  .title {
    margin: 0;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: left;
    margin-top: var(--space-2);
    color: var(--grey-600);
  }

  .icon {
    width: 70px;
    height: 60px;
    background: ${(props) => props.bcg};
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      font-size: var(--fs-3xl);
      color: ${(props) => props.color};
    }
  }
`;

export default Wrapper;
