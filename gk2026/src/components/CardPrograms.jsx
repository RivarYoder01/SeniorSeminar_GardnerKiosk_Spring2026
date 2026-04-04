function CardPrograms(props) {
  return (
    <div>
    <div className="grid grid-cols-3 gap-5 mx-20 my-10">
        <div>
            <img src={props.programImage} alt={props.programName} className="rounded-full my-auto mt-5 col-span-1 w-full h-auto object-cover" />
        </div>
        <div className="text-left my-auto ml-10 col-span-2">
            <h4>{props.programName}</h4>
            <p>GPA: {props.programGPA}+</p>
            <p>Class Rank: Top {props.programRank}% of class</p>
            <p>Credits Completed: {props.programCredits}</p>
            <p>Special Requirements: {props.programSpecial}</p>
            <p>Discipline: {props.programDiscipline}</p>

        </div>
    </div>
        <div className="mb-10 bg-[var(--color-gold-dark)] h-0.5 mx-20" />
    </div>
  );
}

export default CardPrograms;