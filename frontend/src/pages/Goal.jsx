import { useDispatch } from "react-redux";
import { FaTrashAlt, FaPenAlt } from "react-icons/fa";
import { deleteGoals } from "../features/goals/goalSlice";

const Goal = (props) => {
  const dispatch = useDispatch();

  const onEdit = () => {
    props.setGoal({ text: props.goal.text, _id: props.goal._id });
    props.setButtonText("Update Goal");
  };

  const onDelete = () => {
    dispatch(deleteGoals({ _id: props.goal._id }));
  };

  return (
    <div className="flex">
      <div className="form-group">
        <p className="form-control">{props.goal.text}</p>
      </div>
      <div className="form-group">
        <FaPenAlt
          style={{ marginRight: "20", cursor: "pointer" }}
          onClick={onEdit}
        />
        <FaTrashAlt style={{ cursor: "pointer" }} onClick={onDelete} />
      </div>
    </div>
  );
};

export default Goal;
