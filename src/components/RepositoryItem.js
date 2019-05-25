import React from 'react';
import Link from './Link';

const RepositoryItem = ({
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
            <p className="repository-item__action">
                {stargazers.totalCount} Stars
            </p>
        </div>
        <div className="repository-item__description">
            <div 
                className="repository-item__info" 
                dangerouslySetInnerHTML={{__html: descriptionHTML}}
            />
            <div className="repository-item__details">
                <div>
                    {
                        primaryLanguage && (
                            <span>Language: {primaryLanguage.name}</span>
                        )
                    }
                </div>
                <div>
                    {
                        owner && (
                            <span>
                                Owner: &nbsp;
                                <Link href={owner.url}>
                                    {owner.login}
                                </Link>
                            </span>
                        )
                    }
                </div>
            </div>
        </div>
    </div>
)

export default RepositoryItem;