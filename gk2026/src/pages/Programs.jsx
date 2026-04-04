import { Container, Button, Header, DropDown, CardPrograms } from '../components';
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from 'react'


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
      <DropDown />
      
      <CardPrograms
        programImage="https://i.imgur.com/c00cirl.png"
        programName="Upsilon Pi Epsilon"
        programGPA="3.5"
        programRank="15"
        programCredits="45"
        programSpecial="15 credit hours in CIS or CSC"
        programDiscipline="Computer Science or CTIS"
      />
      
      <div className="mx-20 mt-10">
        <Link to="/">
          <Button children="Back to Home"/>
        </Link>
      </div>
    </Container>
  )
}

export default Programs
