import { render } from "@testing-library/react";
import CheckoutPage from "./CheckoutPage";
import CartContext from "./CartContext";

describe("CheckoutPage", () =>{
    test("renders", () =>{
        render(<CartContext.Provider value={{makePayment: () =>{

        }, cartItems:[]}}>
            <CheckoutPage />
        </CartContext.Provider>)
    })
})