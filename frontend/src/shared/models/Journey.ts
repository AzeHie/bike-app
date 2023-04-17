class Journey {
  id?: string;
  departureStation: string;
  returnStation: string;
  coveredDistance: string;
  duration: string;

  constructor(depatureStation: string, returnStation: string, coveredDistance: string, duration: string, journeyId?: string) {
    this.id = journeyId;
    this.departureStation = depatureStation;
    this.returnStation = returnStation;
    this.coveredDistance = coveredDistance;
    this.duration = duration;
  }
}

export default Journey;