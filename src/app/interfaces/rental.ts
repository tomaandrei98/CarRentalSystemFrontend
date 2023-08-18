import { Car } from "./car";
import { CarResponse } from "./car-response";

export interface Rental {
    id: number,
    startDate: Date,
    endDate: Date,
    returned: boolean,
    totalPrice: number,
    appUserId: number,
    appUserEmail: string,
    carsId: number[],
    carsDto: Car[]
}
