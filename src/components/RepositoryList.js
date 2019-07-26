import React from 'react';
import RepositoryItem from './RepositoryItem';
import IssuesContainer from '../containers/IssuesContainer';
import FetchMore from './FetchMore';

const RepositoryList = ({ repositories, fetchMore, loading, entry }) => {
    const updateQuery = (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
            return previousResult;
        }

        return {
            ...previousResult,
            [entry]: {
                ...previousResult[entry],
                repositories: {
                    ...previousResult[entry].repositories,
                    ...fetchMoreResult[entry].repositories,
                    edges: [
                        ...previousResult[entry].repositories.edges,
                        ...fetchMoreResult[entry].repositories.edges
                    ]
                }
            }
        };
    };

    return (
        <>
            {repositories.edges.map(({ node }) => (
                <div key={node.id} className="repository-item">
                    <RepositoryItem {...node} />
                    <IssuesContainer
                        repositoryName={node.name}
                        repositoryOwner={node.owner.login}
                    />
                </div>
            ))}

            <FetchMore
                loading={loading}
                hasNextPage={repositories.pageInfo.hasNextPage}
                variables={{ cursor: repositories.pageInfo.endCursor }}
                updateQuery={updateQuery}
                fetchMore={fetchMore}
            >
                Repositories
            </FetchMore>
        </>
    );
};

export default RepositoryList;
