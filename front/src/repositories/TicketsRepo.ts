export class TicketsRepo {
  static async findAppartmentTickets(): Promise<{ tickets: Ticket[] }> {
    // GET /users/me/appartment/tickets
    return {
      tickets: [
        {
          id: 1,
          name: 'Ticket 1',
          amount: 400,
          dueDate: '12/12/23',
          creator: {
            id: 1,
            name: 'Me',
            isAdmin: true,
            paidAmount: 0,
            owesAmount: 0,
          },
        },
      ],
    }
  }

  static async create(): Promise<{ ticket: Ticket }> {
    // POST /users/me/appartment/tickets
    return {
      ticket: {
        id: 1,
        name: 'Ticket 1',
        amount: 400,
        dueDate: '12/12/23',
        creator: {
          id: 1,
          name: 'Me',
          isAdmin: true,
          paidAmount: 0,
          owesAmount: 0,
        },
      },
    }
  }

  static async delete(id: number): Promise<void> {
    // DELETE /users/me/appartment/tickets/:id
  }
}
