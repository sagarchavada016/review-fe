import { Suspense } from "react";
import Loader from "../components/Loader";
import NotFoundPage from "../pages/NotFound";
import publicRoutes from "../routes/publicRoutes";

const routes = [
  ...publicRoutes.map((route) => ({
    ...route,
    element: <Suspense fallback={<Loader />}>{route.element}</Suspense>,
  })),

  {
    path: "*",
    element: (
      <Suspense fallback={<Loader />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
];

export default routes;
