import dotenv from 'dotenv';
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET as string;

export default JWT_SECRET;