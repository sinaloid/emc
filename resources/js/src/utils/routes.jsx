const routes = [
    {
      path: "/",
      role: ["ADMIN"],
      element: React.lazy(() => import("../pages/App")),
      children: [
        {
          path: "/child",
          element: React.lazy(() => import("../pages/Child")),
        },
      ],
    },
    {
      path: "/about",
      role: [],
      element: React.lazy(() => import("../pages/About")),
    },
    {
      path: "/topics",
      role: ["User"],
      element: React.lazy(() => import("../pages/Topics")),
    },
  ];
  
  const createRoute = ({ element, children, role, ...route }) => {
    //const Component = role.length > 0 ? withAuth(element) : element;
    return (
      <Route key={route.path} {...route} element={<Component />}>
        {children && children.map(createRoute)}
      </Route>
    );
  };
  
  return <Routes>{routes.map(createRoute)}</Routes>;