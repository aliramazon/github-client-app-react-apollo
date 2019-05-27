import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';

import App from './components/App';
import { GITHUB_BASE_URL } from './constants/constants'
import './styles/index.scss';
import * as serviceWorker from './serviceWorker';
import { ApolloLink } from 'apollo-link';

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            );
        })
    }
    if (networkError) {
        console.log(
            `[Network error] ${networkError}`
        );
    }
});

const httpLink = new HttpLink({
    uri: GITHUB_BASE_URL
});

const authLink = setContext((_, { headers }) => {
    const token = process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN;
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
});

const link = ApolloLink.from([errorLink, authLink.concat(httpLink)]);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});

const jsx = (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
);


ReactDOM.render(jsx, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
