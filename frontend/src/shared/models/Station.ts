class Station {
  stationId: string;
  stationName: string;
  stationAddress: string;
  city: string;
  postalCode: number;
  x: number;
  y: number;

  constructor(id: string, name: string, address: string, city: string, postalCode: number, x: number, y: number) {
    this.stationId = id;
    this.stationName = name;
    this.stationAddress = address;
    this.city = city;
    this.postalCode = postalCode;
    this.x = x;
    this.y = y;
  }
}

export default Station;