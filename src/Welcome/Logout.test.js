import { render } from "@testing-library/react";
import Logout from "./Logout";


describe("Logout", () =>{
    test("renders", () =>{
        render(<Logout handleLogout={() =>{
            
        }}/>)
    })
})