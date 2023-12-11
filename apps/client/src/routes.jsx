import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";

export const protectedRoutes = [
    {
        path: "/home",
        component: HomePage,
        exact: true,
    },
];

export const publicRoutes = [
    {
        path: "/",
        component: SignInPage,
        exact: true,
    },
];