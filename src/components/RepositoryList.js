import React from 'react';
import RepositoryItem from './RepositoryItem';

const RepositoryList = ({ repositories }) => (
    repositories.edges.map(({ node }) => (
        <div key={node.id} className="repository-item">
            <RepositoryItem {...node} />
        </div>
    ))
)

export default RepositoryList;