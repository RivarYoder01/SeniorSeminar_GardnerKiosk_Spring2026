function Header(props) {
  return (
    <div className={`flex flex-col w-full gap-0 ${props.customClass || ""}`}>
      <h1>
        {props.children}
      </h1>
      <div className="w-full bg-[var(--color-gold-dark)] h-0.5" />
    </div>
  );
}

export default Header;