export class UsersRepo {
  static async create(): Promise<{ user: User }> {
    // POST /users
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

  static async login(): Promise<{ token: string }> {
    // POST /users/login
    return {
      token: 'this-is-a-token',
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
