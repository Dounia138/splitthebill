export class UsersRepo {
  static async create(name: string, email: string, phoneNumber: string, password: string): Promise<void> {
    // POST /users/register
    try {
      const response = await fetch('http://localhost/api/users/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, phone_number: phoneNumber, password }),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      // On success, redirect the user to the login page
      window.location.replace('/login');
    } catch (err) {
      console.error(err);
      // Handle errors here, such as displaying an error message to the user
    }
  }

  static async login(email: string, password: string): Promise<void> {
    // POST /users/login
    try {
      const response = await fetch('/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Accept': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      // On success, save the token to local storage
      localStorage.setItem('token', data.token);
    } catch (err) {
      console.error(err);
      // Handle errors here, such as displaying an error message to the user
    }
  }

  static async get(id?: number): Promise<{ user: User }> {
    // GET /users/:id or GET /users/me
    return {
      user: {
        id: 1,
        name: 'Me',
        isAdmin: true,
        paidAmount: 0,
        owesAmount: 0,
      },
    }
  }

  static async delete(id: number): Promise<void> {
    // DELETE /users/:id
  }
}
