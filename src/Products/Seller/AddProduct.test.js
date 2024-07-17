import { render } from "@testing-library/react";
import AddProduct from "./AddProduct";
import { BrowserRouter } from "react-router-dom";


describe("AddProduct", () => {
    test("renders", () => {
        const { getByText } = render(<BrowserRouter>
            <AddProduct productFormData={{}}
                errorMessages={{}} />
        </BrowserRouter>
        )

        expect(getByText('Expected Shipping Time in Days')).toBeInTheDocument()
    })
})