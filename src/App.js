// import { useState, useEffect } from 'react'
import Home from './components/Home.js'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Detection from './components/Detection.js'
import Extraction from './components/Extraction.js'
import Status from './components/Status.js'
import Result from './components/Result.js';
import Analyze from './components/Analyze.js';
import AnalyzeComponent from './components/AnalyzeComponent.js';
import QandA from './components/QandA.js';
import LogViewer from './components/LogViewer.js';
import Dashboard from './components/Dashboard.js';
import Details from './components/details.js';
import Detract from './components/Detract.js';
import { AuthProvider } from './AuthContext.js';

function App() {
  return (
    <>
    <AuthProvider>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/detection" component={Detection} />
        <Route path="/extraction" component={Extraction} />
        <Route path="/status" component={Status} />
        <Route path="/result" component={Result} />
        <Route exact path="/analyze" component={Analyze} />
        <Route path="/analyze/table" component={AnalyzeComponent} />
        <Route path="/QandA" component={QandA} />
        <Route path="/LogViewer" component={LogViewer} />
        <Route path="/Dashboard" component={Dashboard} />
        <Route path="/details" component={Details} />
        <Route path="/detract" component={Detract} />
      </Switch>
    </Router>
    </AuthProvider>
    </>
  );
}

export default App;
