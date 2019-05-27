import React from 'react';

const ErrorMessage = ({ error }) => (
    <div className="error">
        <small className="error__message">
            {error.toString()}
        </small>
    </div>
);

export default ErrorMessage;