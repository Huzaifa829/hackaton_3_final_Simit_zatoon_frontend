import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import HomePage from "./screens/Home/HomePage.jsx";
import Authentication from "./screens/authentication/authentication.jsx";
import HomeSM from "./screens/SystemManagement/Home/HomeSM.jsx";
import DashboardHome from "./screens/SystemManagement/Dashboard/DashboardHome.jsx";
import MenuHome from "./screens/SystemManagement/Menu/MenuHome.jsx";
import ItemsHome from "./screens/SystemManagement/items/itemsHome.jsx";
import CategoriesHome from "./screens/SystemManagement/Categories/CategoriesHome.jsx";
import OffersHome from "./screens/SystemManagement/Offers/OffersHome.jsx";
import VouchersHome from "./screens/SystemManagement/Vouchers/VouchersHome.jsx";
import { store } from "./config/redux/stores/store.js";
import { Provider } from "react-redux";
import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes.jsx";

// Route Configuration
const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Main layout for all pages
    children: [
      {
        path: "", // Default route (HomePage)
        element: <HomePage />,
      },
      {
        path: "/auth", // Authentication Page
        element: <Authentication />,
      },
      {
        path: "/tf/v1/managment", // System Management Base Route
        element: <ProtectedRoutes component={<HomeSM />} />,
        children: [
          {
            path: "dashboard", // Dashboard Component
            element: <ProtectedRoutes component={<DashboardHome />} />,
          },
          {
            path: "menu", // Menu Component (with nested routes)
            element: <MenuHome />,
            children: [
              {
                path: "items", // Items Management
                element: <ItemsHome />,
              },
              {
                path: "categories", // Categories Management
                element: <CategoriesHome />,
              },
              {
                path: "offers", // Offers Management
                element: <OffersHome />,
              },
              {
                path: "vouchers", // Vouchers Management
                element: <VouchersHome />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

// Render the Router
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={route} />
  </Provider>
);
