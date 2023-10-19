import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/db.config";

class Todo extends Model{}
Todo.init(
    {
        id: {
            primaryKey: true,
            unique: true,
            type: DataTypes.INTEGER
        },
        userId: {
            type: DataTypes.INTEGER
        },
        content: {
            type: DataTypes.STRING
        },
    }, {
        sequelize,
        modelName: 'Todos'
    });

(async () => {
    await sequelize.sync({ force: false });
// Code here
})();

export default Todo;