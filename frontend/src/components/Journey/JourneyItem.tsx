// APP.CSS
import "./JourneyItem.css";


const JourneyItem: React.FC<{
  departureTime: string;
  returnTime: string;
  departureStation: string;
  returnStation: string;
  coveredDistance: string;
  duration: number;
}> = (props) => {
  return <div className="item-line">
    <span>{props.departureTime}</span>
    <span className="journey-span">{props.returnTime}</span>
    <span>{props.departureStation}</span>
    <span className="journey-span">{props.returnStation}</span>
    <span>{props.coveredDistance}</span>
    <span className="journey-span">{props.duration}</span>
  </div>;
};

export default JourneyItem;
