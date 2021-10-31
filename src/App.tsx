import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import { LogIn } from 'pages/admin/LogIn';
import { PrivateRoute } from 'components/routes/PrivateRoute';
import { Home } from 'pages/home/Home';
import { MyProfile } from 'pages/profile/MyProfile';
import { HomeLayout } from 'layouts/HomeLayout';

function App() {
    return (
        <Router basename="/backoffice-web">
            <Switch>
                <Route exact strict path="/login" render={(props: any) => <LogIn/>}/>

                <PrivateRoute
                    path="/"
                    renderComponent={
                        (props) => 
                        <HomeLayout>
                            <Switch>
                                <PrivateRoute path="/myProfile" renderComponent={(props) => <MyProfile />} />
                                <PrivateRoute path="/" renderComponent={(props) => <Home/>} />
                            </Switch>
                        </HomeLayout>
                    }
                />
            </Switch>
        </Router>
    );
}

export default App;
