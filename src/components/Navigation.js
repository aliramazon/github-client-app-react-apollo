import React from 'react';
import { NavLink } from 'react-router-dom';
import { ORGANIZATION, PROFILE } from '../constants/constants';

const Navigation = () => {
    return (
        <nav className="navigation">
            <div className="navigation__link">
                <NavLink exact to={ORGANIZATION} activeClassName="selected">Organization</NavLink>
            </div>
            <div className="navigation__link">
                <NavLink exact to={PROFILE} activeClassName="selected">Profile</NavLink>
            </div>
        </nav>
    )
}

export default Navigation;