import { combineReducers } from 'redux';
import jiraReducer from './jiraReducer';
import slackReducer from './slackReducer';
import githubReducer from './githubReducer';
import bitbucketReducer from './bitbucketReducer'
import mailReducer from './mailReducer'

const rootReducer = combineReducers({
    jira: jiraReducer,
    slack: slackReducer,
    github: githubReducer,
    bitbucket: bitbucketReducer,
    mail: mailReducer,
});

export default rootReducer;