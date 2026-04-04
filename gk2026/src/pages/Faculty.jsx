import { Container, Button, Header, DropDown, CardFaculty } from '../components';
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from 'react'



function Faculty() {
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
      <Header children='Faculty and Staff'/> 
      <DropDown />
      <CardFaculty 
        facultyImage="https://www.wsc.edu/images/directory_michelle_laughlin_2022.jpg?1.23.0"
        facultyName="Michelle Laughlin"
        facultyDepartment="Buisness and Economics"
        facultyOffice="111G"
        facultyPhone="402-375-7022"
        facultyEmail="milaugh1@wsc.edu"
      />
      
      <div className="mx-20 mt-10">
        <Link to="/">
          <Button children="Back to Home"/>
        </Link>
      </div>

    </Container>


  )
}

export default Faculty
