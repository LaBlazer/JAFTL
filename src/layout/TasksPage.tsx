import React from 'react';
import * as Ons from 'react-onsenui';
import { Toolbar } from '../components/Toolbar';
import { Task } from '../components/Task'
import { AddTaskPage } from './AddTaskPage';
import { EditTaskPage } from './EditTaskPage';
import { Guid } from '../Utils';
import TaskStore, { TaskData } from '../TaskStore'
import { observer } from 'mobx-react';

type TasksPageProps = {
	navigator: Ons.Navigator,
	
}

type TasksPageState = {
	menuOpened: boolean
	dialogOpened: boolean
	dialogAllOpened: boolean
}

@observer
export class TasksPage extends React.Component<TasksPageProps, TasksPageState> {
	selectedIndex: number = -1;

	constructor(props: TasksPageProps) {
		super(props);

		this.state = {
			menuOpened: false,
			dialogOpened: false,
			dialogAllOpened: false
		}

		this.addTask = this.addTask.bind(this);
		this.deleteTask = this.deleteTask.bind(this);
		this.handleFinish = this.handleFinish.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleDeleteAll = this.handleDeleteAll.bind(this);
	}

	deleteTask(id?: number) {
		if(!id) id = this.selectedIndex;
		delete TaskStore.tasks[id];
	}

	addTask(task: TaskData) {
		console.log(TaskStore.tasks);
		TaskStore.tasks[task.uid] = task;
	}

	handleFinish(id: number) {
		console.log(TaskStore.tasks[id]);
		TaskStore.tasks[id].finished = !TaskStore.tasks[id].finished;
	}

	handleAdd() {
		this.props.navigator.pushPage({component: AddTaskPage, props: {onAdd: (data: TaskData) => {
			this.props.navigator.popPage();
			this.addTask(data);
		}}});
	}

	handleEdit(id: number) {
		console.log(id + " edit");
		this.props.navigator.pushPage({component: EditTaskPage, props: {onEdit: () => {}}});
	}

	handleDelete(id: number) {
		this.selectedIndex = id;
		this.setState({
			dialogOpened: true
		});
	}

	handleDeleteAll() {
		this.setState({
			dialogAllOpened: true
		});
	}

	render() {
		return (
		
		<Ons.Page modifier='material' renderToolbar={
				() => <Toolbar navigator={this.props.navigator} onMenuClick={() => this.setState((prevState) => ({menuOpened: !prevState.menuOpened}))}/>
			}
			renderFixed={
				() => <Ons.SpeedDial direction='left' position='bottom right'>
						<Ons.Fab onClick={this.handleAdd}>
							<Ons.Icon icon='md-plus' size={40} />
						</Ons.Fab>
						{/* <Ons.SpeedDialItem onClick={() => console.log('speed A')}> A </Ons.SpeedDialItem>
						<Ons.SpeedDialItem onClick={() => console.log('speed B')}> B </Ons.SpeedDialItem>
						<Ons.SpeedDialItem onClick={() => console.log('speed C')}> C </Ons.SpeedDialItem>
						<Ons.SpeedDialItem onClick={() => console.log('speed D')}> D </Ons.SpeedDialItem> */}
					</Ons.SpeedDial>
			}
		>
			<Ons.Splitter>
				<Ons.SplitterSide side='right' width={250} collapse={true} swipeable={true} isOpen={this.state.menuOpened} 
				onClose={() => this.setState({menuOpened: false})} onOpen={() => this.setState({menuOpened: true})}>
					<Ons.Page>
					<Ons.List>
						<Ons.ListItem key={"remove-all"} onClick={() => this.setState({dialogAllOpened: true})} tappable>
							Remove all tasks
						</Ons.ListItem>
						{/* <Ons.ListItem key={Cards.name} onClick={this.loadPage.bind(this, Cards)} tappable>Cards</Ons.ListItem>
						<Ons.ListItem key={Settings.name} onClick={this.loadPage.bind(this, Settings)} tappable>Settings</Ons.ListItem> */}
					</Ons.List>
					</Ons.Page>
				</Ons.SplitterSide>
				<Ons.SplitterContent >
				<Ons.Page>
					<Ons.List
						dataSource={Object.keys(TaskStore.tasks).map((key) => TaskStore.tasks[key])}
						renderHeader={() => <Ons.ListHeader>To do</Ons.ListHeader>}
						renderRow={(data: TaskData, id: number) => <Task {...data} key={data.uid}
									onDelete={this.handleDelete} onEdit={this.handleEdit} onFinish={this.handleFinish}/>}

						/*renderFooter={this.renderFooter}*/
					/>
					</Ons.Page>
				</Ons.SplitterContent>
			</Ons.Splitter>
			<Ons.AlertDialog isOpen={this.state.dialogOpened} onCancel={() => this.setState({dialogOpened: false})}>
				<div className="alert-dialog-title">Rly?</div>
				<div className="alert-dialog-content">Do you really want to delete this task?</div>
				<div className="alert-dialog-footer">
					<Ons.AlertDialogButton onClick={() => this.setState({dialogOpened: false})}>
						Cancel
					</Ons.AlertDialogButton>
					<Ons.AlertDialogButton onClick={() => { this.deleteTask(); this.setState({dialogOpened: false}) }}>
						Ok
					</Ons.AlertDialogButton>
				</div>
			</Ons.AlertDialog>
			<Ons.AlertDialog isOpen={this.state.dialogAllOpened} onCancel={() => this.setState({dialogAllOpened: false})}>
				<div className="alert-dialog-title">Rly nigga?</div>
				<div className="alert-dialog-content">Do you really want to delete all tasks?</div>
				<div className="alert-dialog-footer">
					<Ons.AlertDialogButton onClick={() => this.setState({dialogAllOpened: false})}>
						👎
					</Ons.AlertDialogButton>
					<Ons.AlertDialogButton onClick={() => { 
						this.deleteTask(); 
						this.setState({dialogAllOpened: false});
						TaskStore.tasks = {};
						}}>
						👍
					</Ons.AlertDialogButton>
				</div>
			</Ons.AlertDialog>
		</Ons.Page>
		
		)
	}
}