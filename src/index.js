import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import FastClick from 'fastclick';
import {Provider} from 'react-redux';
import store from '@/store/store';
import { AppContainer } from 'react-hot-loader';
// 路由配置
import Route from './navigation';
// 引入基础样式
import '@/style/base.css';
import '@/assets/index.scss';

// 移动端解决300ms延迟
FastClick.attach(document.body)

const render = Component => {
  ReactDOM.render(
    //热加载
    <Provider store={store}>
    	<AppContainer>
    		<Component />
    	</AppContainer>
    </Provider>,
    document.getElementById('root'),
  )
}

render(Route);

// Webpack 热重载
if (module.hot) {
  module.hot.accept('./navigation', () => {
    render(Route);
  })
}

// webpck配置
registerServiceWorker();
