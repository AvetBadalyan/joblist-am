import Wrapper from '../../assets/wrappers/PasswordStrength'

const getStrength = (password) => {
  const len = password.length
  if (len < 6) return { level: 'Weak', className: 'weak' }
  if (len <= 9) return { level: 'Medium', className: 'medium' }
  return { level: 'Strong', className: 'strong' }
}

const PasswordStrength = ({ password }) => {
  if (!password) return null

  const { level, className } = getStrength(password)

  return (
    <Wrapper className={className}>
      <span className='strength-label'>Password strength: {level}</span>
    </Wrapper>
  )
}

export default PasswordStrength
