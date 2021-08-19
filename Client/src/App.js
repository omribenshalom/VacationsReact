import './App.css';
import { Route, Switch} from "react-router-dom";
import { useSelector } from 'react-redux';

import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Register from './Components/Main/Form/Register/Register';
import Login from './Components/Main/Form/Login/Login';
import VacationsContainer from './Components/Main/VacationsContainer/VacationsContainer';
import AddVacationForm from './Components/Main/Form/AddVacationForm/AddVacationForm';
import VacationsChart from './Components/Main/VacationsChart/VacationsChart'
import page404 from './Components/Main/404/404';


function App() {

  const {isAdmin} = useSelector((state) => state.oneReducers.userData);

  const PrivateRoute = ({ component, ...rest }) => {
    if (isAdmin) {
      return <Route {...rest} component={component} />;
    } else {
      return <Route {...rest} component={VacationsContainer} />;
    }
  };


  return (
    <div className="App">
      <Navbar />
      <div className='main'>
        <Switch>

            <Route path="/" exact component={Login} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/home" exact component={VacationsContainer} />
            <PrivateRoute path="/add-vacation" exact component={AddVacationForm} />
            <PrivateRoute path="/vacations-chart" exact component={VacationsChart} />
            <Route path="*" exact component={page404} />
          
        </Switch>
        </div>
      <Footer />
    </div>
  );
}

export default App;
