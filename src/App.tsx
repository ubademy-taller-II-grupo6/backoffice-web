import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import { LogIn } from 'pages/admin/LogIn';
import { PrivateRoute } from 'components/routes/PrivateRoute';
import { Home } from 'pages/home/Home';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact strict path="/login" render={(props) => <LogIn/>}/>

                <PrivateRoute exact strict path="/" renderComponent={(props) => <Home/>} />
            </Switch>
        </Router>
    );
}

export default App;
