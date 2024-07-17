import React, { lazy } from "react";

const FreelancersPage = lazy(() => import("../pages/Freelancers"));
const FreelancerReviews = lazy(() => import("../pages/FreelancerReviews"));
const Reviews = lazy(() => import("../pages/Reviews"));

const publicRoutes = [
  {
    path: "/",
    element: <FreelancersPage />,
  },
  {
    path: "/reviews/:freelancerId",
    element: <FreelancerReviews />,
  },
  {
    path: "/list-reviews",
    element: <Reviews />,
  },
];

export default publicRoutes;
