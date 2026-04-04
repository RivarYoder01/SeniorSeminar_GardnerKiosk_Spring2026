function Container(props) {
  return (
    <div className="mx-auto mt-30 w-[min(70%,1000px)] pt-10 pb-20 h-auto text-center justify-center !bg-[var(--color-bur-dark)]/75 rounded-lg">
        {props.children}
    </div>
    
  )
}

export default Container;