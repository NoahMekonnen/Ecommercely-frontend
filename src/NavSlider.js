import "./NavSlider.css";

const NavSlider = ({children, showCart}) =>{
    
    const style = showCart ? {width: '92%'} : {width: '100%'};
    return(
        <div className="NavSlider" style={style}>{children}</div>
    )
}

export default NavSlider;