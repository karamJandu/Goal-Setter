import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addGoals, getGoals, updateGoals } from "../features/goals/goalSlice";
import { useState } from "react";
import Goal from "./Goal";
import { getMe } from "../features/auth/authSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const [goalInput, setGoalInput] = useState({ text: "" });
  const [buttonText, setButtonText] = useState("Add Goal");
  const [error, setError] = useState(null);
  const { goals } = useSelector((state) => state.goals);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getMe());
      dispatch(getGoals());
    }
  }, [user, navigate, dispatch]);

  const onSubmit = (e, goalData) => {
    e.preventDefault();
    if (!goalData.text || goalData.text.trim() === "") {
      setError("Please enter a goal!!!");
      return;
    }
    if (buttonText === "Add Goal") {
      dispatch(addGoals(goalData));
    } else if (buttonText === "Update Goal") {
      dispatch(updateGoals(goalData));
    }
    setGoalInput({ text: "" });
    setButtonText("Add Goal");
  };

  return (
    <>
      <h2>Welcome {user && user.name}</h2>
      <form onSubmit={(e) => onSubmit(e, goalInput)}>
        <div className="form-group">
          <input
            className="form-control"
            name="goal"
            onChange={(e) => {
              setGoalInput({ ...goalInput, text: e.target.value });
              setError(null);
            }}
            value={goalInput.text}
            type="text"
            placeholder="Enter a goal"
          />
          {error && (
            <p>
              <i>{error}</i>
            </p>
          )}
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
              setGoalInput={setGoalInput}
              goalInput={goalInput}
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
