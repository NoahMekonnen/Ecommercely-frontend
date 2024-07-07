import { fireEvent, render, waitFor, findAllByText, screen, getByRole } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { EcommerceApi } from './api';


describe("App", () => {
    test('renders', () => {
        render(<MemoryRouter>
            <App />
        </MemoryRouter>);
    });

    const u1 = {
        id: 1,
        username:"test1"
    }
    // axios = jest.fn() 
    test("customer user flow", async () => {
        // EcommerceApi.request = jest.fn(() =>{})
        EcommerceApi.register = jest.fn(() => 
        Promise.resolve("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6InRlc3QxIn0.PFV6il4ARQcw4GoiqS1uPJM7NP1kEzGSMW4C_I1N7og"))
        EcommerceApi.getProducts = jest.fn(() => Promise.resolve([
            { id: 1, name: 'fish', price: 4, quantity: 2, sellerId: 1}, { id:2, name: 'bread', price: 5, quantity: 3, sellerId: 2}]))
        EcommerceApi.getProduct = jest.fn((id) =>{
            console.log(id,"ODDDD")
            if(id == 1) return Promise.resolve({ id: 1, name: 'fish', price: 4, quantity: 2, sellerId: 1})
            else return Promise.resolve({ id: 2, name: 'bread', price: 5, quantity: 3, sellerId: 2})
        })
        


        const { getByText, getByLabelText } = render(<MemoryRouter>
            <App />
        </MemoryRouter>)

        // going to Sign Up Page
        await waitFor(() => getByText("bread"));

        const signUpLink = getByText('Sign up');
        fireEvent.click(signUpLink);
        getByText("Username");
        getByText("Password");
        getByText("Seller Account?")

        // signing up
        fireEvent.change(getByLabelText('username', {exact: false}), {target: {value: 't1'}})
        fireEvent.change(getByLabelText('password', {exact: false}), {target: {value: 'p1'}})
        
        fireEvent.click(getByText('SignUp'))

        await waitFor(() => { 
            expect(EcommerceApi.register).toHaveBeenCalledWith({
                username: "t1",
                password: 'p1',
                isSeller: false
            })
        });
        await waitFor(() =>{
            expect(EcommerceApi.getProducts.mock.calls).toHaveLength(2)
        })
        const btns = await screen.findAllByText('Add to cart')

        fireEvent.click(btns[1])

        const allBtns = await screen.getAllByRole('button')
        
        fireEvent.click(allBtns[2])

        const increseBtn = getByText('+')

        fireEvent.click(increseBtn)

        // const input = await screen.getByRole('input')
        await waitFor(() => screen.findAllByText('2'))
        
        // checking home page and adding products to cart
        // await waitFor(() => getByText("Add to Cart"));
        // fireEvent.click(addToCart);

    })
})



