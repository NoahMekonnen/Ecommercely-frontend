import { render } from "@testing-library/react";
import AddProduct from "./AddProduct";
import { BrowserRouter } from "react-router-dom";


describe("AddProduct", () =>{
    test("renders", () =>{
        render(<BrowserRouter>
        <AddProduct productFormData={{}}
        errorMessages={{}}/>
        </BrowserRouter>
        )
    })
})