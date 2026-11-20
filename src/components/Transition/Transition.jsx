import { useEffect, useRef } from "react"

const Transition = ({className, children, show, onClick}) => {
    // console.log(props);
    const div = useRef(null);
    // console.log(div);
    useEffect(()=>{
        if (div.current && show) {
            div.current.classList.add('active')
        } else if(div.current && !show) {
            div.current.classList.remove('active')
        }        
    })
  return (
    <div onMouseDown={onClick} ref={div} className={className}>
        {children}
    </div>
  )
}

export default Transition