import styled from "styled-components";

const Wrapper = styled.section`
  h5 {
    font-weight: 700;
    font-size: var(--fs-lg);
    color: var(--grey-900);
    margin-bottom: var(--space-6);
  }

  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  @media (min-width: 768px) {
    .jobs {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

export default Wrapper;
