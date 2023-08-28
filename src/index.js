import ReactDOM  from 'react-dom'
import React from 'react'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './_base.scss'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Redux/Store'
import 'react-lazy-load-image-component/src/effects/blur.css'
ReactDOM.render(
<Provider store={store} >
<BrowserRouter><App/></BrowserRouter></Provider>
,
document.getElementById("root"));
