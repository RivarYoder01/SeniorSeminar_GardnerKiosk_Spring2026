function CardPrograms(props) {
  return (
    <div>
    <div className="grid grid-cols-3 gap-5 mx-20 my-10">
        <div>
            <img src={props.programImage} alt={props.programName} className="rounded-full my-auto mt-5 col-span-1 w-full h-auto object-cover" />
        </div>
        <div className="text-left my-auto ml-10 col-span-2">
            <h4 className="text-base/12 pb-5">{props.programName}</h4>
            <p><span className="font-bold">Discipline: </span> {props.programDiscipline}</p>
            <p><span className="font-bold">Meeting Time & Days: </span> {props.programMeetingTime}</p>
            <p><span className="font-bold">Contact: </span> {props.programContact}</p>
            <p>{props.programSpecial}</p>
        </div>
    </div>
        <div className="mb-10 bg-[var(--color-gold-dark)] h-0.5 mx-20" />
    </div>
  );
}

export default CardPrograms;