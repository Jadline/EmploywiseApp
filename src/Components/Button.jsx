import styled from "styled-components";

export const Button = styled.button`
    padding: ${(props) => props.$padding || "1.5rem 2.8rem"};
    outline: none;
    border: none;
    width: ${(props) => props.$width || "auto"};
    background-color: ${(props) => props.$backgroundColor || "#a10404"};
    color: #fff;
    border-radius: 0.3rem;
    display: ${(props) => (props.$isFlex ? "flex" : "inline-block")};
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-block: ${(props) => props.$margin || 0};

    &:hover {
        background-color: #c50606;
    }
`;
