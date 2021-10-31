import React from 'react';
import { RouteProps } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
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
            render={(props: any) =>
                userStorage.isLogged() ?
                    renderComponent(props)
                :
                    <Redirect to='/login' />
                }
        />
    </>
};