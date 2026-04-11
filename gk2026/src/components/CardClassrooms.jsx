function CardClassrooms(props) {

  return (
    <div className="static">
    <div className="mx-20 my-10">
        <div className="text-left grid grid-cols-3 gap-full my-auto">
            <h4 className="my-auto">Room {props.classroomNumber}</h4>
            <p className="my-auto text-center"><span className="font-bold">Floor: </span> {props.classroomFloor}</p>
            <p className="my-auto text-right text-nowrap"><span className="font-bold">Layout: </span> {props.classroomLayout}</p>
        </div>
            
        <div className=" flex flex-row gap-10 h-full">
      <div className="relative my-auto mt-5 w-full h-full">
        <img src={props.classroomMap} alt={props.classroomName} className="rounded-2xl w-full h-full object-cover" />
        <img src="/youarehere.svg" alt="You Are Here" className="pointer-events-none absolute left-30 top-36 z-10 w-5 h-5 object-contain" />
      </div>
            <img src={props.classroomImage} alt={props.classroomName} className="rounded-2xl my-auto mt-5 w-full h-full object-cover" />
          
        </div> 
    </div>
        <div className="mb-10 bg-[var(--color-gold-dark)] h-0.5 mx-20" />
    </div>
  );
}

export default CardClassrooms;