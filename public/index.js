import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.less';
import { ChartApp } from "./views/chart-app.jsx";

const App = () => (
  <ChartApp></ChartApp>
)

ReactDOM.render(<App/>, document.getElementById('root'));