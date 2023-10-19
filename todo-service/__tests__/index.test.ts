import dotenv from 'dotenv';
import supertest from  'supertest'
dotenv.config();

const port = process.env.PORT;
var request = supertest(`localhost:${port}`);

const user = {
    username: 'maidinhhuy',
    password: '12345678'
}

describe(``, function () {

    async function getAccessToken() {
        const response = await request.post(`/auth/login`)
            .set('content-type', 'application/json')
            .send(user)

            return response.body.accessToken
    }

    // Register user
    it('should be return response with 201 status', async () => {
        const response = await request.post(`/users/register`)
            .set('content-type', 'application/json')
            .send(JSON.stringify(user));
            expect(response.status).toBe(201);
    });


    // Login
    it('should be return response access token', async () => {
        const response = await request.post(`/auth/login`)
            .set('content-type', 'application/json')
            .send(user)
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("accessToken");
    });

    // Update profile
    it('should be return response with 204', async () => {
        const response = await request.put(`/users`)
            .set('authorization',  (await getAccessToken()))
            .set('content-type', 'application/json')
            .send(user);
        expect(response.status).toBe(204);
    });

    // Get list user
    it('should be return response list user', async () => {
        const response = await request.get(`/users`)
            .set('authorization',  (await getAccessToken()))
            .set('content-type', 'application/json');
        expect(response.status).toBe(200);
    });

    // Get create todo
    it('should be return response status 201', async () => {
        const response = await request.post(`/todos`)
            .set('authorization',  (await getAccessToken()))
            .set('content-type', 'application/json')
            .send({
                content: 'Todo content demo'
            });
        expect(response.status).toBe(201);
    });

    // Get create todo list
    it('should be return response todo list', async () => {
        const response = await request.get(`/todos`)
            .set('authorization',  (await getAccessToken()))
            .set('content-type', 'application/json');
        expect(response.status).toBe(200);
    });

})
