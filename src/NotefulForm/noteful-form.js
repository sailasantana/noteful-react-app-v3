import React from 'react';
import './noteful-form.css';

export default function NotefulForm(props) {
    const { className, ...otherProps} = props;

    return (
        <form
            className={['Noteful-form', className].join(' ')}
            action="#"
            {...otherProps}/>
    );
}