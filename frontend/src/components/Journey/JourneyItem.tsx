// APP.CSS
import "./JourneyItem.css";

const JourneyItem: React.FC<{
  departureStation: string;
  returnStation: string;
  coveredDistance: string;
  duration: string;
}> = (props) => {
  return (
    <div className="journey-item-line">
      <span>{props.departureStation}</span>
      <span className="journey-span">{props.returnStation}</span>
      <span>{props.coveredDistance}</span>
      <span className="journey-span">{props.duration}</span>
    </div>
  );
};

export default JourneyItem;
