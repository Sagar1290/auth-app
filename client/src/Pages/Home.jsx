import React from "react";

const Home = () => {
  return (
    <section className="bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto mb-4">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Welcome to <span className="font-bold text-blue-900">Authify</span>:
        </h1>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 my-2">
            Your Secure Authentication Platform
          </h2>
          <p className="text-gray-700 my-2">
            At Authify, we're dedicated to providing you with a seamless and
            secure authentication experience. Our platform offers a range of
            features to ensure that your data remains protected while giving you
            convenient access to your account.
          </p>
          <div className="flex flex-col gap-2">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 my-2">
                Sign Up for Free:
              </h2>
              <p className="text-md text-gray-600">
                Get started with Authify by creating your account. Signing up is
                quick, easy, and completely free! Simply provide your email
                address and create a strong password to begin your journey with
                us.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 my-2">
                Secure Login Process:
              </h2>
              <p className="text-md text-gray-600">
                Once you've signed up, logging in to your to your Authify
                account is a breeze. Our robust authentication system employs
                industry-standard encryption techniques to safeguard your
                credentials and ensure that only you can access your account.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 my-2">
                Convenient Google Login:
              </h2>
              <p className="text-md text-gray-600">
                Prefer to use your Google account for authentication? No
                problem! Authify seamlessly integrates with Google login,
                allowing you to access your account with just a few clicks.
                Enjoy the convenience of single sign-on without compromising on
                security.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 my-2">
                Update Your Profile:
              </h2>
              <p className="text-md text-gray-600">
                Keep your account information up-to-date with our profile update
                feature. Whether you've changed your email address, updated your
                profile picture, or want to modify your personal details,
                Authify makes it simple to manage your account information
                securely.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 my-2">
                Stay Connected and Secure:
              </h2>
              <p className="text-md text-gray-600">
                At Authify, we prioritize the security and privacy of your data
                above all else. Our team is committed to staying ahead of the
                curve when it comes to cybersecurity, ensuring that your
                information remains protected at all times.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 my-2">
                Get Started Today:
              </h2>
              <p className="text-md text-gray-600">
                Ready to experience the convenience and security of Authify?
                Sign up for your free account today and take control of your
                online authentication experience. With Authify, your security is
                our top priority.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
