import { DataTypes, Model } from "sequelize";
import * as bcrypt from "bcryptjs";
import sequelize from "../configs/db.config";

class User extends Model{}
User.init(
    {
        id: {
            primaryKey: true,
            unique: true,
            type: DataTypes.INTEGER
        },
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.STRING
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'Users'
    });

(async () => {
    await sequelize.sync({ force: true });
// Code here
})();

export default User;

export function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 8);
}

export function checkPassword(password: string, encrypted: string) {
    return bcrypt.compare(password, encrypted);
}