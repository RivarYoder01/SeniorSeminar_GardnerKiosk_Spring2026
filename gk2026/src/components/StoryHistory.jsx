function StoryHistory(props) {
  return (
    <div>
    <div className="mx-20 my-10">
        <div className="text-left grid grid-cols-2 gap-5 my-auto">
            <img src={props.historyDocuments} alt="History Documents" className="rounded-xl my-auto mt-5 w-full h-auto" />
            <img src={props.historyDocuments} alt="History Documents" className="rounded-xl my-auto mt-5 w-full h-auto" />
            <img src={props.historyDocuments} alt="History Documents" className="rounded-xl my-auto mt-5 w-full h-auto" />
            <img src={props.historyDocuments} alt="History Documents" className="rounded-xl my-auto mt-5 w-full h-auto" />
        </div>
    </div>
        <div className="mb-10 bg-[var(--color-gold-dark)] h-0.5 mx-20" />
    </div>
  );
}

export default StoryHistory;