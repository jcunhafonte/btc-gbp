import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const Header = ({title}) => {
    return (
        <div className="Header">
            <h1 className="Header__title">{title}</h1>
        </div>
    )
};

Header.propTypes = {title: PropTypes.string.isRequired};

export default Header;