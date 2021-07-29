import './App.css';
import '@fontsource/roboto';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen';
import HomeScreen from './pages/HomeScreen';
import Environment from './pages/Environment';
import CreateEnvironment from './pages/CreateEnvironment';
import ServerSoftware from './pages/ServerSoftware';
import ManageServices from './pages/ManageServices';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginScreen}></Route>
          <Route exact path="/home" component={HomeScreen}></Route>
          <Route exact path="/environment" component={Environment}></Route>
          <Route exact path="/createEnvironment" component={CreateEnvironment}></Route>
          <Route exact path="/serverSoftware" component={ServerSoftware}></Route>
          <Route exact path="/manageServices" component={ManageServices}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
