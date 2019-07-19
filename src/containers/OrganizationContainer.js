import React from 'react';
import { Query } from 'react-apollo';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import RepositoryList from '../components/RepositoryList';
import { GET_REPOSITORIES_OF_ORGANIZATION } from '../graphql/queries';

const OrganizationContainer = ({ organizationName }) => {
    return (
        <Query
            query={GET_REPOSITORIES_OF_ORGANIZATION}
            variables={{ organizationName }}
            skip={organizationName === ''}
            notifyOnNetworkStatusChange={true}
        >
            {({ loading, error, data, fetchMore }) => {
                const { organization } = data;
                if (error) return <ErrorMessage error={error} />;
                if (loading && !organization) return <Loading />;
                console.log(data);
                return (
                    <RepositoryList
                        repositories={organization.repositories}
                        fetchMore={fetchMore}
                        entry={'organization'}
                    />
                );
            }}
        </Query>
    );
};

export default OrganizationContainer;
