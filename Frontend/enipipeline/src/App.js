import './App.css';
import '@fontsource/roboto';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import Environment from './components/Environment';
import CreateEnvironment from './components/CreateEnvironment';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginScreen}></Route>
          <Route exact path="/home" component={HomeScreen}></Route>
          <Route exact path="/environment" component={Environment}></Route>
          <Route exact path="/createEnvironment" component={CreateEnvironment}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
