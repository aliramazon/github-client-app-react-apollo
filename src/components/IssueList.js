import React from 'react';
import IssueItem from './IssueItem';

const IssueList = ({ issues }) => {
    return (
        <div className="issues__container">
            {issues.edges.map(({ node }) => (
                <IssueItem key={node.id} issue={node} />
            ))}
        </div>
    );
};

export default IssueList;
