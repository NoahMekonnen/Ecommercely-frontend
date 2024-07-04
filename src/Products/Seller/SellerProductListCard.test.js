import { render } from "@testing-library/react";
import SellerProductListCard from "./SellerProductListCard";


describe("SellerProductListCard", () =>{
    test("renders", () =>{
        render(<SellerProductListCard product={{price:1}}/>)
    })
})