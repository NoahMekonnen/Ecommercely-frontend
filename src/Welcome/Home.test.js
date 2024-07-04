import { fireEvent, render } from "@testing-library/react";
import Home from "./Home";


describe("Home", () => {
    test("renders", () => {
        render(<Home products={[]} />)
    })
})