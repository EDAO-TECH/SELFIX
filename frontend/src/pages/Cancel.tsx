import { Link } from 'react-router-dom';

export default function Cancel() {
  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen flex flex-col justify-center items-center">
      <div className="px-4 mx-auto max-w-screen-xl text-center lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">
          Payment Cancelled
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400">
          You cancelled the checkout process. You can go back and try again.
        </p>
        <Link
          to="/"
          className="inline-flex justify-center items-center px-5 py-3 text-base font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
        >
          Return Home
        </Link>
      </div>
    </section>
  );
}
