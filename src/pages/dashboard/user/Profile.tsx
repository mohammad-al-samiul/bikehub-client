import { useGetMyProfileQuery } from "../../../redux/features/auth/authApi";
import Spinner from "../../../components/ui/spinner/Spinner";
import { Divider } from "antd";
import profileImage from "../../../assets/images/avator.png";
import bannerBike from "../../../assets/images/bikes/bookingBanner.jpg";
import { useSelector } from "react-redux";
import { currentUser } from "../../../redux/features/auth/authSlice";
import { useEffect } from "react";
const Profile = () => {
  const { data, isLoading, refetch } = useGetMyProfileQuery(undefined);
  const user = useSelector(currentUser);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user]);

  if (isLoading) {
    return <Spinner />;
  }

  const { name, email, phone, address, role } = data.data;
  return (
    <div className="md:pt-10 pt-5">
      <>
        <h4 className="md:text-3xl text-xl font-semibold text-center ">
          Hey, <span className="text-accent font-bold">{name}!</span> It's great
          to see you again!
        </h4>
        <div className="xl:w-[900px] mx-auto mt-12 bg-white ">
          <div className="grid lg:grid-cols-3 grid-cols-1">
            <div
              style={{ backgroundImage: `url(${bannerBike})` }}
              className="col-span-1 text-center text-white"
            >
              <div className="bg-gray-800 bg-opacity-20 md:h-[500px] py-8 px-4 flex flex-col justify-center items-center">
                <div className="flex md:flex-col flex-row md:text-center text-left gap-4 items-center md:mb-10 mb-6 ">
                  <div>
                    <img
                      className="lg:w-[50%] md:w-[40%] w-[70px] mx-auto rounded-full"
                      src={profileImage}
                      alt=""
                    />
                  </div>
                  <div className="md:space-y-3 space-y-1">
                    <h5 className="md:text-lg text-[17px] md:uppercase font-semibold md:mt-4 text-white">
                      {name}
                    </h5>
                    <p className="uppercase font-medium md:mb-14 md:mt-3">
                      {role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2 border dark:border-lightBorder lg:h-[500px] md:py-8 py-5 lg:px-12 md:px-10 px-6">
              <div>
                <h4 className="font-semibold text-xl">Personal Information</h4>
                <Divider className="my-2 dark:bg-lightBorder" />
                <div className="grid md:grid-cols-2 gap-4 gap-y-8 pt-2">
                  <div>
                    <h5 className="font-semibold text-[17px]">Email</h5>
                    <p>{email}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[17px]">Phone</h5>
                    <p>{phone}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[17px]">Address</h5>
                    <p>{address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Profile;
