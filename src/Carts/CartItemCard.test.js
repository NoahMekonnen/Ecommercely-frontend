import { render } from "@testing-library/react";
import CartContext from "./CartContext";
import CartItemCard from "./CartItemCard";

describe("CartItemCard", () =>{
    test("renders", () =>{
        render(<CartContext.Provider value={{handleRemoveFromCart:() =>{

        }, increase:() =>{

        }, decrease: () =>{

        }, cartItems: []}}>
            <CartItemCard item={{}}/>
        </CartContext.Provider>)
    })
})