import React from 'react';
import * as Ons from 'react-onsenui';
import { Toolbar } from '../components/Toolbar';

type EditTaskProps = {
    navigator: Ons.Navigator
}

type EditTaskState = {
}

export class EditTaskPage extends React.Component<EditTaskProps, EditTaskState> {

    constructor(props: EditTaskProps) {
      super(props);
  
      this.state = {
        tasks: []
      }
  
    }
  
    componentDidMount() {
  
    }
  
    handleClick() {
      
    }
  
    render() {
        return (
          <Ons.Page renderToolbar={() => <Toolbar title="Edit Task" navigator={this.props.navigator}/>}>
              <h1>EDIT TASK lol</h1>
          </Ons.Page>
        )
    }
  }
