class Journey {
  id?: string;
  depatureTime: string;
  returnTime: string;
  depatureStation: string;
  returnStation: string;
  coveredDistance: number;
  duration: number;

  constructor(depatureTime: string, returnTime: string, depatureStation: string, returnStation: string, coveredDistance: number, duration: number, journeyId?: string) {
    this.id = journeyId;
    this.depatureTime = depatureTime;
    this.returnTime = returnTime;
    this.depatureStation = depatureStation;
    this.returnStation = returnStation;
    this.coveredDistance = coveredDistance;
    this.duration = duration;
  }
}

export default Journey;