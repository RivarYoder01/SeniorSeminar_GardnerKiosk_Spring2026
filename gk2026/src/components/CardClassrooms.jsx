function CardClassrooms(props) {
  return (
    <div>
    <div className="mx-20 my-10">
        <div className="text-left grid grid-cols-3 gap-full my-auto">
            <h4 className="my-auto">Room {props.classroomNumber}</h4>
            <p className="my-auto text-center">Floor: {props.classroomFloor}</p>
            <p className="my-auto text-right">Layout: {props.classroomLayout}</p>
        </div>
            
        <div className="flex flex-row gap-10 h-full">
            <img src={props.classroomMap} alt={props.classroomName} className="rounded-2xl my-auto mt-5 w-full h-full object-cover" />
            <img src={props.classroomImage} alt={props.classroomName} className="rounded-2xl my-auto mt-5 w-full h-full object-cover" />
        </div> 
    </div>
        <div className="mb-10 bg-[var(--color-gold-dark)] h-0.5 mx-20" />
    </div>
  );
}

export default CardClassrooms;