import { Container } from './components';
// import { Header } from './components';
import { Button } from './components';


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
      <div className="grid grid-cols-2 gap-10 mx-20">
        <Button children="Faculty and Staff" />
        <Button children="Classrooms and Labs" />
        <Button children="Programs and Clubs" />
        <Button children="History and Floor Plans" /> 
      </div>
    </Container>
  )
}

export default App
