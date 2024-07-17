import { render } from "@testing-library/react";
import CheckoutPage from "./CheckoutPage";
import CartContext from "./CartContext";

describe("CheckoutPage", () => {
    test("renders", () => {
        const { getByText } = render(<CartContext.Provider value={{
            makePayment: () => { },
            cartItems: []
        }}>
            <CheckoutPage />
        </CartContext.Provider>)
        expect(getByText('Proceed to Pay')).toBeInTheDocument()
    })
})