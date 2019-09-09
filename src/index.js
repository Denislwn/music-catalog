import React from 'react';
import { notification } from 'antd';

import ReactDOM from 'react-dom';

import './index.scss';
import 'antd/dist/antd.css';

import Root from './components/Root';

notification.config({
  placement: 'bottomRight',
})

export const notificationSuccess = (message, description) => notification.success({
  message,
  description,
})


ReactDOM.render(<Root/>, document.getElementById('root'));
