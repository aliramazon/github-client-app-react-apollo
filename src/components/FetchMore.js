import React from 'react';
import Loading from './Loading';
import Button from './Button';

const FetchMore = ({ loading, hasNextPage, variables, updateQuery, fetchMore, children }) => {
    return (
        <div className="fetch-more__container">
            {loading ? (
                <Loading />
            ) : (
                hasNextPage && (
                    <Button
                        onClick={() =>
                            fetchMore({
                                variables,
                                updateQuery
                            })
                        }
                    >
                        More {children}
                    </Button>
                )
            )}
        </div>
    );
};

export default FetchMore;
