import React, { useState } from 'react';
import { Query } from 'react-apollo';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import IssueList from '../components/IssueList';
import Button from '../components/Button';
import { GET_ISSUES_OF_REPOSITORY } from '../graphql/queries';
import { NONE, TRANSITION_LABELS, TRANSITION_STATE } from '../constants/constants';

const Issues = ({ repositoryOwner, repositoryName }) => {
    const [issueState, setIssueState] = useState(NONE);

    const isShow = (issueState) => issueState !== NONE;

    const onChangeIssueState = (nextIssueState) => {
        setIssueState(nextIssueState);
    };
    return (
        <div className="issues">
            <Button onClick={() => onChangeIssueState(TRANSITION_STATE[issueState])}>
                {TRANSITION_LABELS[issueState]}
            </Button>
            {isShow(issueState) && (
                <Query
                    query={GET_ISSUES_OF_REPOSITORY}
                    variables={{ repositoryOwner, repositoryName }}
                >
                    {({ data, loading, error }) => {
                        if (error) return <ErrorMessage error={error} />;
                        const { repository } = data;

                        if (loading && !repository) {
                            return <Loading />;
                        }

                        const filteredRepository = {
                            issues: {
                                edges: repository.issues.edges.filter(
                                    (issue) => issue.node.state === issueState
                                )
                            }
                        };

                        if (!filteredRepository.issues.edges.length) {
                            return <div className="issues__empty">No Issues...</div>;
                        }
                        return <IssueList issues={filteredRepository.issues} />;
                    }}
                </Query>
            )}
        </div>
    );
};

export default Issues;