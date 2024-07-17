import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl mb-4">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="bg-custom-blue hover:opacity-70 text-white font-bold py-2 px-4 rounded-md text-lg no-underline"
        >
          Go to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
