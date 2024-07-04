import { render } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { BrowserRouter } from "react-router-dom";


describe("Dashboard", () =>{
    test("renders", () =>{
        render(<BrowserRouter>
        <Dashboard approvedTransactions={[]}
        interactions={[]}
        products={[]}/>
        </BrowserRouter>
        )
    })
})