import {
  JobCardSkeletonWrapper,
  SkeletonBase,
} from '../../assets/wrappers/LoadingSkeleton'

const JobCardSkeleton = ({ count = 9 }) => {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <JobCardSkeletonWrapper key={i} aria-hidden='true'>
          <header className='skeleton-header'>
            <SkeletonBase className='skeleton-icon' />
            <div className='skeleton-title-group'>
              <SkeletonBase className='skeleton-title' />
              <SkeletonBase className='skeleton-subtitle' />
            </div>
          </header>
          <div className='skeleton-content'>
            <div className='skeleton-info-grid'>
              <SkeletonBase className='skeleton-info-item' />
              <SkeletonBase className='skeleton-info-item' />
              <SkeletonBase className='skeleton-info-item' />
              <SkeletonBase className='skeleton-badge' />
            </div>
            <div className='skeleton-footer'>
              <SkeletonBase className='skeleton-btn' />
              <SkeletonBase className='skeleton-btn' />
            </div>
          </div>
        </JobCardSkeletonWrapper>
      ))}
    </>
  )
}

export default JobCardSkeleton
