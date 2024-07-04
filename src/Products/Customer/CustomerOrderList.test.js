import { render } from "@testing-library/react";
import CustomerOrderList from "./CustomerOrderList";


describe("CustomerOrderList", () =>{
    test("renders", () =>{
        render(<CustomerOrderList interactions={[]}/>)
    })
})