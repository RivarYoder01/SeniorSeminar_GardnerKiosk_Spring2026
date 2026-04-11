function CardFaculty(props) {
  return (
    <div>
    <div className="grid grid-cols-3 gap-5 mx-20 my-10">
        <div>
            <img src={props.facultyImage} alt={props.facultyName} className="rounded-full my-auto col-span-1 object-cover" />
        </div>
        <div className="text-left my-auto ml-10 col-span-2">
            <h4>{props.facultyName}</h4>
            <p><span className="font-bold">Department: </span> {props.facultyDepartment}</p>
            <p><span className="font-bold">Office: </span> {props.facultyOffice}</p>
            <p><span className="font-bold">Phone: </span> {props.facultyPhone}</p>
            <p><span className="font-bold">Email: </span> {props.facultyEmail}</p>
        </div>
    </div>
        <div className="mb-10 bg-[var(--color-gold-dark)] h-0.5 mx-20" />
    </div>
  );
}

export default CardFaculty;