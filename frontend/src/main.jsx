import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PrivateRoute from "./components/PrivateRoute";
import HomeScreen from "./screens/HomeScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import AddExpenseScreen from "./screens/AddExpenseScreen.jsx";
import ExpenseScreen from "./screens/ExpenseScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<App />}>        
        <Route path="/addExpense" element={<AddExpenseScreen />} />
        <Route path="/expense" element={<ExpenseScreen />} />
      </Route>
    </>
  )
);

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const theme = extendTheme({ config });

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <React.StrictMode>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <RouterProvider router={router} />
      </React.StrictMode>
    </Provider>
  </ChakraProvider>
);
