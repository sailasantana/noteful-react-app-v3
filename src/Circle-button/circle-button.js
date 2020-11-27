import React from 'react';
import PropTypes from 'prop-types';
import './circle-button.css';

export default function CircleButton(props) {
    const { tag, className, children, ...otherProps} = props
    
    return React.createElement(
        props.tag,
        {
            className: ['NavCircleButton', props.className].join(' '),
            ...otherProps
        },
        props.children 
    );
}

CircleButton.defaultProps = {
    tag: 'a',
}

CircleButton.propTypes = {
    tag: PropTypes.any.isRequired,
    children: PropTypes.node
}