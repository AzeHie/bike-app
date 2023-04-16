class Journey {
  id?: string;
  departureTime: string;
  returnTime: string;
  departureStation: string;
  returnStation: string;
  coveredDistance: string;
  duration: number;

  constructor(depatureTime: string, returnTime: string, depatureStation: string, returnStation: string, coveredDistance: string, duration: number, journeyId?: string) {
    this.id = journeyId;
    this.departureTime = depatureTime;
    this.returnTime = returnTime;
    this.departureStation = depatureStation;
    this.returnStation = returnStation;
    this.coveredDistance = coveredDistance;
    this.duration = duration;
  }
}

export default Journey;