import { Container, Button, Header, DropDown, CardFaculty } from '../components';
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from 'react'

import { faculty } from '../data/faculty';

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
      <div className="mx-20">
        <DropDown 
            label="department"
            options={[
              { value: "*", label: "All" },
              {value: "business", label: "Business and Economics" },
              { value: "ctis", label: "Computer and Technology Information Systems" },
              
            ]}
          />
      </div>
      {faculty.map((facultyMember) => (
        <CardFaculty 
          facultyImage={facultyMember.headshot}
          facultyName={`${facultyMember.first_name} ${facultyMember.last_name}`}
          facultyDepartment={facultyMember.department}
          facultyOffice={facultyMember.office}
          facultyPhone={facultyMember.phone}
          facultyEmail={facultyMember.email}
        />
      ))}
      
      <div className="mx-20 mt-10">
        <Link to="/">
          <Button children="Back to Home"/>
        </Link>
      </div>

    </Container>


  )
}

export default Faculty
