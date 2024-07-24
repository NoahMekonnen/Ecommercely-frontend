import CheckoutCartItemCard from "./CheckoutCartItemCard";
import CartContext from "./CartContext";
import { useContext } from "react";
import './CheckoutPage.css';
import {v4 as uuid} from 'uuid';
import { Loader } from "@googlemaps/js-api-loader";
import axios from "axios";


const CheckoutPage = ({ handleChange, address }) => {
    const {makePayment, cartItems} = useContext(CartContext)
    const getAddress = async () => {
        const res = await axios.get('https://www.google.com/maps/search/?api=1&query=a')
        console.log(res)
    }
    // getAddress()
    return (
        <div className="CheckoutPage">
            <div className="CheckoutPage-Content-Container">
            <div className="CheckoutPage-Items">
                {cartItems.map(item =>
                    <CheckoutCartItemCard
                        item={item} 
                        key={uuid()}/>
                )}
            </div>
            <div className='CheckoutPage-Form-Container'>
            <form onSubmit={makePayment}
                className="CheckoutPage-Form">
                <label htmlFor="address" className='CheckoutPage-label'>
                    <b>Address</b>
                </label>
                <input type='text'
                    value={address}
                    onChange={handleChange}
                    id="address"
                    className='form-control'
                />
                <button className='CheckoutPage-Form-Button form-control btn btn-success'
                onClick={makePayment}>
                    Proceed to Pay
                </button>
            </form>
            </div>
            </div>
        </div>
    )
}

export default CheckoutPage;