import User from "../models/User";

class UserService {

    constructor() {

    }

    static findAll(): Promise<any> {
        return User.findAll({attributes: ['firstName', 'lastName']});
    }

    static findById(id: number): Promise<any> {
        return User.findOne({where: {id: id}});
    }

    static findByUsername(username: string): Promise<any>{
        return User.findOne({where: {username: username}})
    }

    static async create(user: any): Promise<any> {
        let existed = await this.findByUsername(user.username);
        if(existed) {
            return null;
        } else {
            return User.create(user);
        }
    }

    static update(id: number, user: any) {
        return User.update(user, {where: {id}})
    }

    static delete(id: number) {
        return User.destroy({where: {id: id}})
    }
}

export default UserService;