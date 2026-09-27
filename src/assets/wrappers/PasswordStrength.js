import styled from 'styled-components'

const Wrapper = styled.div`
  margin-top: 0.25rem;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: var(--letterSpacing);

  .strength-label {
    display: inline-block;
  }

  &.weak .strength-label {
    color: #e12d39;
  }

  &.medium .strength-label {
    color: #e9b949;
  }

  &.strong .strength-label {
    color: #27ae60;
  }
`

export default Wrapper
