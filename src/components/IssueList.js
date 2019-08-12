import React from 'react';
import IssueItem from './IssueItem';
import FetchMore from './FetchMore';

const IssueList = ({ issues, fetchMore, loading }) => {
    const updateQuery = (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
            return previousResult;
        }

        console.log(fetchMoreResult);
        return {
            ...previousResult,
            repository: {
                ...previousResult.repository,
                issues: {
                    ...previousResult.repository.issues,
                    ...fetchMoreResult.repository.issues,
                    edges: [
                        ...previousResult.repository.issues.edges,
                        ...fetchMoreResult.repository.issues.edges
                    ]
                }
            }
        };
    };

    return (
        <div className="issues__container">
            {issues.edges.map(({ node }) => (
                <IssueItem key={node.id} issue={node} />
            ))}

            <FetchMore
                laoding={loading}
                hasNextPage={issues.pageInfo.hasNextPage}
                variables={{ cursor: issues.pageInfo.endCursor }}
                updateQuery={updateQuery}
                fetchMore={fetchMore}
            >
                Issues
            </FetchMore>
        </div>
    );
};

export default IssueList;
