import classes from "./JourneyItem.module.css";

const JourneyItem: React.FC<{
  depatureTime: string;
  returnTime: string;
  depatureStation: string;
  returnStation: string;
  coveredDistance: number;
  duration: number;
}> = (props) => {
  return <div className={classes.itemLine}>
    <span>{props.depatureTime}</span>
    <span>{props.returnTime}</span>
    <span>{props.depatureStation}</span>
    <span>{props.returnStation}</span>
    <span>{props.coveredDistance}</span>
    <span>{props.duration}</span>
  </div>;
};

export default JourneyItem;
