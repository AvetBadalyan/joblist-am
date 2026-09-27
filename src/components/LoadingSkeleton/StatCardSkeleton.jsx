import {
  StatCardSkeletonWrapper,
  SkeletonBase,
} from '../../assets/wrappers/LoadingSkeleton'

const StatCardSkeleton = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <StatCardSkeletonWrapper key={i} aria-hidden='true'>
          <div className='skeleton-stat-header'>
            <SkeletonBase className='skeleton-count' />
            <SkeletonBase className='skeleton-stat-icon' />
          </div>
          <SkeletonBase className='skeleton-stat-title' />
        </StatCardSkeletonWrapper>
      ))}
    </>
  )
}

export default StatCardSkeleton
