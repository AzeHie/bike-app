import { useParams } from "react-router-dom";
import SingleStation from "../../components/Station/SingleStation";
import Station from "../../shared/models/Station";

const StationDetail = () => {
  // const stationId = useParams().stationId;

    // get station by id from the backend here..

  const station = new Station("501", "Hanasaari", "Hanasaarenranta 1", "Espoo", 86600, 24.840319, 60.16582);

  return <SingleStation station={station} />;
};

export default StationDetail;
