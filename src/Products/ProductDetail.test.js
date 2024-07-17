import { render } from "@testing-library/react";
import ProductDetail from "./ProductDetail";

describe("ProductDetail", () =>{
    test("renders", () =>{
        const {getByText} = render(<ProductDetail user={{}}/>)

        expect(getByText('Reviews')).toBeInTheDocument()
        expect(getByText('Quantity Available:')).toBeInTheDocument()
    })
})