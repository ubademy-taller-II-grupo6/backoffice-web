import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import { LogIn } from 'pages/admin/LogIn';
import { PrivateRoute } from 'components/routes/PrivateRoute';
import { Home } from 'pages/home/Home';

function App() {
    return (
        <Router basename="/backoffice-web">
            <Switch>
                <Route path="/login" render={(props) => <LogIn/>}/>
                <PrivateRoute path='*' renderComponent={(props) => <Home/>} />
                <PrivateRoute path="/" renderComponent={(props) => <Home/>} />
            </Switch>
        </Router>
    );
}

export default App;
