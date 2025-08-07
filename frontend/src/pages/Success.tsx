import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen flex flex-col justify-center items-center">
      <div className="px-4 mx-auto max-w-screen-xl text-center lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-green-600 dark:text-green-400">
          Payment Successful 🎉
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400">
          Thank you for your payment. Your transaction has been completed.
        </p>
        <Link
          to="/"
          className="inline-flex justify-center items-center px-5 py-3 text-base font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900"
        >
          Go to Dashboard
        </Link>
      </div>
    </section>
  );
}
