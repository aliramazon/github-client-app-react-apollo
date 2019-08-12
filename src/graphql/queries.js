import gql from 'graphql-tag';
import { REPOSITORY_FRAGMENT } from './fragments';

export const GET_REPOSITORIES_OF_CURRENT_USER = gql`
    query($cursor: String) {
        viewer {
            repositories(
                first: 5
                orderBy: { direction: DESC, field: STARGAZERS }
                after: $cursor
            ) {
                edges {
                    node {
                        ...repository
                    }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }
    }
    ${REPOSITORY_FRAGMENT}
`;

export const GET_REPOSITORIES_OF_ORGANIZATION = gql`
    query($organizationName: String!, $cursor: String) {
        organization(login: $organizationName) {
            repositories(first: 5, after: $cursor) {
                edges {
                    node {
                        ...repository
                    }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }
    }
    ${REPOSITORY_FRAGMENT}
`;

export const GET_ISSUES_OF_REPOSITORY = gql`
    query($repositoryOwner: String!, $repositoryName: String!, $issueState: IssueState!) {
        repository(name: $repositoryName, owner: $repositoryOwner) {
            issues(first: 5, states: [$issueState]) {
                edges {
                    node {
                        id
                        number
                        state
                        title
                        url
                        bodyHTML
                    }
                }
            }
        }
    }
`;
