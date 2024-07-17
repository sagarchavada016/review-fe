import React, { lazy } from "react";
import FreelancerReviews from "../pages/FreelancerReviews";

const FreelancersPage = lazy(() => import("../pages/Freelancers"));

const publicRoutes = [
  {
    path: "/",
    element: <FreelancersPage />,
  },
  {
    path: "/reviews/:freelancerId",
    element: <FreelancerReviews />,
  },
];

export default publicRoutes;
