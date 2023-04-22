export const addTask = (data) => {
  return {
    type: "ADDTASK",
    payload: data,
  };
};

export const updateTask = (data) => {
  return {
    type: "UPDATETASK",
    payload: data,
  };
};
