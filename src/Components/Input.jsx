import styled from "styled-components"
export const Input = styled.input`
    border : ${(props) => props.$border || 'none'};
    outline : none;
    padding : .7rem;
    background-color : transparent;
    color : ${(props) => props.$color || '#000'};
   
`