import { render } from "@testing-library/react";
import LoginPage from "./LoginPage";
import { BrowserRouter } from "react-router-dom";
import App from "../App";


describe("LoginPage", () => {
    test("renders", () => {
        const {getByText} = render(<BrowserRouter>
            <LoginPage data={{}}
                errorMessages={{}} />
        </BrowserRouter>
        )
        expect(getByText('Username')).toBeInTheDocument()
        expect(getByText('Password')).toBeInTheDocument()
    })
})