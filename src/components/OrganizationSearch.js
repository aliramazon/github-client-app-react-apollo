import React, { useState } from 'react';

const OrganizationSearch = ({ organizationName, setOrgName }) => {
    const [value, setValue] = useState('');

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setOrgName(value || 'facebook');
        setValue('');
    };

    const handleOnChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <form onSubmit={handleOnSubmit}>
            <input type="text" onChange={handleOnChange} value={value} />
            <button type="submit">Search</button>
        </form>
    );
};

export default OrganizationSearch;
