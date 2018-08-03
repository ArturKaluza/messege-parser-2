import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';

import './index.css';
import './shared.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App className='app' />, document.getElementById('root'));
registerServiceWorker();
