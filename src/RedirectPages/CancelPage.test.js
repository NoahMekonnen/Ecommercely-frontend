import { render } from "@testing-library/react";
import CancelPage from "./CancelPage";


describe("CancelPage", () =>{
    test("renders", () =>{
        const {getByText} = render(<CancelPage setShowRedirectPage={() =>{}}/>)

        expect(getByText('Your Transaction was canceled')).toBeInTheDocument()
    })
})