import { Container, Button, Header, DropDown, CardClassrooms } from '../components';
import { Link, useNavigate } from "react-router-dom"


function Classrooms() {
  return (
    <Container>
      <Header children='Classrooms'/> 
      <DropDown />
      <CardClassrooms 
        classroomImage="https://i.imgur.com/X4XO5FN.png"
        classroomMap="https://i.imgur.com/jiMQT49.png"
        classroomNumber="101"
        classroomFloor="2"
        classroomLayout="Classroom"
      />
      
      <div className="mx-20 mt-10">
        <Link to="/">
          <Button children="Back to Home"/>
        </Link>
      </div>

    </Container>


  )
}

export default Classrooms
