import { Container, Button, Header, DropDown, CardFaculty } from '../components';
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';

function Faculty() {
  const navigate = useNavigate()
  const [faculty, setFaculty] = useState([])
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

    const loadFaculty = async () => {
      try {
        setIsLoading(true)
        setError('')
        const response = await axios.get(`${API_BASE_URL}/faculty`)
        if (isMounted) {
          setFaculty(Array.isArray(response.data) ? response.data : [response.data])
        }
      } catch {
        if (isMounted) {
          setError('Unable to load faculty from the database.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadFaculty()

    return () => {
      isMounted = false
    }
  }, [])

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
      {isLoading && <div className="mx-20 my-10">Loading faculty from the database...</div>}
      {error && <div className="mx-20 my-10 text-red-700">{error}</div>}
      {!isLoading && !error && faculty.map((facultyMember, index) => (
        <CardFaculty 
          key={facultyMember.id ?? index}
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
