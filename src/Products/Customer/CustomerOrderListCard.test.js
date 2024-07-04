import { render } from "@testing-library/react";
import CustomerOrderListCard from "./CustomerOrderListCard";


describe("CustomerOrderListCard", () =>{
    test("renders", () =>{
        render(<CustomerOrderListCard interaction={{price:1}}/>)
    })
})