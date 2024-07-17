import { getByText, render } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { BrowserRouter } from "react-router-dom";


describe("Dashboard", () => {
    test("renders", () => {
        const { getByText } = render(<BrowserRouter>
            <Dashboard approvedTransactions={[]}
                interactions={[]}
                products={[]} />
        </BrowserRouter>
        )

        expect(getByText('My Available Products')).toBeInTheDocument()
    })

})