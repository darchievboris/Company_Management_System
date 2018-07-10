import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-widgets/dist/css/react-widgets.css';
import './components/app.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { configureStore } from './store/configureStore';

async function init() {
  const store = await configureStore();
  ReactDOM.render(<App store={store} />, document.getElementById('root'));
}
init();
registerServiceWorker();
