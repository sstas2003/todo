export const state = {
  title: "ToDo App",
  isAuth: false,
  user: {
    token: window.localStorage.getItem("token"),
  },
};
