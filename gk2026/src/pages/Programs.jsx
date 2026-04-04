import { Container, Button, Header, DropDown, CardPrograms } from '../components';
import { Link, useNavigate } from "react-router-dom"


function Programs() {
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
