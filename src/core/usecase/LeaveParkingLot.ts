import ParkedCar from "../entity/ParkedCar";
import ParkingLotRepository from "../repository/ParkingLotRepository";

export default class LeaveParkingLot {
    parkingLotRepository: ParkingLotRepository;

    constructor(parkingLotRepository: ParkingLotRepository) {
        this.parkingLotRepository = parkingLotRepository;
    }

    async execute(code: string, plate: string, departure: Date) {
        const parkingLot = await this.parkingLotRepository.getParkingLot(code);
        const parkedCar = await this.parkingLotRepository.getParkedCar(code, plate);

        if (!parkedCar) throw new Error(`There is no car with plate: ${plate} in the parkinglot: ${code}`);
        if (!parkingLot.isOpen(departure)) throw new Error("The parking lot is closed");

        await this.parkingLotRepository.leaveParkingLot(parkedCar.code, parkedCar.plate, departure);

        return parkingLot;
    }

}