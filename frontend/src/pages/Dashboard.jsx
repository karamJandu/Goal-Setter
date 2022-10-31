import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addGoals, getGoals, updateGoals } from "../features/goals/goalSlice";
import { useState } from "react";
import Goal from "./Goal";

const Dashboard = () => {
  const navigate = useNavigate();
  const [goal, setGoal] = useState({ text: "" });
  const [buttonText, setButtonText] = useState("Add Goal");
  const { goals } = useSelector((state) => state.goals);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getGoals());
    }
  }, [user, navigate, dispatch]);

  const onSubmit = (e, goalData) => {
    e.preventDefault();
    if (buttonText === "Add Goal") {
      dispatch(addGoals(goalData));
    } else if (buttonText === "Update Goal") {
      console.log(goalData);
    }
  };

  return (
    <>
      <form onSubmit={(e) => onSubmit(e, { text: goal })}>
        <div className="form-group">
          <input
            className="form-control"
            name="goal"
            onChange={(e) => setGoal({ ...goal, text: e.target.value })}
            value={goal.text}
            type="text"
          />
        </div>
        <div className="form-group">
          <button
            className="form-control btn btn-block btn-reverse"
            type="submit"
          >
            {buttonText}
          </button>
        </div>
      </form>
      <section>
        <h2>Your Goals List</h2>
        {goals && goals.length > 0 ? (
          goals.map((goal) => (
            <Goal
              key={goal._id}
              goal={goal}
              setGoal={setGoal}
              setButtonText={setButtonText}
              onSubmit={onSubmit}
            />
          ))
        ) : (
          <div className="form-group">
            <p className="form-control">No Goals Added Yet</p>
          </div>
        )}
      </section>
    </>
  );
};

export default Dashboard;
