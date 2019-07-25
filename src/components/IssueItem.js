import React from 'react';
import Link from './Link';

const IssueItem = ({ issue }) => {
    return (
        <div className="issue__item">
            <div className="issue__content">
                <Link href={issue.url}>{issue.title}</Link>
                {/* <div dangerouslySetInnerHTML={{ __html: issue.bodyHTML }} /> */}
            </div>
        </div>
    );
};

export default IssueItem;
