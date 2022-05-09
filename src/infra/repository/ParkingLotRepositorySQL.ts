import ParkingLotAdapter from "../../adapter/ParkingLotAdapter";
import ParkedCar from "../../core/entity/ParkedCar";
import ParkingLot from "../../core/entity/ParkingLot";
import ParkingLotRepository from "../../core/repository/ParkingLotRepository";
import database from "../database/database";

export default class ParkinLotRepositorySQL implements ParkingLotRepository {
    async getParkingLot(code: string): Promise<ParkingLot> {
        const parkingLotData = await database
            .oneOrNone("select *, (select count(*) from example.parked_car pc where pc.code =  pl.code)::int as occupied_spaces from example.parking_lot pl where pl.code = $1", [code]);
        return ParkingLotAdapter.create(parkingLotData.code, parkingLotData.capacity, parkingLotData.open_hour, parkingLotData.close_hour, parkingLotData.occupied_spaces);
    }

    async enterParkingLot(code: string, plate: string, date: Date): Promise<void> {
        await database.none("insert into example.parked_car (code, plate, date) values ($1, $2, $3)", [code, plate, date]);
    }

    getParkedCar(code: string, plate: string): Promise<ParkedCar> {
        throw new Error("Method not implemented.");
    }

    leaveParkingLot(code: string, plate: string, date: Date): void {
        throw new Error("Method not implemented.");
    }

}