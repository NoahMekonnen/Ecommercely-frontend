import { render } from "@testing-library/react";
import SellerProductList from "./SellerProductList";


describe("SellerProductList", () =>{
    test("renders", () =>{
        render(<SellerProductList products={[]}/>)
    })
})