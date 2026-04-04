function CardHistory(props) {
  return (
    <div className="mx-20 my-10 flow-root">
        <div>
            <img src={props.historyGardnerNow} alt="History Summary" className="rounded-2xl ml-10 float-right h-48 w-100 object-cover" />

            <p className="text-left">{props.historySummary}</p>
        </div>
    </div>
  );
}

export default CardHistory;