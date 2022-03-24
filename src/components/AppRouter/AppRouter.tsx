import { Redirect, Route, Switch } from 'react-router-dom'
import { publicRoutes, RouteNames } from '@/routes'

export const AppRouter = () => {
  return (
    <Switch>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} exact={route.exact} component={route.component} />
      ))}

      <Redirect to={RouteNames.WELCOME} />
    </Switch>
  )
}
