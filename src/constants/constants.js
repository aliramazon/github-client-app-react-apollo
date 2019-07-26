export const GITHUB_BASE_URL = 'https://api.github.com/graphql';
export const SUBSCRIBED = 'SUBSCRIBED';
export const UNSUBSCRIBED = 'UNSUBSCRIBED';
export const OPEN = 'OPEN';
export const CLOSED = 'CLOSED';
export const NONE = 'NONE';
export const ORGANIZATION = '/';
export const PROFILE = '/profile';

export const TRANSITION_LABELS = {
    NONE: 'Show Open Issues',
    OPEN: 'Show Closed Issues',
    CLOSED: 'Hide Issues'
};

export const TRANSITION_STATE = {
    NONE: OPEN,
    OPEN: CLOSED,
    CLOSED: NONE
};
