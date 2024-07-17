import { render } from "@testing-library/react";
import CustomerOrderListCard from "./CustomerOrderListCard";


describe("CustomerOrderListCard", () =>{
    test("renders", () =>{
        const {getByText} = render(<CustomerOrderListCard interaction={{price:1}}/>)
        expect(getByText('Quantity Bought:')).toBeInTheDocument()
    })
})