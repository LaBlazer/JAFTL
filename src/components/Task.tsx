import React from 'react';
import moment from 'moment';
import * as Ons from 'react-onsenui';
import { observer } from 'mobx-react';
import { TaskData } from '../TaskStore';
import './Task.css';

type TaskProps = TaskData & {
    onDelete: Function
    onEdit: Function
    onFinish: Function
    countdown?: boolean
}

type TaskState = {
    dueString: string
    countdown: boolean
    finished?: boolean
}


@observer
export class Task extends React.Component<TaskProps, TaskState> {
    interval?: NodeJS.Timeout;

    constructor(props: TaskProps) {
      super(props);
  
      this.state = {
        dueString: this.getDueString(),
        countdown: this.props.countdown || true,
        finished: true
      }
  
      this.handleClick = this.handleClick.bind(this);
      this.getDueString = this.getDueString.bind(this);
    }
    
    componentDidMount() {
        this.interval = setInterval(() => this.setState({ dueString: this.getDueString()}), 30000); // 30s
    }
    
    componentWillUnmount() {
        this.interval && clearInterval(this.interval);
    }
    
    // componentWillReceiveProps(props: TaskProps) {
    //     this.setState({
    //         finished: props.finished,
    //         dueString: this.getDueString()
    //     })
    // }

    handleClick() {
        console.log("clicg");
    }

    getDueString() {
        console.log(this.props.dueDate)
        const duration = moment.duration((this.props.dueDate.getTime() - new Date().getTime()), 'milliseconds');
        return `${duration.asDays() | 0}d ${duration.hours()}h ${duration.minutes()}m`;
    }

    render() { 
        return (
            <Ons.ListItem modifier={'longdivider tappable'} onClick={()=>{}}>
                <div className={"priority-bar priority-" + this.props.priority}/>
                <Ons.Row>
                    <Ons.Col verticalAlign="top" width="62%">
                        <h2 style={this.props.finished ? {textDecoration: "line-through"} : {}}>{this.props.name}</h2>
                    </Ons.Col>
                    <Ons.Col verticalAlign="bottom">
                        <Ons.Row style={{justifyContent: "flex-end"}}>
                            <Ons.Fab style={{marginRight: "0.3em"}} modifier="mini" onClick={() => this.props.onDelete(this.props.uid)}><Ons.Icon icon='md-delete' size={25}/></Ons.Fab>
                            <Ons.Fab style={{marginRight: "0.3em"}} modifier="mini" onClick={() => this.props.onEdit(this.props.uid)}><Ons.Icon icon='md-edit' size={25}/></Ons.Fab>
                            <Ons.Fab style={{marginRight: "0.3em"}} modifier="mini" onClick={() => this.props.onFinish(this.props.uid)}><Ons.Icon icon='md-check' size={25}/></Ons.Fab>
                        </Ons.Row>
                        <Ons.Row style={{justifyContent: "flex-end"}}>
                        
                        <h5 onClick={() => 
                                this.setState(prevState => ({
                                    countdown: !prevState.countdown
                                }))}
                            style={{
                                marginRight: "0.5em",
                                color: "#797979"
                            }}>
                            <Ons.Icon size={22} icon={{default: 'md-time-countdown'}} style={{position: "absolute", right: "5.5em"}}/>
                            {this.state.countdown ? this.state.dueString : moment(this.props.dueDate).format("DD/MM/YY HH:mm:ss")}
                        </h5>
                        </Ons.Row>
                    </Ons.Col>
                </Ons.Row>
                <Ons.Row>
                    <p>{this.props.description}</p>
                </Ons.Row>
                <Ons.Row>
                    {/* <Ons.Segment style={{width: "97%"}} index={3} onPostChange={() => {}}> */}
                    
                    {/* </Ons.Segment> */}
                </Ons.Row>
            </Ons.ListItem>
        )
    }
}
