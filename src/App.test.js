import { fireEvent, render, waitFor, findAllByText, screen, getByRole, findByRole, queryByRole } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { EcommerceApi } from './api';
import '@testing-library/jest-dom'


describe("App", () => {
    test('renders', () => {
        render(<MemoryRouter>
            <App />
        </MemoryRouter>);
    });

    const u1 = {
        id: 1,
        username: "test1"
    }

    const u2 = {
        id: 2,
        username: 's1',
        isSeller: true
    }

    test("customer user flow", async () => {
        EcommerceApi.register = jest.fn(() =>
            Promise.resolve("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6InRlc3QxIn0.PFV6il4ARQcw4GoiqS1uPJM7NP1kEzGSMW4C_I1N7og"))
        EcommerceApi.getProducts = jest.fn(() => Promise.resolve([
            { id: 1, name: 'fish', price: 4, quantity: 2, sellerId: 1 }, { id: 2, name: 'bread', price: 5, quantity: 3, sellerId: 2 }]))
        EcommerceApi.getProduct = jest.fn((id) => {
            if (id == 1) return Promise.resolve({ id: 1, name: 'fish', price: 4, quantity: 2, sellerId: 1 })
            else return Promise.resolve({ id: 2, name: 'bread', price: 5, quantity: 3, sellerId: 2 })
        })
        EcommerceApi.buyCart = jest.fn((id, items, address) => { })
        EcommerceApi.getPastCustomerTransactions = jest.fn((username) =>
            Promise.resolve([{ name: 'bread', price: 5, quantityChosen: 2, expectedShippingTime: 3 }]))

        const { getByText, getByLabelText } = render(<MemoryRouter>
            <App />
        </MemoryRouter>)

        // going to Sign Up Page
        await waitFor(() => getByText("bread"));

        await waitFor(() => fireEvent.click(getByText('Sign up')));

        expect(getByText("Username")).toBeInTheDocument();
        expect(getByText("Password")).toBeInTheDocument();
        expect(getByText("Seller Account?")).toBeInTheDocument();

        // signing up
        await waitFor(() => {
            fireEvent.change(getByLabelText('username', { exact: false }), { target: { value: 't1' } })
            fireEvent.change(getByLabelText('password', { exact: false }), { target: { value: 'p1' } })
            fireEvent.click(getByText('SignUp'))
        })

        // at home page
        expect(getByText('t1', { exact: false })).toBeInTheDocument()

        
            expect(EcommerceApi.register).toHaveBeenCalledWith({
                username: "t1",
                password: 'p1',
                isSeller: false
            })
      
        
        await waitFor(() =>{
            expect(EcommerceApi.getProducts.mock.calls).toHaveLength(2)
        })

        // adding to cart

        await waitFor(async () => {
            const btns = await screen.findAllByText('Add to cart')
            fireEvent.click(btns[1])
        })

        // opening cart component

        await waitFor(async () => {
            const allBtns = await screen.getAllByRole('button')
            fireEvent.click(allBtns[2])
        })
 
        await waitFor(() => {
            fireEvent.click(getByText('+'))
        })

        const quantityInput = await screen.getByRole('textbox', { name: "amount" })
        expect(quantityInput.value).toEqual("2")

        // proceed to checkout page
        
        await waitFor( async () => {
            const newBtns = await screen.getAllByRole('button')
            fireEvent.click(newBtns[3])
        })

        await waitFor(() => {
            const addressInput = getByLabelText('Address')
        fireEvent.change(addressInput, { target: { value: 'Brickwood' } })
            fireEvent.click(getByText("Proceed to Pay"))
        })

        await waitFor(() => {
            expect(EcommerceApi.buyCart.mock.calls).toHaveLength(1)
        })
    })

    test("seller user flow", async () => {
        EcommerceApi.register = jest.fn(() =>
            Promise.resolve("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJ1c2VybmFtZSI6InMxIiwiaXNTZWxsZXIiOiJ0cnVlIn0.xt7IHmJAJEPQ9Qmm76n0uv2j-pI8ZdwC4CuAVzX_pzk"))
        EcommerceApi.getProducts = jest.fn(() => Promise.resolve([
            { id: 1, name: 'fish', price: 4, quantity: 2, sellerId: 1 }, { id: 2, name: 'bread', price: 5, quantity: 3, sellerId: 2 }]))
        EcommerceApi.getProduct = jest.fn((id) => {
            if (id == 1) return Promise.resolve({ id: 1, name: 'fish', price: 4, quantity: 2, sellerId: 1 })
            else return Promise.resolve({ id: 2, name: 'bread', price: 5, quantity: 3, sellerId: 2 })
        })
        EcommerceApi.getApprovedTransactions = jest.fn((username) => 
            Promise.resolve([]))
        EcommerceApi.createProduct = jest.fn((data, id) => {})
        const { getByText, getByLabelText } = render(<MemoryRouter>
            <App />
        </MemoryRouter>)

        await waitFor(() =>{
            expect(getByText("bread", {exact: false})).toBeInTheDocument()
        });

        // going to Sign Up Page
        await waitFor(() => {
            fireEvent.click(getByText('Sign up'))
        });

        expect(getByText("Username")).toBeInTheDocument();
        expect(getByText("Password")).toBeInTheDocument();
        expect(getByText("Seller Account?")).toBeInTheDocument();

        // signing up
        await waitFor(() => {
            fireEvent.change(getByLabelText('username', { exact: false }), { target: { value: 's1' } })
        fireEvent.change(getByLabelText('password', { exact: false }), { target: { value: 'p1' } })
        fireEvent.change(screen.getByRole('combobox'), { target: { value: "Yes" } })
            fireEvent.click(getByText('SignUp'))
    })

        expect(getByText('s1', { exact: false })).toBeInTheDocument()
        await waitFor(() =>{
            fireEvent.click(getByText("Make Product"))
        })

        fireEvent.change(getByLabelText('Name', { exact: false }), { target: { value: 'blessings' } })
        fireEvent.change(getByLabelText('Description', { exact: false }), { target: { value: "Gives salvation" } })
        fireEvent.change(getByLabelText('Price', { exact: false }), { target: { value: 5 } })
        fireEvent.change(getByLabelText('Image url', { exact: false }), { target: { value: 'https://m.media-amazon.com/images/I/71bNx1cAkqL._AC_UF894,1000_QL80_.jpg' } })
        fireEvent.change(getByLabelText('Quantity', { exact: false }), { target: { value: 50 } })
        fireEvent.change(getByLabelText('Category', { exact: false }), { target: { value: "Jesus" } })
        fireEvent.change(getByLabelText("Expected Shipping Time in Days", { exact: false }), { target: { value: 3 } })

        const btns = await screen.getAllByText('Make Product')

        fireEvent.click(btns[1])


    })
})



