import { Container, Button, Header, DropDown, CardClassrooms } from '../components';
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from 'react'



function Classrooms() {

const navigate = useNavigate()

  useEffect(() => {
    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll']
    const idleTimeout = 60_000
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
      <Header children='Classrooms'/> 
      <DropDown />
      <CardClassrooms 
        classroomImage="https://i.imgur.com/Gmv5buj.jpeg"
        classroomMap="https://i.imgur.com/jiMQT49.png"
        classroomNumber="100"
        classroomFloor="1"
        classroomLayout="Auditorium"
      />
      
      <div className="mx-20 mt-10">
        <Link to="/">
          <Button children="Back to Home"/>
        </Link>
      </div>

    </Container>


  )
}

export default Classrooms
