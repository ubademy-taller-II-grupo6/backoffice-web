import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { userStorage } from 'userSession/userStorage';

interface IPrivateRouteProps extends RouteProps{
    path: string;
    renderComponent: (props: any) => React.ReactNode;
    rest?: any
}

export const PrivateRoute: React.FC<IPrivateRouteProps> = ({ path, renderComponent, ...rest } : any) => {

    return <>
        <Route
            {...rest}
            path={path}
            render={(props) =>
                userStorage.isLogged() ?
                    renderComponent(props)
                :
                    <Redirect to='/login' />
                }
        />
    </>
};