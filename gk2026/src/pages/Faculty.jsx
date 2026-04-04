import { Container, Button, Header, DropDown, CardFaculty } from '../components';
import { Link, useNavigate } from "react-router-dom"


function Faculty() {
  return (
    <Container>
      <Header children='Faculty and Staff'/> 
      <DropDown />
      <CardFaculty 
        facultyImage="https://www.wsc.edu/images/directory_michelle_laughlin_2022.jpg?1.23.0"
        facultyName="Michelle Laughlin"
        facultyDepartment="Buisness and Economics"
        facultyOffice="111G"
        facultyPhone="402-375-7022"
        facultyEmail="milaugh1@wsc.edu"
      />
      
      <div className="mx-20 mt-10">
        <Link to="/">
          <Button children="Back to Home"/>
        </Link>
      </div>

    </Container>


  )
}

export default Faculty
