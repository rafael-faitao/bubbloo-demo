export class AuthService { 
    login = async ({ email, password }) => {
    // mock or real API call
    if (email === 'user@test.com' && password === '123') {
      return { token: 'fake-jwt-token', name: 'Test User' };
    } else {
      throw new Error('Invalid credentials');
    }
  };
}