import { useState, useEffect } from 'react'
import SignupForm from '../../components/SignupForm/SignupForm'
import styles from './Signup.module.css'

const Signup = props => {
  const [message, setMessage] = useState([''])

  useEffect(() => {
    window.scrollTo(0, 0)
    props.handlePageChange()
  }, [])

  const updateMessage = msg => {
    setMessage(msg)
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Sign Up</h1>
        <p>{message}</p>
        <SignupForm {...props} updateMessage={updateMessage} />
      </div>
    </main>
  )
}

export default Signup
