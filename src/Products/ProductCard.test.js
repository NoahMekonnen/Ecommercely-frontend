import { render } from "@testing-library/react";
import ProductCard from "./ProductCard";
import ProductContext from "./ProductContext";
import { BrowserRouter } from "react-router-dom";

describe("ProductCard", () =>{
    test("renders", () =>{
        render(<BrowserRouter>
        <ProductContext.Provider value={{handleAddToCart: () =>{

        }}}>
        <ProductCard product={{price:1}} user={{}}/>
        </ProductContext.Provider>
        </BrowserRouter>
        )
    })
})