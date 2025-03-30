import styled from "styled-components";

export const InlineItem = styled.span`
    margin-left: 1rem;
    text-decoration: ${(props) => (props.$isUnderlined ? "underline" : "none")};
    color: ${(props) => props.$color || "#000"};
    font-size: ${(props) => props.$fontSize || "1.4rem"};
    text-align: ${(props) => props.$isCenter || "left"};
`;
