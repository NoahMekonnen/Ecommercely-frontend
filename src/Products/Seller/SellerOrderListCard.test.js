import { render } from "@testing-library/react";
import SellerOrderListCard from "./SellerOrderListCard";


describe("SellerOrderListCard", () =>{
    test("renders", () =>{
        render(<SellerOrderListCard interaction={{price:1}}/>)
    })
})