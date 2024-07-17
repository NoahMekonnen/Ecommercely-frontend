import { render } from "@testing-library/react";
import Cart from "./Cart";
import CartContext from "./CartContext";
import { BrowserRouter } from "react-router-dom";

describe("Cart", () => {
    test("renders", () => {
        const {getByText} = render(
            <BrowserRouter>
                <CartContext.Provider value={{ cartItems: [], showCart: true }}>
                    <Cart />
                </CartContext.Provider>
            </BrowserRouter>
        )
        expect(getByText('Proceed To Checkout', {exact: false})).toBeInTheDocument()
    })
})