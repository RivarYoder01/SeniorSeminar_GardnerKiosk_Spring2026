import { Container, Button, Header, DropDown, CardClassrooms } from '../components';
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import { classrooms } from '../data/classrooms';



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
      <div className="mx-20">
        <DropDown 
            label="layout"
            options={[
              { value: "*", label: "All" },
              { value: "classroom", label: "Classroom" },
              { value: "lecture_hall", label: "Lecture Hall" },
              { value: "computer_lab", label: "Computer Lab" },
              { value: "auditorium", label: "Auditorium" },
            ]}
          />
      </div>
      {classrooms.map((classrooms) => (
          <CardClassrooms 
            classroomImage={classrooms.image}
            classroomMap={classrooms.map}
            classroomNumber={classrooms.name}
            classroomFloor={classrooms.floor}
            classroomLayout={classrooms.layout}
          />
        ))}
      <div className="fixed bottom-0 right-0 w-1/10 m-6">
        <Link to="/">
          <Button children="Back"/>
        </Link>
      </div>

    </Container>


  )
}

export default Classrooms
