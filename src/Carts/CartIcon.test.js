import { render } from "@testing-library/react";
import CartIcon from './CartIcon';
import CartContext from "./CartContext";

describe("CartIcon", () =>{
    test("renders", () =>{
        render(<CartContext.Provider value={{cartItems:[]}}>
            <CartIcon/>\
        </CartContext.Provider>)
    })
})