import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import OrganizationSearch from './OrganizationSearch';
import { ORGANIZATION, PROFILE } from '../constants/constants';

const Navigation = ({ location: { pathname }, organizationName, setOrgName }) => {
    return (
        <header className="navigation">
            <div className="navigation__links">
                <NavLink exact to={ORGANIZATION} activeClassName="selected">
                    Organization
                </NavLink>
                <NavLink exact to={PROFILE} activeClassName="selected">
                    Profile
                </NavLink>
            </div>
            {pathname === ORGANIZATION && (
                <div className="navigation__form">
                    <OrganizationSearch
                        organizationName={organizationName}
                        setOrgName={setOrgName}
                    />
                </div>
            )}
        </header>
    );
};

export default withRouter(Navigation);
