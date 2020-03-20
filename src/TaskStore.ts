import { observable, autorun, toJS } from 'mobx'

interface Dictionary<T> {
    [Key: string]: T;
}

export enum TaskPriority {
    Low = 0,
    Medium = 1,
    High = 2
}

export type TaskData = {
    uid: string
    name: string
    dueDate: Date
    description: string
    location?: string
    finished: boolean
    priority: TaskPriority
    vibration: boolean
}

function autoSave(store: any, save: any) {
    let firstRun = true;
    autorun(() => {
      // This code will run every time any observable property
      // on the store is updated.
      const json = JSON.stringify(toJS(store));
      if (!firstRun) {
        save(json);
      }
      firstRun = false;
    });
}

class TaskStore {

    @observable tasks: Dictionary<TaskData> = {}

    constructor() {
        this.load();
        autoSave(this, this.save.bind(this));
    }

    public getTaskList = (type: TaskData[]) => {
        return this.tasks;
    }

    public load = () => {
        this.tasks = JSON.parse(localStorage.getItem('tasks') || "{}").tasks;
        
        // Fix dates
        for (let uid in this.tasks) {
            this.tasks[uid].dueDate = new Date(this.tasks[uid].dueDate);
        }
    }

    public save = (json: string) => {
        localStorage.setItem('tasks', json);
    }
}

export default new TaskStore();