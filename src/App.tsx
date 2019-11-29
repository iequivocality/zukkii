import React, { useEffect, Suspense } from 'react';
import './App.scss';
import { RouteProps, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BirthdaySelectionPage from './pages/birthday-selection/BirthdaySelection';
import GroupCountdown from './pages/group-countdown/GroupCountdown';
import ComponentTest from './pages/component-test/ComponentTest';
import NotFoundComponent from './pages/no-found/NotFound';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from './store/actions';
import ThemeContext from './contexts/themeContext';
import AppContainer from './components/app-container/AppContainer';
import useTheme from './hooks/useTheme';
import AppState from './store/state/AppState';
import Loading from './components/loading/Loading';
import Background from './components/background/Background';
import GlobalErrorBoundary from './components/global-error-boundary/GlobalErrorBoundary';

const AppRoutes : Array<RouteProps> = [
  {
    path: "/",
    // component: BirthdaySelectionPage,
    component: React.lazy(() => import('./pages/birthday-selection/BirthdaySelection')),
    exact: true
  },
  {
    path: "/group/:group",
    // component: GroupCountdown
    component: React.lazy(() => import('./pages/group-countdown/GroupCountdown'))
  },
  {
    path: "/test",
    // component : ComponentTest
    component: React.lazy(() => import('./pages/component-test/ComponentTest'))
  },
  {
    path: "404",
    // component : NotFoundComponent
    component: React.lazy(() => import('./pages/no-found/NotFound'))
  },
  {
    path: "*",
    // component : NotFoundComponent
    component: React.lazy(() => import('./pages/no-found/NotFound'))
  }
];

export default function App() {
  let themeContainer = useTheme();
  let dispatch = useDispatch();
  let isLoading = useSelector((state : AppState) => state.isLoading)
  useEffect(() => {
    dispatch(fetchGroups());
  }, []);

  return (
    <GlobalErrorBoundary>
      <ThemeContext.Provider value={themeContainer}>
        <AppContainer>
          { isLoading ? <Loading></Loading> : null }
          <Router>
            <Suspense  fallback={<Loading></Loading>}>
              <Switch>
                {AppRoutes.map((route : RouteProps, key : number) => (
                    <Route key={key} {...route}></Route>
                ))}
              </Switch>
            </Suspense>
          </Router>
        </AppContainer>
        <Background></Background>
      </ThemeContext.Provider>
    </GlobalErrorBoundary>
  );
}