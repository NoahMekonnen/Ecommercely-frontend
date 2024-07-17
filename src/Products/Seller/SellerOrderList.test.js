import { render } from "@testing-library/react";
import SellerOrderList from "./SellerOrderList";


describe("SellerOrderList", () =>{
    test("renders", () =>{
        const {getByText} = render(<SellerOrderList interactions={[]}/>)

        expect(getByText('No Pending Orders...')).toBeInTheDocument()
    })
})