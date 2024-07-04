import { render } from "@testing-library/react";
import SellerOrderList from "./SellerOrderList";


describe("SellerOrderList", () =>{
    test("renders", () =>{
        render(<SellerOrderList interactions={[]}/>)
    })
})