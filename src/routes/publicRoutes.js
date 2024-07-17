import React, { lazy } from "react";

const FreelancersPage = lazy(() => import("../pages/Freelancers"));

const publicRoutes = [
  {
    path: "/",
    element: <FreelancersPage />,
  },
];

export default publicRoutes;
