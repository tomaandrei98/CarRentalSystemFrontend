export interface Rental {
    id: number,
    startDate: Date,
    endDate: Date,
    returned: boolean,
    totalPrice: number,
    customerId: number,
    carsId: Array<number>
}
