import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { createBrowserHistory } from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import App from './App'
import Store from './store'
import './index.css'

const store = Store

ReactDOM.render(
  <Router history={createBrowserHistory}>
    <Provider store={store} >
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
)