import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Streak } from "../../types/Streak";
import getTimeSinceLast from "../functions/getTimeSinceLast";

interface Props {
  streak: Streak;
}

const StreakComponent = ({ streak }: Props) => {
  const { name, icon, done } = streak;
  return (
    <li className="is-flex is-align-items-center py-2">
      <FontAwesomeIcon className="icon mr-3" icon={icon as IconProp} />
      <span>{name}</span>
      {!!done.length && <span className="ml-1">{getTimeSinceLast(done)}</span>}
    </li>
  );
};

export default StreakComponent;
