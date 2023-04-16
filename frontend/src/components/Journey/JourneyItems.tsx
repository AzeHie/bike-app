// APP.CSS

const JourneyItem: React.FC<{
  departureTime: string;
  returnTime: string;
  departureStation: string;
  returnStation: string;
  coveredDistance: number;
  duration: number;
}> = (props) => {
  return <div className="item-line">
    <span>{props.departureTime}</span>
    <span>{props.returnTime}</span>
    <span>{props.departureStation}</span>
    <span>{props.returnStation}</span>
    <span>{props.coveredDistance}</span>
    <span>{props.duration}</span>
  </div>;
};

export default JourneyItem;
