import './App.css';
import '@fontsource/roboto';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import Environment from './components/Environment';
import CreateEnvironment from './components/CreateEnvironment';
import AddSoftware from './components/AddSoftware';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginScreen}></Route>
          <Route exact path="/home" component={HomeScreen}></Route>
          <Route exact path="/environment" component={Environment}></Route>
          <Route exact path="/createEnvironment" component={CreateEnvironment}></Route>
          <Route exact path="/serverSoftware" component={AddSoftware}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
