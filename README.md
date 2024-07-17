# Freelancer Review System Frontend

This project implements the frontend of a review and rating system for freelancers, similar to Trustpilot, using React. It integrates with a Django backend to fetch, display, sort, and filter reviews.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.x or later)
- npm (v6.x or later)

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**

    git clone [URL to the frontend repository]
    cd [repository name]

2. **Install dependencies:**

    npm install

## Running the Application

To run the application in development mode, use:

    npm start

This will start the React application on `http://localhost:3000`.

## Features

- **Fetch Reviews**: Reviews are fetched from the backend API using the freelancer’s ID.
- **Display Reviews**: Reviews are displayed with details such as the reviewer’s name, rating, date of review, and review text.
- **Sort Reviews**: Users can sort reviews based on the most recent or highest rating.
- **Filter Reviews**: Users can filter reviews based on rating thresholds.
- **Pagination**: Supports pagination for loading reviews in batches.
- **Responsive Design**: The UI is responsive and works well across various screen sizes.