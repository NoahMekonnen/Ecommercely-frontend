import { render } from "@testing-library/react";
import SellerProductList from "./SellerProductList";


describe("SellerProductList", () =>{
    test("renders", () =>{
        const {getByText} = render(<SellerProductList products={[]}/>)
        expect(getByText('No Available Products...')).toBeInTheDocument
    })
})