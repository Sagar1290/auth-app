import React from "react";

const About = () => {
  return (
    <div>
      <div className="bg-gray-100 py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            About Our Authentication Platform
          </h1>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              What We Do
            </h2>

            <p className="text-gray-700 mb-4">
              Our platform allows you to create an account, log in securely, and
              update your profile information as needed. We understand the
              importance of keeping your data safe, and we've built our system
              with your security in mind.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Why Choose Us?
            </h2>

            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li className="mb-2">
                Ease of Use: We've designed our platform to be easy to use,
                whether you're signing up for the first time or logging in to
                access your account.
              </li>
              <li className="mb-2">
                Security: Your security is our top priority. We use
                industry-standard encryption techniques to protect your data and
                ensure that only you can access your account.
              </li>
              <li className="mb-2">
                Simplicity: We believe in keeping things simple. Our platform
                offers straightforward authentication processes, so you can
                spend less time worrying about security and more time focusing
                on what matters to you.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Who I Am
            </h2>

            <p className="text-gray-700 mb-4">
              I'm a passionate developer dedicated to creating a user-friendly
              authentication platform for your needs. While there may not be a
              large team behind this project, rest assured that your security
              and satisfaction are my top priorities.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Contact Us
            </h2>

            <p className="text-gray-700 mb-4">
              Have questions or feedback? We'd love to hear from you! Feel free
              to reach out to our team with any inquiries or suggestions you may
              have.
            </p>
            <span className="text-gray-700 mb-4">
              Email: dev.sagar1290@gmail.com
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
