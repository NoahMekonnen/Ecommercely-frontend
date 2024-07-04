import { fireEvent, getAllByLabelText, getByPlaceholderText, render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';


describe("App", () => {
    test('renders', () => {
        render(<MemoryRouter>
            <App />
        </MemoryRouter>);
        //   const linkElement = screen.getByText(/learn react/i);
        //   expect(linkElement).toBeInTheDocument();
    });

    test("customer user flow", () =>{
        const {getByText, getByLabelText} = render(<MemoryRouter>
            <App />
        </MemoryRouter>)
        // going to login page
        const loginLink = getByText('Log in')
        fireEvent.click(loginLink);
        getByText('Username')

        fireEvent.change(getByLabelText('username', {exact: false}), {target: {value: 'Krystalle Tolworthie'}})
        fireEvent.change(getByLabelText('password', {exact: false}), {target: {value: '$2a$04$ClEuvnXUFhTxFzkrzOWRkOJ5HbXgxoA6ATjxyr6MoBGxAECQCH5x6'}})
        fireEvent.click(getByText('Login'))
        fireEvent.click(getByText("No Products yet..."))
        // // going to Sign Up Page
        // getByText("No Products yet...");
        // const signUpLink = getByText('Sign up');
        // fireEvent.click(signUpLink);
        // getByText("Username");
        // getByText("Password");
        // getByText("Seller Account?")

        // // signing up
        // fireEvent.change(getByLabelText('username', {exact: false}), {target: {value: 't111'}})
        // fireEvent.change(getByLabelText('password', {exact: false}), {target: {value: 'p1'}})
        // // const button = getByText('SignUp')
        // // console.log(button,"SIGNUPPPPPP")
        // // console.log(getByText('SignUp'))
        // fireEvent.click(getByText('SignUp'))

        // checking home page and adding products to cart
        // const addToCart = getByText("Add to Cart");
        // fireEvent.click(addToCart);
        // console.log(getByText('No Products yet...'))

    })
})



