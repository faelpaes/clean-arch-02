export default class ParkedCar {
    code: string;
    plate: string;
    arrival: Date;
    departure: Date;

    constructor(code: string, plate:string, arrival: Date, departure?: Date) {
        if (!/[A-Z]{3}-[0-9]{4}/.test(plate)) throw new Error("Invalid plate");
        this.code = code;
        this.plate = plate;
        this.arrival = arrival;
        this.departure = departure;
    }
}