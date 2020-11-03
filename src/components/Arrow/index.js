import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const Arrow = ({direction}) => <i className={`Arrow Arrow--${direction}`} />;

Arrow.propTypes = {direction: PropTypes.oneOf(['up', 'down']).isRequired};

export default Arrow;