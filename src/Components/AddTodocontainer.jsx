import React from "react";
import { useDispatch } from "react-redux";
import { addContainer } from "../Store/todoSlice";
const AddTodocontainer = ({ isOpen, onClose }) => {
  const [inputVal, setinputVal] = React.useState("");
  const [validate, setvalidate] = React.useState(false);
  const dispatch = useDispatch();
  const handledivcontainer = (e) => {
    e.preventDefault();
    if (inputVal.length === 0) {
      setvalidate(true);
      return;
    }
      dispatch(addContainer({ Type: inputVal }));
      setinputVal("");
      setvalidate(false);
      onClose();
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded">
        <h1 className="text-xl text-center">Add Todo Container</h1>
        <form action="" className="p-2" onSubmit={handledivcontainer}>
          <div className="mb-2">
            <label className="block" htmlFor="">
              Enter your type:
            </label>
            <input
              className="border rounded w-[250px] px-2 py-1"
              value={inputVal}
              onChange={(e) => setinputVal(e.target.value)}
              type="text"
            />
            <p className={`text-red-400 ${validate ? `flex` : `hidden`}`}>
              Required
            </p>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Submit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-1 rounded mr-2 ml-1"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTodocontainer;
