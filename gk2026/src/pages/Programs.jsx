import { Container, Button, Header, DropDown, CardPrograms } from '../components';
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';
 

function Programs() {
  const navigate = useNavigate()
  const [programs, setPrograms] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

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

  useEffect(() => {
    let isMounted = true

    const loadPrograms = async () => {
      try {
        setIsLoading(true)
        setError('')
        const response = await axios.get(`${API_BASE_URL}/programs`)
        if (isMounted) {
          setPrograms(Array.isArray(response.data) ? response.data : [response.data])
        }
      } catch {
        if (isMounted) {
          setError('Unable to load programs from the database.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadPrograms()

    return () => {
      isMounted = false
    }
  }, [])

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
      {isLoading && <div className="mx-20 my-10">Loading programs from the database...</div>}
      {error && <div className="mx-20 my-10 text-red-700">{error}</div>}
      {!isLoading && !error && programs.map((program) => (
        <CardPrograms
          key={program.id}
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
