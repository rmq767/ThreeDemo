export function getFileRoutes() {
  const fileRoutes = import.meta.glob("../views/**/*.vue");
  const urlKeys = Object.keys(fileRoutes);

  const route = urlKeys.map((urlKey) => {
    return {
      path: urlKey
        .replace("../views/", "/")
        .replace(".vue", "")
        .toLocaleLowerCase(),
      component: fileRoutes[urlKey],
    };
  });
  return route;
}

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  ...getFileRoutes(),
];
export default routes;
