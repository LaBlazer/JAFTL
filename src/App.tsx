import React from 'react';
import * as Ons from 'react-onsenui';
import hash from 'object-hash';
import './App.css';

import { TasksPage } from './layout/TasksPage';

type AppProps = {

}

type AppState = {
  currentPage: Ons.Page,
  toastShown: boolean,
  amount: number
}

type NavigatorRoute = {
  component: any
  props?: {}
}

export class App extends React.Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);

    this.state = {
      currentPage: new Ons.Page(props),
      toastShown: false,
      amount: 0
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    
    
  }

  handleClick() {
    this.setState({
      toastShown: !this.state.toastShown,
      amount: this.state.amount + 1
    });
  }

  render() {
      return (
        <Ons.Navigator

          renderPage={(route: NavigatorRoute, navigator: Ons.Navigator) => 
            <route.component key={hash(route)} navigator={navigator} {...route.props}></route.component>}
          initialRoute={{component: TasksPage}}
        />
      )
  }
}