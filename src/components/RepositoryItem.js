import React from 'react';
import { Mutation } from 'react-apollo';
import Link from './Link';
import Button from './Button';
import { STAR_REPOSITORY } from '../graphql/mutations';

const RepositoryItem = ({
    id,
    name,
    url,
    descriptionHTML,
    primaryLanguage,
    owner,
    stargazers,
    viewerHasStarred,
    watchers,
    viewerSubscription
}) => (
    <div>
        <div className="repository-item__title">
            <Link href={url}>{name}</Link>
            <div>
                {!viewerHasStarred ? (
                    <Mutation mutation={STAR_REPOSITORY} variables={{ id }}>
                        {(addStar, { data, loading, error }) => <Button onClick={addStar}>{stargazers.totalCount} Star</Button>}
                    </Mutation>
                ) : (
                    <span />
                )}
            </div>
        </div>
        <div className="repository-item__description">
            <div className="repository-item__info" dangerouslySetInnerHTML={{ __html: descriptionHTML }} />
            <div className="repository-item__details">
                <div>{primaryLanguage && <span>Language: {primaryLanguage.name}</span>}</div>
                <div>
                    {owner && (
                        <span>
                            Owner: &nbsp;
                            <Link href={owner.url}>{owner.login}</Link>
                        </span>
                    )}
                </div>
            </div>
        </div>
    </div>
);

export default RepositoryItem;
