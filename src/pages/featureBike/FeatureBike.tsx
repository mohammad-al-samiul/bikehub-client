import { Heading, Box, Center } from "@chakra-ui/react";
import { Reveal } from "../../components/motion/Reveal";

import { TBikeProps } from "../bikes/Bikes";
import { useGetBikesQuery } from "../../redux/features/bike/bikeApi";

import FeatureBikeCard from "./FeatureBikeCard";
import Spinner from "../../components/ui/spinner/Spinner";
import { Link } from "react-router-dom";

const FeatureBike = () => {
  const { data, isLoading } = useGetBikesQuery([]);

  const bikes = data?.data;

  if (isLoading) return <Spinner />;

  return (
    <div>
      <Box
        id="weOffer"
        minHeight={"80vh"}
        className="relative flex flex-col items-center justify-center gap-4 my-4"
        gap={4}
      >
        <Box
          className="absolute w-3/5 h-full top-0 right-0 bg-teal-100 opacity-25"
          clipPath={"circle(60% at 80% 13%)"}
        />
        <Box
          className="absolute w-1/6 h-full bottom-1 left-1 bg-teal-100 opacity-25"
          clipPath={"circle(25% at 54% 74%)"}
        />

        <Center mt={100} justifyContent={"center"} flexDirection={"column"}>
          <Reveal>
            <Heading
              as="h3"
              size={{ base: "sm", md: "xl" }}
              className="capitalize"
            >
              What we offer
            </Heading>
          </Reveal>
          <Reveal>
            <Heading
              as="h1"
              size={{ base: "xl", md: "3xl" }}
              className="py-4"
              color={"orange.500"}
            >
              Explore Our Bike Range
            </Heading>
          </Reveal>
        </Center>
      </Box>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center mx-5">
        {bikes?.slice(0, 6).map((bike: TBikeProps, i: string) => (
          <FeatureBikeCard key={i} bike={bike} />
        ))}
      </div>
      <div className="flex justify-center my-5">
        <Link to={`/bikes`}>
          <button className="btn text-white bg-teal-600 hover:bg-teal-600 hover:text-white">
            View All Bikes
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeatureBike;
