import { render } from "@testing-library/react";
import SuccessPage from "./SuccessPage";


describe("SuccessPage", () =>{
    test("renders", () =>{
        render(<SuccessPage setShowRedirectPage={() =>{
            
        }}/>)
    })
})