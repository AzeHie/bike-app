class Station {
  stationId: number;
  stationName: string;
  stationAddress: string;
  city: string;
  coordinates: {
    lng: number,
    lat: number
  };
  constructor(id: number, name: string, address: string, city: string, coordinates: {lat: number, lng: number}) {
    this.stationId = id;
    this.stationName = name;
    this.stationAddress = address;
    this.city = city;
    this.coordinates = coordinates;
  }
}

export default Station;