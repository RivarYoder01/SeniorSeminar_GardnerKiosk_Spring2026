import { Container, Button, Header, DropDown, CardHistory, StoryHistory } from '../components';
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from 'react'



function History() {
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
      <Header children='History'/> 
      <DropDown />
      <CardHistory 
        historyGardnerNow="https://www.wsc.edu/images/hero_document_gardner_hall.jpg"
        historySummary="Gardner Hall houses the Business and Economics Department at Wayne State. The facility connects to the Center for Applied Technology via a second-story catwalk, providing for all-weather transitions between the two buildings. Gardner Hall, a modern and spacious 40,000 square foot facility, was  built in 1994. Its 200-seat auditorium serves as a great location for  speakers and other events on campus."
      />
      <StoryHistory
        historyDocuments="https://www.wsc.edu/images/hero_document_gardner_hall.jpg"
      />
      
      <div className="mx-20 mt-10">
        <Link to="/">
          <Button children="Back to Home"/>
        </Link>
      </div>

    </Container>
  )
}

export default History
