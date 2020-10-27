import React from 'react'
import styled from 'styled-components';
import { Link } from "react-router-dom";


const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

export default  (props) => <StyledLink {...props} />