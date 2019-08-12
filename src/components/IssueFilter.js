import React from 'react';
import Button from './Button';
import { TRANSITION_LABELS, TRANSITION_STATE } from '../constants/constants';

const IssueFilter = ({ issueState, onChangeIssueState }) => {
    return (
        <Button onClick={() => onChangeIssueState(TRANSITION_STATE[issueState])}>
            {TRANSITION_LABELS[issueState]}
        </Button>
    );
};

export default IssueFilter;
