import { useEffect } from 'react';
import './SuccessPage.css';

const SuccessPage = ({ setShowRedirectPage }) => {
    console.log("on success")
    // useEffect(() => {
    //     setShowRedirectPage((data) => {
    //         console.log(data, "show redirect data")
    //         return ({
    //         ...data,
    //         cancel: 'false'
    //     })
    // }, [])
    // },[])

    return (
        <div className="SuccessPage">
            <div className='SuccessPage-Display btn btn-success'>
                Your Transaction was successful
            </div>
        </div>
    )
}

export default SuccessPage