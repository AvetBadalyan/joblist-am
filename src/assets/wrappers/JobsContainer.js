import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: var(--space-8);

  h5 {
    font-weight: 700;
    margin-bottom: var(--space-6);
  }

  & > h5 {
    margin-bottom: var(--space-6);
  }

  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: var(--space-8);
  }

  @media (min-width: 992px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-4);
    }
  }
`;

export default Wrapper;
