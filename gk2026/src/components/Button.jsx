function Button(props) {
  return (
    <div className={`w-full ${props.customClass || ""}`}>
      <button className="w-full rounded-full bg-[var(--color-slate)]  duration-300 ease-in-out hover:bg-white/20 border-1 border-[var(--color-bur-light)] px-8 py-6 text-center font-[Yaldevi] text-2xl uppercase">
          {props.children}
        </button>
    </div>

  );
}

export default Button;