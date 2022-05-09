import ParkingLotAdapter from "../../adapter/ParkingLotAdapter";
import ParkedCar from "../../core/entity/ParkedCar";
import ParkingLot from "../../core/entity/ParkingLot";
import ParkingLotRepository from "../../core/repository/ParkingLotRepository";

export default class ParkingLotRepositoryMemory implements ParkingLotRepository {
    
    parkingLots= [
        { code: "shopping", capacity: 5, open_hour: 8, close_hour: 22 },
        { code: "super market", capacity: 6, open_hour: 7, close_hour: 21 }
    ];
    parkedCars = [];

    getParkingLot(code: string): Promise<ParkingLot> {
        const parkingLotData = this.parkingLots.find(parkingLot => parkingLot.code === code);
        const occupiedSpaces = this.getOccupiedSpaces(code);
        const parkingLot = ParkingLotAdapter.create(parkingLotData.code, parkingLotData.capacity, parkingLotData.open_hour, parkingLotData.close_hour, occupiedSpaces);
        return Promise.resolve(parkingLot);
    }

    getParkedCar(code: string, plate: string): Promise<ParkedCar> {
        const parkedCar = this.parkedCars.find(parkedCar => {
            return parkedCar.code === code && parkedCar.plate === plate;
        });

        return Promise.resolve(parkedCar);
    }

    enterParkingLot(code: string, plate: string, arrival: Date): void {
        this.parkedCars.push({
            code,
            plate,
            arrival
        });
    }

    leaveParkingLot(code: string, plate: string, departure: Date): void {
        this.parkedCars.map(parkedCar => {
            if (parkedCar.code === code && parkedCar.plate === plate) {
                parkedCar.departure = departure;
            }
        });
    }

    getOccupiedSpaces(code: string): number {
        const parkedCars = this.parkedCars.filter(parkedCar => {
            return parkedCar.code === code && !parkedCar.departure;
        });

        return parkedCars.length;
    }

}