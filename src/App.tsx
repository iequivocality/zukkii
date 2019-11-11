import React, { useEffect, useContext } from 'react';
import './App.scss';
import { RouteProps, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BirthdaySelectionPage from './pages/birthday-selection/BirthdaySelection';
import GroupCountdown from './pages/group-countdown/GroupCountdown';
import ComponentTest from './pages/component-test/ComponentTest';
import NotFoundComponent from './pages/no-found/NotFound';
import { useDispatch } from 'react-redux';
import { fetchGroups } from './store/actions';
import ThemeContext, { themes, Theme } from './contexts/themeContext';
import AppContainer from './components/app-container/AppContainer';
import useTheme from './hooks/useTheme';
import DarkModeToggle from './components/dark-mode-toggle/DarkModeToggle';

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
  let [theme] = useTheme();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGroups());
  }, []);
  console.log("THEME:", theme);

  return (
    <ThemeContext.Provider value={theme}>
      <AppContainer>
        <Router>
          <Switch>
            {AppRoutes.map((route : RouteProps, key : number) => (
              <Route key={key} {...route}></Route>
            ))}
          </Switch>
        </Router>
        <DarkModeToggle></DarkModeToggle>
      </AppContainer>
    </ThemeContext.Provider>
  );
}