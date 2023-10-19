import Todo from "../models/Todo";

class TodoService {

    constructor() {

    }

    static findAllByUserId(userId: number): Promise<any> {
        return Todo.findAll({
            where: {userId},
            attributes: ['id', 'content',  'createdAt', 'updatedAt']
        });
    }

    static findOne(id: number, userId: number): Promise<any> {
        return Todo.findOne({where: {id, userId}, attributes: ['id', 'content', 'createdAt', 'updatedAt']});
    }

    static create(todo: any): Promise<any> {
        return Todo.create(todo);
    }

    static update(todo: any) {
        return Todo.update(todo, {where: {id: todo.id, userId: todo.userId}})
    }

    static delete(id: number, userId: number) {
        return Todo.destroy({where: {id, userId}})
    }
}

export default TodoService;