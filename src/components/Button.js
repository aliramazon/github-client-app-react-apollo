import React from 'react';
import classnames from 'classnames';

const Button = ({ children, className, ...props }) => {
    return (
        <button className={classnames(className, 'button')} {...props}>
            {children}
        </button>
    );
};

export default Button;
