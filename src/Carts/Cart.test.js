import { render } from "@testing-library/react";
import Cart from "./Cart";
import CartContext from "./CartContext";
import { MemoryRouter } from "react-router-dom";

describe("Cart", () => {
    test("renders", () => {
        render(
            <MemoryRouter>
                <CartContext.Provider value={{ cartItems: [] }}>
                    <Cart />
                </CartContext.Provider>
            </MemoryRouter>
        )
    })
})