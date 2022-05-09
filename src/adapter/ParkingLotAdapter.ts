import ParkingLot from "../core/entity/ParkingLot";
import ParkingLotRepository from "../core/repository/ParkingLotRepository";

export default class ParkingLotAdapter {
    static create (code: string, capacity: number, openHour:number, closeHour:number, occupiedSpaces:number) {
        return new ParkingLot(code, capacity, openHour, closeHour, occupiedSpaces);
    }
}