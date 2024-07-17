import { render } from "@testing-library/react";
import SuccessPage from "./SuccessPage";


describe("SuccessPage", () =>{
    test("renders", () =>{
        const {getByText} = render(<SuccessPage setShowRedirectPage={() =>{}}/>)

        expect(getByText('Your Transaction was successful')).toBeInTheDocument()
    })
})