import { render } from "@testing-library/react";
import CancelPage from "./CancelPage";


describe("CancelPage", () =>{
    test("renders", () =>{
        render(<CancelPage setShowRedirectPage={() =>{
            
        }}/>)
    })
})