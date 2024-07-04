import { render, screen } from '@testing-library/react';
import QuantityAdjuster from './QuantityAdjuster';
import CartContext from './Carts/CartContext';

describe("QuantityAdjuster", () => {

    test("renders", () => {
        render(<CartContext.Provider value={{handleQuantityAdjusterChange:() =>{

        }, decrease:() =>{

        } ,
         increase:() =>{

         }, cartItems:[]}}>
            <QuantityAdjuster id={5} />
        </CartContext.Provider>)
    })
})
