import styled from "styled-components";

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: ${(props) => props.$backgroundColor || "transparent"};
`;
