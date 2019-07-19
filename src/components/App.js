import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProfileContainer from '../containers/ProfileContainer';
import OrganizationContainer from '../containers/OrganizationContainer';
import Navigation from './Navigation';
import { ORGANIZATION, PROFILE } from '../constants/constants';

const App = () => {
    const [orgName, setOrgName] = useState('facebook');
    return (
        <Router>
            <div className="app">
                <Navigation organizationName={orgName} setOrgName={setOrgName} />
                <main className="app__content">
                    <Route
                        exact
                        path={ORGANIZATION}
                        component={() => <OrganizationContainer organizationName={orgName} />}
                    />
                    <Route exact path={PROFILE} component={ProfileContainer} />
                </main>
            </div>
        </Router>
    );
};

export default App;
