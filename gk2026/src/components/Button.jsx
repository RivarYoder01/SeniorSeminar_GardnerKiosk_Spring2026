
function Button(props) {
  return (
    <div className={`w-full ${props.customClass || ""}`}>
      <button className="w-full cursor-pointer rounded-full border-1 border-[var(--color-bur-light)] bg-[var(--color-slate)] px-8 py-6 text-center text-2xl uppercase transition-colors duration-200 ease-in-out hover:bg-white/20 active:bg-white/30 focus-visible:outline-2 focus-visible:outline-[var(--color-gold-light)] focus-visible:outline-offset-2">
          {props.children}
        </button>
    </div>

  );
}

export default Button;