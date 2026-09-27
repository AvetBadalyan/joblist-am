import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import styled from 'styled-components'

const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.$isSaved ? 'var(--primary-500)' : 'var(--grey-400)')};
  transition: var(--transition);
  border-radius: var(--borderRadius);
  min-width: 44px;
  min-height: 44px;

  &:hover:not(:disabled) {
    color: var(--primary-500);
    background: var(--grey-50);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  svg {
    font-size: 1.25rem;
  }
`

const BookmarkButton = ({ isSaved, onClick, disabled = false }) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={disabled}
      $isSaved={isSaved}
      aria-label={isSaved ? 'Remove from saved jobs' : 'Save job'}
      title={isSaved ? 'Remove from saved jobs' : 'Save job'}
    >
      {isSaved ? <FaBookmark /> : <FaRegBookmark />}
    </Button>
  )
}

export default BookmarkButton
