import React from 'react';
import { Query } from 'react-apollo';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import IssueList from '../components/IssueList';
import { GET_ISSUES_OF_REPOSITORY } from '../graphql/queries';

const Issues = ({ repositoryOwner, repositoryName }) => {
    return (
        <div className="issues">
            <Query query={GET_ISSUES_OF_REPOSITORY} variables={{ repositoryOwner, repositoryName }}>
                {({ data, loading, error }) => {
                    if (error) return <ErrorMessage error={error} />;
                    const { repository } = data;

                    if (loading && !repository) {
                        return <Loading />;
                    }

                    if (!repository.issues.edges.length) {
                        return <div className="issues__empty">No Issues...</div>;
                    }
                    return <IssueList issues={repository.issues} />;
                }}
            </Query>
        </div>
    );
};

export default Issues;
