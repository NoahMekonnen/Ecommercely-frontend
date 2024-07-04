import { render, screen } from '@testing-library/react';
import CheckoutCartItemCard from './CheckoutCartItemCard';
import CartContext from './CartContext';

describe("CheckoutCartItemCard", () =>{
    test("renders", () =>{
        render(<CartContext.Provider value={{handleQuantityAdjusterChange:() =>{

        }, decrease:() =>{

        } ,
         increase:() =>{

         }, cartItems:[]}}>
        <CheckoutCartItemCard item={{}}/>
        </CartContext.Provider>)
    })
})