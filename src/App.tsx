import React, { useEffect } from 'react';
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
import OrbitingObjects from './components/svg/OrbitingObjects';
import Rectangle from './components/svg/Rectangle';

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
  let isLoading = useSelector((state : AppState) => state.isLoading)
  useEffect(() => {
    dispatch(fetchGroups());
  }, []);

  return (
    <ThemeContext.Provider value={themeContainer}>
      <AppContainer>
        { isLoading ? <Loading></Loading> : null }
        {/* <Loading></Loading> */}
        <Router>
          <Switch>
            {AppRoutes.map((route : RouteProps, key : number) => (
              <Route key={key} {...route}></Route>
            ))}
          </Switch>
        </Router>
      </AppContainer>
      <Rectangle width={3} height={"100%"} color={"#51B14A"} className={'keyakiRect'}></Rectangle>
      <Rectangle width={4} height={"100%"} color={"#5BBEE4"} className={'hinataRect'}></Rectangle>
      <Rectangle width={2} height={"100%"} color={"#7C32A2"} className={'nogiRect'}></Rectangle>
      <OrbitingObjects distance={100} numberOfCircles={60} radius={2} className={'keyakizakaCircle'} color={"#51B14A"}/>
      <OrbitingObjects distance={120} numberOfCircles={75} radius={2} className={'hinatazakaCircle'} color={"#5BBEE4"}/>
      <OrbitingObjects distance={200} numberOfCircles={100} radius={2} className={'nogizakaCircle'} color={"#7C32A2"}/>
    </ThemeContext.Provider>
  );
}