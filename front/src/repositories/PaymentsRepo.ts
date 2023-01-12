export class PaymentsRepo {
  static async findAppartmentPayments(): Promise<{ payments: Payment[] }> {
    // GET /users/me/appartment/payments
    return {
      payments: [
        {
          id: 1,
          amount: 100,
          payer: {
            id: 1,
            name: 'Me',
            isAdmin: true,
            paidAmount: 100,
            owesAmount: 0,
          },
          owesPayment: {
            id: 1,
            amount: 200,
            forTicket: {
              id: 1,
              name: 'Ticket 1',
              amount: 400,
              dueDate: '12/12/23',
              creator: {
                id: 2,
                name: 'Mate 1',
                isAdmin: false,
                paidAmount: 0,
                owesAmount: 0,
              },
            },
          },
        },
      ],
    }
  }

  static async create(): Promise<{ payment: Payment }> {
    // POST /users/me/appartment/payments
    return {
      payment: {
        id: 1,
        amount: 100,
        payer: {
          id: 1,
          name: 'Me',
          isAdmin: true,
          paidAmount: 100,
          owesAmount: 0,
        },
        owesPayment: {
          id: 1,
          amount: 200,
          forTicket: {
            id: 1,
            name: 'Ticket 1',
            amount: 400,
            dueDate: '12/12/23',
            creator: {
              id: 2,
              name: 'Mate 1',
              isAdmin: false,
              paidAmount: 0,
              owesAmount: 0,
            },
          },
        },
      },
    }
  }
}
