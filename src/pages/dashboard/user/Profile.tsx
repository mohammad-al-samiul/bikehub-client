import { useGetMyProfileQuery } from "../../../redux/features/auth/authApi";
import Spinner from "../../../components/ui/spinner/Spinner";
import { Button, ConfigProvider, Divider } from "antd";
import profileImage from "../../../assets/images/avator.png";
import bannerBike from "../../../assets/images/bikes/bookingBanner.jpg";
import { useSelector } from "react-redux";
import { currentUser } from "../../../redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import UpdateProfileModal from "../UpdateProfileModal";
const Profile = () => {
  const { data, isLoading, refetch } = useGetMyProfileQuery(undefined);
  const user = useSelector(currentUser);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user]);

  if (isLoading) {
    return <Spinner />;
  }

  const { name, email, phone, address, role, createdAt } = data.data;
  const customTheme = {
    token: {
      colorPrimary: "#0d9488", // Change this to your primary color
    },
  };
  const userInfo = {
    name,
    email,
    phone,
    address,
  };
  return (
    <div className="md:pt-10 pt-5">
      <>
        <h4 className="md:text-4xl text-2xl font-semibold text-center mt-6">
          Hey, <span className="text-accent font-bold">{name}!</span> It's great
          to see you again!
        </h4>
        <div className="xl:w-[1000px] mx-auto mt-12 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="grid lg:grid-cols-3 grid-cols-1">
            {/* Profile Image & Basic Info */}
            <div
              style={{ backgroundImage: `url(${bannerBike})` }}
              className="col-span-1 text-center text-white bg-cover bg-center"
            >
              <div className="bg-gray-800 bg-opacity-50 lg:h-[500px] py-8 px-4 flex flex-col justify-center items-center">
                <img
                  className="lg:w-[60%] md:w-[50%] w-[100px] rounded-full border-4 border-white shadow-lg"
                  src={profileImage}
                  alt="Profile"
                />
                <div className="mt-6 space-y-3">
                  <h5 className="md:text-lg text-[18px] uppercase font-semibold">
                    {name}
                  </h5>
                  <p className="uppercase font-medium text-gray-200">{role}</p>
                  <ConfigProvider theme={customTheme}>
                    <div className="">
                      <Button type="primary" onClick={showModal}>
                        Edit
                      </Button>
                      <UpdateProfileModal
                        isModalOpen={isModalOpen}
                        handleCancel={handleCancel}
                        userInfo={userInfo}
                      />
                    </div>
                  </ConfigProvider>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="col-span-2 lg:h-[500px] py-8 px-10 relative">
              <div>
                <h4 className="font-semibold text-2xl mb-4 text-gray-700">
                  Personal Information
                </h4>
                <Divider className="my-4" />
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-lg text-gray-600">
                      Email
                    </h5>
                    <p className="text-gray-800">{email}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-lg text-gray-600">
                      Phone
                    </h5>
                    <p className="text-gray-800">{phone}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-lg text-gray-600">
                      Address
                    </h5>
                    <p className="text-gray-800">{address}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-lg text-gray-600">
                      Member Since
                    </h5>
                    <p className="text-gray-800">{createdAt.slice(0, 10)}</p>
                  </div>
                </div>
              </div>

              {/* Position the Setting button */}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Profile;
