import React, { memo } from 'react';
import { Mutation } from 'react-apollo';
import Link from './Link';
import Button from './Button';
import { STAR_REPOSITORY, REMOVE_STAR, UPDATE_SUBSCRIPTION } from '../graphql/mutations';
import { REPOSITORY_FRAGMENT } from '../graphql/fragments';
import { SUBSCRIBED, UNSUBSCRIBED } from '../constants/constants';

const updateAddStar = (client, mutationResult) => {
    const { id } = mutationResult.data.addStar.starrable;
    const repository = client.readFragment({
        id: `Repository:${id}`,
        fragment: REPOSITORY_FRAGMENT
    });

    const totalCount = repository.stargazers.totalCount + 1;

    client.writeFragment({
        id: `Repository:${id}`,
        fragment: REPOSITORY_FRAGMENT,
        data: {
            ...repository,
            stargazers: {
                ...repository.stargazers,
                totalCount
            }
        }
    });
};

const updateWatchers = (client, mutationResult) => {
    const { id, viewerSubscription } = mutationResult.data.updateSubscription.subscribable;
    const repository = client.readFragment({
        id: `Repository:${id}`,
        fragment: REPOSITORY_FRAGMENT
    });

    const oldCount = repository.watchers.totalCount;
    const newCount = viewerSubscription === SUBSCRIBED ? oldCount + 1 : oldCount - 1;

    client.writeFragment({
        id: `Repository:${id}`,
        fragment: REPOSITORY_FRAGMENT,
        data: {
            ...repository,
            watchers: {
                ...repository.watchers,
                totalCount: newCount
            }
        }
    });
};

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
    const watchType = viewerSubscription === SUBSCRIBED ? UNSUBSCRIBED : SUBSCRIBED;
    return (
        <div>
            <div className="repository-item__title">
                <Link href={url}>{name}</Link>
                <div>
                    {!viewerHasStarred ? (
                        <Mutation
                            mutation={STAR_REPOSITORY}
                            variables={{ id }}
                            update={updateAddStar}
                            optimisticResponse={{
                                addStar: {
                                    __typename: 'Mutation',
                                    starrable: {
                                        __typename: 'Repository',
                                        id,
                                        viewerHasStarred: !viewerHasStarred
                                    }
                                }
                            }}
                        >
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
                    <Mutation
                        mutation={UPDATE_SUBSCRIPTION}
                        variables={{ id, action: watchType }}
                        update={updateWatchers}
                        optimisticResponse={{
                            updateSubscription: {
                                __typename: 'Mutation',
                                subscribable: {
                                    __typename: 'Repository',
                                    id,
                                    viewerSubscription: watchType
                                }
                            }
                        }}
                    >
                        {(updateSubscription, { data, loading, error }) => (
                            <Button onClick={updateSubscription}>
                                {watchers.totalCount} | {viewerSubscription === SUBSCRIBED ? SUBSCRIBED : UNSUBSCRIBED}
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

export default memo(RepositoryItem);
