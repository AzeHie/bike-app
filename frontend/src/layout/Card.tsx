import { PropsWithChildren } from "react";
import "./Card.css";

export interface ICardProps extends PropsWithChildren {}

const Card: React.FC<ICardProps> = (props) => {
  return (
    <div className="card">{props.children}</div>
  )
};

export default Card;