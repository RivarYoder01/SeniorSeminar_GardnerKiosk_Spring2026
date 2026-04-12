import { Container, Button, Header, CardHistory, StoryHistory } from '../components';
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import { history } from '../data/history';



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
      {history.map((history) => (
        <CardHistory 
          historyGardnerNow={history.gardnerNow}
          historySummary={history.historySummary}
        />
      ))}
      {history.map((history) => (
        <StoryHistory
          historyDocuments1={history.historyDocuments1}
          historyDocuments2={history.historyDocuments2}
          historyDocuments3={history.historyDocuments3}
          historyDocuments4={history.historyDocuments4}
          historyDocuments5={history.historyDocuments5}
          historyDocuments6={history.historyDocuments6}
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

export default History
