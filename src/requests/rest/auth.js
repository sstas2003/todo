let users = [
  {
    id: 1,
    name: "User 1",
    firstName: "Qwe",
    avatar: "/img/avatar.png",
    email: "user1@mail.mail",
    password: "user1",
    token: "qwasdvw22r23r23r",
  },
  {
    id: 2,
    name: "User 2",
    firstName: "Asd",
    avatar: "/img/avatar.png",
    email: "user2@mail.mail",
    password: "user2",
    token: "qwanntyhy88853r",
  },
  {
    id: 3,
    name: "User 3",
    firstName: "Zxc",
    avatar: "/img/avatar.png",
    email: "user3@mail.mail",
    password: "user3",
    token: "qwasdvsdfbnt63rr",
  },
];

export function tokenCheck(token) {
  return new Promise((resolve, reject) => {
    let user = users.find((user) => user.token === token);
    if (user) {
      resolve(user);
    } else {
      reject(undefined);
    }
  });
}

export function authN(email, password) {
  return new Promise((resolve, reject) => {
    let user = users.find((user) => user.email === email);
    if (user) {
      if (user.password === password) {
        resolve(user);
      } else {
        reject({ text: "Authentication fail" });
      }
    } else {
      reject({ text: "Authentication fail" });
    }
  });
}

export function getUser(id) {
  return new Promise((resolve, reject) => {
    resolve(users.find((user) => user.id === id));
  });
}

export function getUsers() {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
}
