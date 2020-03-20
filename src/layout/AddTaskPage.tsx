import React from 'react';
import * as Ons from 'react-onsenui';
import { Toolbar } from '../components/Toolbar';
import { Guid } from '../Utils';
import moment from 'moment';
import { TaskData, TaskPriority } from '../TaskStore';

type AddTaskProps = {
    navigator: Ons.Navigator
    onAdd(data: TaskData): void
}

type AddTaskState = {
    data: TaskData
    date: string
    time: string
}

export class AddTaskPage extends React.Component<AddTaskProps, AddTaskState> {

    constructor(props: AddTaskProps) {
      super(props);
      
  
      this.state = {
        data: {
            uid: Guid.generate(), 
            name: "", 
            dueDate: new Date(), 
            description: "",
            location: "", 
            finished: false,
            priority: TaskPriority.Medium,
            vibration: false
        },
        date: "",
        time: ""
      }
  
    }
  
    componentDidMount() {
  
    }
  
    handleClick() {
      
    }
  
    render() {
        return (
          <Ons.Page renderToolbar={() => <Toolbar title="Add Task" navigator={this.props.navigator} onMenuClick={() =>
          this.props.onAdd(this.state.data)} menuIcon="md-save"/>}>
                <div style={{ textAlign: 'center', width: "100%" }}>
                    <h1>Add new task</h1>
                    <p>
                        <Ons.Input
                        value={this.state.data.name} float
                        onChange={(event) => { this.setState(prevState => ({
                            data: {
                                ...prevState.data,
                                name: (event.target.value as string)
                            }}))}}
                        type='text'
                        modifier='material'
                        placeholder='Name'
                        style={{width: "85%"}} />
                    </p>
                    <p>
                    <Ons.Input
                    value={moment(this.state.data.dueDate).format('YYYY-MM-DDTHH:mm')} float
                    onChange={(event) => {
                        const datetime = moment(event.target.value, ['YYYY/MM/DD h:m a', 'YYYY/MM/DD H:m']);
                        datetime && this.setState(prevState => ({
                            data: {
                                ...prevState.data,
                                dueDate: datetime.toDate()
                            }
                        }))}}
                    type='datetime-local'
                    modifier='material'
                    style={{width: "85%"}} 
                    />
                    </p>
                    <p>
                    <Ons.Input
                    value={this.state.data.description} float
                    onChange={(event) => { this.setState(prevState => ({
                        data: {
                            ...prevState.data,
                            description: (event.target.value as string)
                        }}))}}
                    modifier='material'
                    placeholder='Description' 
                    style={{width: "85%"}} />
                    </p>
                    <p>
                    <Ons.Select                        
                        value={this.state.data.priority.toString()}
                        style={{width: "85%"}} 
                        onChange={(event) => { this.setState(prevState => ({
                            data: {
                                ...prevState.data,
                                priority: (event.target.value as number)
                            }}))}}>
                        <option className="priority-2" value="2"> ⏫ High</option>
                        <option className="priority-1" value="1"> ⏺️ Medium</option>
                        <option className="priority-0" value="0"> ⏬ Low</option>
                    </Ons.Select>
                    </p>
                    <p>
                        <Ons.Input
                        value={this.state.data.location} float
                        onChange={(event) => { this.setState(prevState => ({
                            data: {
                                ...prevState.data,
                                location: (event.target.value as string)
                            }}))}}
                        type='text'
                        modifier='material'
                        placeholder='Location'
                        style={{width: "85%"}} />
                    </p>
                </div>
          </Ons.Page>
        )
    }
  }
