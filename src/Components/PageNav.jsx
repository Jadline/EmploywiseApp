import { NavLink } from "react-router-dom"
import styled from "styled-components"
const Navigation = styled.span`
    font-size : 1.6rem;
    text-align : center;
    padding : 2rem;
`

function PageNav(){
    return(
        <>
            <Navigation> &larr; Back to<NavLink to='/login'> Login</NavLink></Navigation>
        </>
    )
}
export default  PageNav