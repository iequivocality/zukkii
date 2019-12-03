import React, { useEffect, Suspense } from 'react';
import './App.scss';
import { RouteProps, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from './store/actions';
import ThemeContext from './contexts/themeContext';
import AppContainer from './components/app-container/AppContainer';
import useTheme from './hooks/useTheme';
import AppState from './store/state/AppState';
import Loading from './components/loading/Loading';
import Background from './components/background/Background';
import GlobalErrorBoundary from './components/global-error-boundary/GlobalErrorBoundary';
import AppRoutes from './AppRoutes';
import useBreakpoint from './hooks/useBreakpoint';

export default function App() {
  let themeContainer = useTheme();
  let dispatch = useDispatch();
  let isLoading = useSelector((state : AppState) => state.isLoading)
  let breakpoint = useBreakpoint();
  useEffect(() => {
    dispatch(fetchGroups());
  }, []);

  return (
    <GlobalErrorBoundary>
      <ThemeContext.Provider value={themeContainer}>
        <AppContainer>
          { isLoading ? <Loading></Loading> : null }
          <Router>
            <Suspense fallback={<Loading></Loading>}>
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