import styled from "styled-components";

export const Heading = styled.h1`
    font-size: 2.5rem;
    text-align: ${(props) => (props.$isCenter ? "center" : "left")};
    margin-bottom: 1rem;
`;
