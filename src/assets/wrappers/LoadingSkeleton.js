import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`

export const SkeletonBase = styled.div`
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  background: #e5e7eb;
  border-radius: 4px;
`

export const JobCardSkeletonWrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  box-shadow: var(--shadow-2);
  display: grid;
  grid-template-rows: 1fr auto;

  .skeleton-header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 2rem;
  }

  .skeleton-icon {
    width: 60px;
    height: 60px;
    border-radius: var(--borderRadius);
  }

  .skeleton-title-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .skeleton-title {
    height: 1.1rem;
    width: 60%;
    border-radius: 4px;
  }

  .skeleton-subtitle {
    height: 0.85rem;
    width: 40%;
    border-radius: 4px;
  }

  .skeleton-content {
    padding: 1rem 1.5rem;
  }

  .skeleton-info-grid {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .skeleton-info-item {
    height: 0.85rem;
    width: 70%;
    border-radius: 4px;
  }

  .skeleton-badge {
    height: 30px;
    width: 100px;
    border-radius: var(--borderRadius);
    margin-top: 0.5rem;
  }

  .skeleton-footer {
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
  }

  .skeleton-btn {
    height: 30px;
    width: 70px;
    border-radius: var(--borderRadius);
  }
`

export const StatCardSkeletonWrapper = styled.article`
  padding: 2rem;
  background: var(--white);
  border-radius: var(--borderRadius);
  border-bottom: 5px solid #e5e7eb;

  .skeleton-stat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }

  .skeleton-count {
    height: 3.5rem;
    width: 4rem;
    border-radius: 4px;
  }

  .skeleton-stat-icon {
    width: 70px;
    height: 60px;
    border-radius: var(--borderRadius);
  }

  .skeleton-stat-title {
    height: 0.85rem;
    width: 50%;
    border-radius: 4px;
    margin-top: 0.5rem;
  }
`
