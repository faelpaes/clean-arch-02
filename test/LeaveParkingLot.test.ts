import EnterParkingLot from "../src/core/usecase/EnterParkingLot";
import GetParkingLot from "../src/core/usecase/GetParkingLot";
import LeaveParkingLot from "../src/core/usecase/LeaveParkingLot";
import ParkingLotRepositoryMemory from "../src/infra/repository/ParkingLotRepositoryMemory";

test("Should leave parkinglot", async function () {
    const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
    const enterParkingLot = new EnterParkingLot(parkingLotRepositoryMemory);
    const leaveParkingLot = new LeaveParkingLot(parkingLotRepositoryMemory);
    const getParkingLot = new GetParkingLot(parkingLotRepositoryMemory);

    const parkingLotBeforeEnter = await getParkingLot.execute("shopping");
    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);

    await enterParkingLot.execute("shopping", "MMM-0002", new Date("2022-04-28T11:00:00"));

    const parkingLotAfterEnter = await getParkingLot.execute("shopping");
    expect(parkingLotAfterEnter.occupiedSpaces).toBe(1);

    await leaveParkingLot.execute("shopping", "MMM-0002", new Date("2022-04-28T13:00:00"));

    const parkingLotAfterLeave = await getParkingLot.execute("shopping");
    expect(parkingLotAfterLeave.occupiedSpaces).toBe(0);
});