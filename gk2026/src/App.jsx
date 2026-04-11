import { Container } from './components';
import { Button } from './components';
import { Link } from "react-router-dom"

function App() {
  return (
    <Container>
      {/* Title */}
      <div className="flex flex-col w-full gap-0">
        <h1>
          GARDNER HALL
        </h1>
        <div className="mx-20 mb-10 bg-[var(--color-gold-dark)] h-0.5" />
      </div>

      {/* Button Set */}
      <div className="grid grid-cols-2 gap-10 mx-20 [&>a]:block [&>a]:w-full">
        <Link to="/faculty">
          <Button children="Faculty and Staff" />
        </Link>
        <Link to="/programs">
          <Button children="Programs and Clubs" />
        </Link>
        <Link to="/classrooms">
          <Button children="Classrooms and Labs" />
        </Link>
        <Link to="/history">
          <Button children="History and Schematics" /> 
        </Link>
      </div>
    </Container>
  )
}

export default App
