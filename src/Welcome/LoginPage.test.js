import { render } from "@testing-library/react";
import LoginPage from "./LoginPage";
import { BrowserRouter } from "react-router-dom";


describe("LoginPage", () =>{
    test("renders", () =>{
        render(<BrowserRouter>
        <LoginPage data={{}}
        errorMessages={{}}/>
        </BrowserRouter>
        )
    })
})