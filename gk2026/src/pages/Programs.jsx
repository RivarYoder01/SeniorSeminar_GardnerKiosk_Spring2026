import { Container, Button, Header, DropDown, CardPrograms } from '../components';
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from 'react'

import {programs} from '../data/programs.js'
 

function Programs() {
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
      <Header children='Programs and Clubs'/> 
      <div className="mx-20">
        <DropDown 
            label="type"
            options={[
              { value: "*", label: "All" },
              { value: "academic_programs", label: "Academic Programs" },
              { value: "clubs", label: "Clubs" },
              { value: "honors", label: "Honors" },
            ]}
          />
      </div>
      {programs.map((program) => (
        <CardPrograms
          programImage={program.logo}
          programName={program.name}
          programGPA={program.gpa}
          programRank={program.class_rank}
          programCredits={program.completed_credits}
          programSpecial={program.special_requirements}
          programDiscipline={program.discipline}
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

export default Programs
