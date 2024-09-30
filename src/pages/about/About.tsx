import profile1 from "../../assets/images/avator.png";

const About = () => {
  return (
    <div>
      <div className="container mx-auto p-6">
        <section id="mission" className="text-center my-12">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700">
            We aim to provide a seamless bike rental experience by connecting
            users with a range of bikes suited to their needs, fostering a
            culture of eco-friendly travel.
          </p>
        </section>

        <section id="team" className="my-12">
          <h2 className="text-3xl font-bold text-center mb-8">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src={profile1}
                alt="Team Member 1"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Al Samiul</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>

            <div className="text-center">
              <img
                src={profile1}
                alt="Team Member 2"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Jane Smith</h3>
              <p className="text-gray-600">COO</p>
            </div>

            <div className="text-center">
              <img
                src={profile1}
                alt="Team Member 3"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Sarah Lee</h3>
              <p className="text-gray-600">CTO</p>
            </div>
          </div>
        </section>

        <section id="history" className="my-12 ">
          <h2 className="text-3xl font-bold text-center mb-8">
            Our History & Milestones
          </h2>
          <div className="flex justify-center items-center">
            <div className="space-y-6 ">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                <p className="text-gray-700">
                  <strong>2022:</strong> Founded with a vision to make bike
                  rentals more accessible.
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                <p className="text-gray-700">
                  <strong>2023:</strong> Expanded to 10 major cities.
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                <p className="text-gray-700">
                  <strong>2024:</strong> Launched a web app to streamline the
                  rental process.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
