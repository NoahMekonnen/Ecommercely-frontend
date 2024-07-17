import { render, screen } from '@testing-library/react';
import CheckoutCartItemCard from './CheckoutCartItemCard';
import CartContext from './CartContext';

describe("CheckoutCartItemCard", () => {
    test("renders", () => {
        const {getByText} = render(<CartContext.Provider value={{
            handleQuantityAdjusterChange: () => { },
            decrease: () => { },
            increase: () => { },
            cartItems: []
        }}>
            <CheckoutCartItemCard item={{}} />
        </CartContext.Provider>)
        expect(getByText('Name:')).toBeInTheDocument()
    })
})