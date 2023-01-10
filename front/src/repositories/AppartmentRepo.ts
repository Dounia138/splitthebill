export class AppartmentRepo {
  static async findMine(): Promise<{ appartment: Appartment }> {
    // GET /users/me/appartment
    return {
      appartment: {
        id: 1,
        uuid: 'this-is-a-uuid',
        residents: [
          {
            id: 2,
            name: 'Mate 1',
            isAdmin: false,
            paidAmount: 0,
            owesAmount: 0,
          },
          {
            id: 3,
            name: 'Mate 2',
            isAdmin: true,
            paidAmount: 0,
            owesAmount: 0,
          },
        ],
      },
    }
  }

  static async create(): Promise<{ appartment: Appartment }> {
    // POST /appartments
    return {
      appartment: {
        id: 1,
        uuid: 'this-is-a-uuid',
        residents: [],
      },
    }
  }

  static async delete(id: number): Promise<void> {
    // DELETE /users/me/appartment
  }
}
