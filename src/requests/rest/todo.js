let list = [
  {
    id: 1,
    user_id: 1,
    name: "Task 1",
    date: "2021-08-24",
    complete: false,
    desc: "Task description 1",
  },
  {
    id: 2,
    user_id: 1,
    name: "Task 2",
    date: "2021-08-25",
    complete: true,
    desc: "Task description 2",
  },
  {
    id: 3,
    user_id: 1,
    name: "Task 3",
    date: "2021-08-26",
    complete: false,
    desc: "Task description 3",
  },
  {
    id: 4,
    user_id: 2,
    name: "Task 1",
    date: "2021-08-27",
    complete: false,
    desc: "Task description 1",
  },
];

export function fetchList(userId) {
  return new Promise((resolve, reject) => {
    resolve(list.filter((item) => item.user_id === userId));
  });
}
