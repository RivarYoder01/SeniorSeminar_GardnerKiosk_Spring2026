import { Container, Header } from '../components';
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'

// import { Button } from './components';


function NotFound() {
const navigate = useNavigate()

  useEffect(() => {
    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll']
    const idleTimeout = 5_000
    let timeoutId = window.setTimeout(() => {
      navigate('/')
    }, idleTimeout)

    const resetTimer = () => {
      window.clearTimeout(timeoutId)
      timeoutId = window.setTimeout(() => {
        navigate('/')
      }, idleTimeout)
    }

    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, resetTimer, { passive: true })
    })

    return () => {
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, resetTimer)
      })
      window.clearTimeout(timeoutId)
    }
  }, [navigate])


  return (
    <Container>
      <Header children='404 - Page Not Found'/>
      <p className="text-center text-lg mt-4">No worries! You'll be redirected shortly...</p>
    </Container>
  )
}

export default NotFound
