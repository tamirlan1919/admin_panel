import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { DataProvider } from "@refinedev/strapi-v4";
import { App as AntdApp } from "antd";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import axios from "axios"; // Import axios
import { TOKEN_KEY as JWT_TOKEN} from "./constants";

import { authProvider } from "./authProvider";
import { Header } from "./components/header";
import { API_URL } from "./constants";
import { ColorModeContextProvider } from "./contexts/color-mode";
import {
  ProductsCreate,
  ProductsEdit,
  ProductsList,
  ProductsShow,
} from "./pages/products";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";
import { UserList } from "./pages/users/list";
import { UserCreate } from "./pages/users/create";
import { UserEdit } from "./pages/users/edit";
import { UserShow } from "./pages/users/show";
import { OrdersCreate, OrdersEdit, OrdersList, OrdersShow } from "./pages/orders";
import { BrandsCreate, BrandsEdit, BrandsList, BrandsShow } from "./pages/brands";
import { UserOutlined, ShopOutlined, ContainerOutlined, OrderedListOutlined, TagOutlined } from '@ant-design/icons';


function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  // Separate instances for different resources
  const usersAxiosInstance = axios.create({
    baseURL: API_URL + "/api", // Adjust the base URL accordingly
    headers: {
      Authorization: `Bearer ${JWT_TOKEN}`,
      // Add other headers if needed
    },
  });
  
  const productsAxiosInstance = axios.create({
    baseURL: API_URL + "/api", // Adjust the base URL accordingly
    headers: {
      Authorization: `Bearer ${JWT_TOKEN}`,
      // Add other headers if needed
    },
  });
  
  // Repeat the process for other Axios instances (orders, brands, categories)
  
  const ordersAxiosInstance = axios.create({
    baseURL: API_URL + "/api", // Adjust the base URL accordingly
    headers: {
      Authorization: `Bearer ${JWT_TOKEN}`,
      // Add other headers if needed
    },
  });
  
  const brandsAxiosInstance = axios.create({
    baseURL: API_URL + "/api", // Adjust the base URL accordingly
    headers: {
      Authorization: `Bearer ${JWT_TOKEN}`,
      // Add other headers if needed
    },
  });
  
  const categoriesAxiosInstance = axios.create({
    baseURL: API_URL + "/api", // Adjust the base URL accordingly
    headers: {
      Authorization: `Bearer ${JWT_TOKEN}`,
      // Add other headers if needed
    },
  });

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                authProvider={authProvider}
                dataProvider={DataProvider(
                  API_URL + `/api`,
                  usersAxiosInstance
                )} // Use usersAxiosInstance for users resource
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                i18nProvider={i18nProvider}
                resources={[
                  {
                    name: "users",
                    list: "/users",
                    create: "/users/create",
                    edit: "/users/edit/:id",
                    show: "/users/show/:id",
                    meta: {
                      canDelete: true,
                      icon: <UserOutlined />,

                    },
                  },
                  {
                    name: "products",
                    list: "/products",
                    create: "/products/create",
                    edit: "/products/edit/:id",
                    show: "/products/show/:id",
                    meta: {
                      canDelete: true,
                      icon: <ShopOutlined />,

                    },
                  },
                  {
                    name: "orders",
                    list: "/orders",
                    create: "/orders/create",
                    edit: "/orders/edit/:id",
                    show: "/orders/show/:id",
                    meta: {
                      canDelete: true,
                      icon: <OrderedListOutlined />,

                    },
                  },
                  {
                    name: "brands",
                    list: "/brands",
                    create: "/brands/create",
                    edit: "/brands/edit/:id",
                    show: "/brands/show/:id",
                    meta: {
                      canDelete: true,
                      icon: <ContainerOutlined />,

                    },
                  },
                  {
                    name: "categories",
                    list: "/categories",
                    create: "/categories/create",
                    edit: "/categories/edit/:id",
                    show: "/categories/show/:id",
                    meta: {
                      canDelete: true,
                      icon: <TagOutlined />,

                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                
                  projectId: "pfQipd-VcI7NB-N2jbwr",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2
                          Header={() => <Header sticky />}
                          Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="blog-posts" />}
                    />
                    <Route path="/users">
                      <Route index element={<UserList />} />
                      <Route path="create" element={<UserCreate />} />
                      <Route path="edit/:id" element={<UserEdit />} />
                      <Route path="show/:id" element={<UserShow />} />
                    </Route>
                    <Route path="/categories">
                      <Route index element={<CategoryList />} />
                      <Route path="create" element={<CategoryCreate />} />
                      <Route path="edit/:id" element={<CategoryEdit />} />
                      <Route path="show/:id" element={<CategoryShow />} />
                    </Route>
                    <Route path="/products">
                      <Route index element={<ProductsList />} />
                      <Route path="create" element={<ProductsCreate />} />
                      <Route path="edit/:id" element={<ProductsEdit />} />
                      <Route path="show/:id" element={<ProductsShow />} />
                    </Route>
                    <Route path="/orders">
                      <Route index element={<OrdersList />} />
                      <Route path="create" element={<OrdersCreate />} />
                      <Route path="edit/:id" element={<OrdersEdit />} />
                      <Route path="show/:id" element={<OrdersShow />} />
                    </Route>
                    <Route path="/brands">
                      <Route index element={<BrandsList />} />
                      <Route path="create" element={<BrandsCreate />} />
                      <Route path="edit/:id" element={<BrandsEdit />} />
                      <Route path="show/:id" element={<BrandsShow />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route
                      path="/login"
                      element={
                        <AuthPage
                          type="login"
                          formProps={{
                            initialValues: {
                              email: "demo@refine.dev",
                              password: "demodemo",
                            },
                          }}
                        />
                      }
                    />
                    <Route
                      path="/register"
                      element={<AuthPage type="register" />}
                    />
                    <Route
                      path="/forgot-password"
                      element={<AuthPage type="forgotPassword" />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
