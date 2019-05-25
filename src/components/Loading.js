import React, { useState, useEffect } from 'react';
import classnames from 'classnames';


const Loading = (props) => {
    const [dots, setDots] = useState(0);


    useEffect(() => {
        const onTick = () => {
            setDots(dots => dots + 1);
        };

        let interval = setInterval(onTick, 150);

        return () => {
            clearInterval(interval);
        }
    }, []);



    return (
        <div className={classnames('Loading', props.isCenter && 'Loading--center')}>
            <small>
                Loading {new Array(dots).fill(0).map(dot => '.')}
            </small>
        </div>
    ) 
};

export default Loading;