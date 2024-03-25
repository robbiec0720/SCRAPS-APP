
const request = require('supertest');
const app = require('../server'); 

describe('User routes', () => {
  it('should create a new user', async () => {
    const newUser = {
      id: 13,
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    };

    const response = await request(app)
      .post('/users')
      .send(newUser)
      .expect(201);

    // Assert the response body contains the newly created user
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe(newUser.username);
    expect(response.body.email).toBe(newUser.email);
    // You may add more assertions based on your application's logic
  });
});
