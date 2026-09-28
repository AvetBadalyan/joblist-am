import styled from "styled-components";

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
    min-height: 100vh;
  }

  .dashboard-page {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: var(--space-6) var(--space-4);
    padding-bottom: var(--space-12);
  }

  @media (min-width: 768px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }

    .dashboard-page {
      padding: var(--space-8) var(--space-6);
      padding-bottom: var(--space-16);
    }
  }

  @media (min-width: 1024px) {
    .dashboard-page {
      padding: var(--space-10) var(--space-8);
    }
  }
`;

export default Wrapper;
