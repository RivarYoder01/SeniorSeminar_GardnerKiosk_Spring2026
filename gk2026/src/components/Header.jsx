function Header(props) {
  return (
    <div className={`flex flex-row gap-0 mx-20  ${props.customClass || ""}`}>
      <h2 className="text-nowrap">
        {props.children}
      </h2>
      <div className="my-auto ml-5 w-full bg-[var(--color-gold-dark)] h-0.5" />
    </div>
  );
}

export default Header;