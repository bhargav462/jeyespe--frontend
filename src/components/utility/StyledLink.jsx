import React from 'react'
import styled from 'styled-components';
import { NavLink } from "react-router-dom";


const StyledLink = styled(NavLink)`
    text-decoration: none;
    color: black;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

export default  (props) => <StyledLink {...props} />