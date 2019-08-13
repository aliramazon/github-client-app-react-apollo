import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import Button from './Button';
import { TRANSITION_LABELS, TRANSITION_STATE, NONE } from '../constants/constants';
import { GET_ISSUES_OF_REPOSITORY } from '../graphql/queries';

const IssueFilter = ({ issueState, onChangeIssueState, repositoryName, repositoryOwner }) => {
    const isShow = (issueState) => issueState !== NONE;

    const prefetchIssues = (client, repositoryName, repositoryOwner, issueState) => {
        const nextIssueState = TRANSITION_STATE[issueState];
        if (isShow(nextIssueState)) {
            client.query({
                query: GET_ISSUES_OF_REPOSITORY,
                variables: {
                    repositoryName,
                    repositoryOwner,
                    issueState: nextIssueState
                }
            });
        }
    };

    return (
        <ApolloConsumer>
            {(client) => (
                <Button
                    onClick={() => onChangeIssueState(TRANSITION_STATE[issueState])}
                    onMouseOver={() =>
                        prefetchIssues(client, repositoryName, repositoryOwner, issueState)
                    }
                >
                    {TRANSITION_LABELS[issueState]}
                </Button>
            )}
        </ApolloConsumer>
    );
};

export default IssueFilter;
