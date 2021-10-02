import React from "react";
import PropTypes from 'prop-types';

//Styles
import { Wrapper, Content } from './Grid.styles';

const Grid = ({header, children, isHome = true}) => (
    <Wrapper>
        <h1><a>{header}</a></h1>
        <Content home = {isHome}>{children}</Content>
    </Wrapper>

)

Grid.propTypes = {
    header: PropTypes.string,
}

export default Grid;

