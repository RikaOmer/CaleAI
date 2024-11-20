import Manager from "../services/manager";
export default class Task {

  constructor(
    id,
    name,
    frequency,
    duration,
    is_morning,
    is_noon,
    is_evening,
    type,
  ) {
    this.id = id;
    this.name = name;
    this.frequency = frequency;
    this.duration = duration;
    this.is_morning = is_morning;
    this.is_noon = is_noon;
    this.is_evening = is_evening;
    this.type = type;
  }

  static from_json(task) {
    return new Task(
      task.id,
      task.name,
      task.frequency,
      task.duration,
      task.is_morning,
      task.is_noon,
      task.is_evening,
      task.type_id,
    );
  }
  static async createTasks(tasks){
    const url = "task/"
    const body = {
      tasks: tasks
    } 
    return await Manager.post(url, body)
      .then((resp) => {
        return resp.data;
      })
      .catch((error) => {
        return null;
      });
  }

  static async getTasks(){
    const url = "task/"
    return await Manager.get(url)
      .then((resp) => {
        return resp.data.map(task => Task.from_json(task));
      })
      .catch((error) => {
        return [];
      });
  }

  static async delete(id){
    const url = "task/"
    const body = {
      id: id
    }
    return await Manager.delete(url, body)
      .then((resp) => {
        return resp.status
      })
      .catch((error) => {
        return 400;
      });
  }

}
