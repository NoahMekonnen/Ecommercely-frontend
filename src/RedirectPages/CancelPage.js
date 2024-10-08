import './CancelPage.css';

const CancelPage = ({setShowRedirectPage}) =>{
    setShowRedirectPage((data) => ({
        ...data,
        success: 'false'
    }),[])
 
    return(
        <div className="CancelPage">
            <div className='CancelPage-Display'>
                Your Transaction was canceled
            </div>
        </div>
    )
}

export default CancelPage