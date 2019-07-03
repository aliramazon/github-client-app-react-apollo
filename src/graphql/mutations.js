import gql from 'graphql-tag';

export const STAR_REPOSITORY = gql`
    mutation($id: ID!) {
        addStar(input: { starrableId: $id }) {
            starrable {
                id
                viewerHasStarred
            }
        }
    }
`;

export const REMOVE_STAR = gql`
    mutation($id: ID!) {
        removeStar(input: { starrableId: $id }) {
            starrable {
                id
                viewerHasStarred
                stargazers {
                    totalCount
                }
            }
        }
    }
`;

export const UPDATE_SUBSCRIPTION = gql`
    mutation($id: ID!, $action: SubscriptionState!) {
        updateSubscription(input: { subscribableId: $id, state: $action }) {
            subscribable {
                id
                viewerSubscription
            }
        }
    }
`;
