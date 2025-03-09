import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-blue-100 min-h-screen py-8 mt-20">
      <div className="max-w-screen-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl uppercase font-semibold text-center text-blue-600 mb-6">
          About Us
        </h1>

        {/* Mission Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700">
            Our mission is to deliver exceptional quality services to our
            clients while fostering a creative and collaborative work
            environment. We aim to solve the challenges of today and anticipate
            the needs of tomorrow.
          </p>
        </div>

        {/* Vision Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Our Vision
          </h2>
          <p className="text-lg text-gray-700">
            Our vision is to be a leader in our industry by providing innovative
            solutions that improve the lives of individuals and businesses
            worldwide. We strive to create a sustainable and positive impact
            through our products and services.
          </p>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Our Team
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Meet the passionate and talented individuals who drive our success.
            Together, we work hard to bring the best solutions to our clients.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Image
                src="https://github.com/shadcn.png"
                alt="Team Member 3"
                className="w-32 h-32 rounded-full mx-auto mb-4"
                height={152}
                width={152}
              />
              <h3 className="text-xl font-semibold text-blue-600">John Doe</h3>
              <p className="text-gray-500">CEO & Founder</p>
              <p className="mt-2 text-gray-700">
                John is the visionary behind our company, with over 10 years of
                experience in leading successful teams.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Image
                src="https://github.com/shadcn.png"
                alt="Team Member 3"
                className="w-32 h-32 rounded-full mx-auto mb-4"
                height={152}
                width={152}
              />
              <h3 className="text-xl font-semibold text-blue-600">
                Jane Smith
              </h3>
              <p className="text-gray-500">CTO</p>
              <p className="mt-2 text-gray-700">
                Jane is the technical mastermind behind our innovative
                solutions, ensuring we stay ahead of the curve.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Image
                src="https://github.com/shadcn.png"
                alt="Team Member 3"
                className="w-32 h-32 rounded-full mx-auto mb-4"
                height={152}
                width={152}
              />
              <h3 className="text-xl font-semibold text-blue-600">Mark Lee</h3>
              <p className="text-gray-500">COO</p>
              <p className="mt-2 text-gray-700">
                Mark handles the operations side of things, ensuring our
                services are always delivered with precision and efficiency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
