import { createSlice } from "@reduxjs/toolkit";

export const form = createSlice({
  name: "data",
  initialState: {
    user: [],
    view: false,
  },

  reducers: {
    addUser(state, action) {
      state.user.push(action.payload);
    },
    userDeleted(state, action) {
      const { unique } = action.payload;
      const existingUser = state.user.find((obj) => obj.unique === unique);
      if (existingUser) {
        const remaining = state.user.filter((obj) => obj.unique !== unique);
        state.user = remaining;
      }
    },
    userUpdate(state, action) {
      const { payload } = action;
      const existingUser = state.user.findIndex(
        (user) => user.unique === payload.unique
      );
      if (existingUser !== -1) {
        state.user[existingUser] = { ...state.user[existingUser], ...payload };
      }
    },
    showViewData(state, action) {
      state.view = true;
    },
    closeViewData(state, action) {
      state.view = false;
    },
  },
});

export const { addUser, userDeleted, userUpdate, showViewData, closeViewData } =
  form.actions;
export default form.reducer;
