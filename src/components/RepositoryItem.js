import React from 'react';
import { Mutation } from 'react-apollo';
import Link from './Link';
import Button from './Button';
import { STAR_REPOSITORY, REMOVE_STAR, UPDATE_SUBSCRIPTION } from '../graphql/mutations';
import { SUBSCRIBED, UNSUBSCRIBED } from '../constants/constants';

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
}) => {
    console.log('Repository id', id, viewerHasStarred, viewerSubscription, stargazers.totalCount);
    const watchType = viewerSubscription === SUBSCRIBED ? UNSUBSCRIBED : SUBSCRIBED;
    return (
        <div>
            <div className="repository-item__title">
                <Link href={url}>{name}</Link>
                <div>
                    {!viewerHasStarred ? (
                        <Mutation mutation={STAR_REPOSITORY} variables={{ id }}>
                            {(addStar, { data, loading, error }) => (
                                <Button onClick={addStar}>{stargazers.totalCount} | Star It</Button>
                            )}
                        </Mutation>
                    ) : (
                        <Mutation mutation={REMOVE_STAR} variables={{ id }}>
                            {(removeStar, { data, loading, error }) => (
                                <Button onClick={removeStar}>{stargazers.totalCount} | Unstar It</Button>
                            )}
                        </Mutation>
                    )}
                    <Mutation mutation={UPDATE_SUBSCRIPTION} variables={{ id, action: watchType }}>
                        {(updateSubscription, { data, loading, error }) => (
                            <Button onClick={updateSubscription}>
                                {watchers.totalCount} | {viewerSubscription === SUBSCRIBED ? 'UNSUBSCRIBE' : 'SUBSCRIBE'}
                            </Button>
                        )}
                    </Mutation>
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
};

export default RepositoryItem;
