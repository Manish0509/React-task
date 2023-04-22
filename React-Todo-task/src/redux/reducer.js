const initialState = {
  task: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDTASK": {
      return {
        task: [...state.task, action.payload],
      };
    }
    case "UPDATETASK": {
      return {
        task: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default taskReducer;
