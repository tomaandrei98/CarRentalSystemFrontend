import { Customer } from "./customer";

export interface CustomerResponse {
    data: Customer[],
    message: string
}
