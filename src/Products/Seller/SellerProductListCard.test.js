import { render } from "@testing-library/react";
import SellerProductListCard from "./SellerProductListCard";


describe("SellerProductListCard", () =>{
    test("renders", () =>{
        const {getByText} = render(<SellerProductListCard product={{price:1}}/>)
        expect(getByText('Quantity Available:')).toBeInTheDocument()
    })
})