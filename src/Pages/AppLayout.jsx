import { Outlet } from "react-router-dom"
import styled from "styled-components"
import PageNav from "../Components/PageNav"
const StyledAppLayout  = styled.main`
   
    height : 100vh;
`
function AppLayout(){
    return (
        <StyledAppLayout>
            <PageNav/>
            <Outlet/>
        </StyledAppLayout>
    )
}
export default AppLayout 