import ToDoListPage from "../pages/ToDoListPage";
import ProfilePage from "../pages/ProfilePage";

export const routes = [
    {
        exact: true,
        path: '/profile',
        name: 'Profile',
        component: ProfilePage
    },
    {
        exact: true,
        path: '/todo-list',
        name: 'ToDo List',
        component: ToDoListPage
    },
];
