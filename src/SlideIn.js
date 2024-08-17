import "./SlideIn.css";

const SlideIn = ({children, showCart}) =>{
    let style = showCart ? {marginRight: '0px'} : {}
    
    return (
        <div className="SlideIn" style={style}>
            {children}
        </div>
    )
}

export default SlideIn;