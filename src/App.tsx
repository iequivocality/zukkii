import React, { useEffect } from 'react';
import './App.scss';
import { RouteProps, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BirthdaySelectionPage from './pages/birthday-selection/BirthdaySelection';
import GroupCountdown from './pages/group-countdown/GroupCountdown';
import ComponentTest from './pages/component-test/ComponentTest';
import NotFoundComponent from './pages/no-found/NotFound';
import { useDispatch } from 'react-redux';
import { fetchGroups } from './store/actions';
import ThemeContext from './contexts/themeContext';
import AppContainer from './components/app-container/AppContainer';
import useTheme from './hooks/useTheme';
import AppFooter from './components/app-footer/AppFooter';

const AppRoutes : Array<RouteProps> = [
  {
    path: "/",
    component: BirthdaySelectionPage,
    exact: true
  },
  {
    path: "/group/:group",
    component: GroupCountdown
  },
  {
    path: "/test",
    component : ComponentTest
  },
  {
    path: "404",
    component : NotFoundComponent
  },
  {
    path: "*",
    component : NotFoundComponent
  }
];

export default function App() {
  let themeContainer = useTheme();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGroups());
  }, []);

  return (
    <ThemeContext.Provider value={themeContainer}>
      <AppContainer>
        <Router>
          <Switch>
            {AppRoutes.map((route : RouteProps, key : number) => (
              <Route key={key} {...route}></Route>
            ))}
          </Switch>
        </Router>
        <AppFooter></AppFooter>
      </AppContainer>
    </ThemeContext.Provider>
  );
}