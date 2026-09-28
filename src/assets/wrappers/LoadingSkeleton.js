import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

export const SkeletonBase = styled.div`
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  background: var(--grey-200);
  border-radius: var(--radius-lg);
`;

export const SkeletonLine = styled(SkeletonBase)`
  height: ${(props) => props.height || "1rem"};
  width: ${(props) => props.width || "100%"};
  margin-bottom: ${(props) => props.mb || "0"};
`;

export const SkeletonCircle = styled(SkeletonBase)`
  width: ${(props) => props.size || "50px"};
  height: ${(props) => props.size || "50px"};
  border-radius: var(--radius-full);
`;

export const JobCardSkeletonWrapper = styled.div`
  background: var(--white);
  border-radius: var(--borderRadius);
  box-shadow: var(--shadow-2);
  padding: var(--space-6);
  margin-bottom: var(--space-4);

  .skeleton-header {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-4);
  }

  .skeleton-info {
    flex: 1;
  }

  .skeleton-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-2);
  }
`;

export const StatCardSkeletonWrapper = styled.div`
  background: var(--white);
  border-radius: var(--borderRadius);
  border-bottom: 5px solid var(--grey-200);
  padding: var(--space-8);

  .skeleton-stat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .skeleton-count {
    width: 60px;
    height: 48px;
  }

  .skeleton-icon {
    width: 60px;
    height: 60px;
    border-radius: var(--borderRadius);
  }

  .skeleton-stat-title {
    height: 1rem;
    width: 80%;
    margin-top: var(--space-4);
  }
`;

export const StatSkeletonWrapper = StatCardSkeletonWrapper;
