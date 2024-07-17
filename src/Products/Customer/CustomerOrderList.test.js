import { render } from "@testing-library/react";
import CustomerOrderList from "./CustomerOrderList";


describe("CustomerOrderList", () =>{
    test("renders", () =>{
        const {getByText} = render(<CustomerOrderList interactions={[]}/>)
        expect(getByText('No transactions yet...')).toBeInTheDocument()
    })
})