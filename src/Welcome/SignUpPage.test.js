import { render } from "@testing-library/react";
import SignUpPage from "./SignUpPage";
import { BrowserRouter } from "react-router-dom";


describe("SignUpPage", () =>{
    test("renders", () =>{
        const {getByText} = render(<BrowserRouter>
        <SignUpPage data={{}}/>
        </BrowserRouter>
        )

        expect(getByText('SignUp')).toBeInTheDocument()
    })
})