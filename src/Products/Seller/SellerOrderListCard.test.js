import { render } from "@testing-library/react";
import SellerOrderListCard from "./SellerOrderListCard";


describe("SellerOrderListCard", () =>{
    test("renders", () =>{
        const {getByText} = render(<SellerOrderListCard interaction={{price:1}}/>)
        expect(getByText('Approve')).toBeInTheDocument()
    })
})