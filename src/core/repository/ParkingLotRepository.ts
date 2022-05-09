import ParkedCar from "../entity/ParkedCar";
import ParkingLot from "../entity/ParkingLot";

export default interface ParkingLotRepository {
    getParkingLot(code: string) : Promise<ParkingLot>;
    getParkedCar(code: string, plate: string) : Promise<ParkedCar>;
    enterParkingLot(code: string, plate: string, arrival: Date) : void;
    leaveParkingLot(code: string, plate: string, departure: Date) : void;
}