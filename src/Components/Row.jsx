import styled from "styled-components";

export const Row = styled.div`
    display : flex;
    background-color : ${(props) => props.$backgroundcolor || 'transparent'};
    width : 100%;
    color : ${(props) => props.$color || '#000'};
    align-items : center;
    gap : 1rem;
    padding : .5rem;
    justify-content : ${(props) => props.$justifycontent || 'flex-start'}
    
`