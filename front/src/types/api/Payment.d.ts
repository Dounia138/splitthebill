interface Payment {
  id: number
  amount: number
  payer: User
  owesPayment: OwesPayment
}
