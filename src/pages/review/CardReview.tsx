import { Box, Text, Flex, Avatar } from "@chakra-ui/react";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
type Review = {
  id: number;
  avatar: string;
  name: string;
  tag: string;
  review: string;
};
const CardReview = ({
  review,
  isActive,
}: {
  review: Review;
  isActive: boolean;
}) => {
  return (
    <Box
      className={`flex flex-col items-center justify-start gap-4 rounded-lg bg-white  p-8 shadow-lg ${
        !isActive && "opacity-60"
      }`}
    >
      <Text className="flex text-start text-base font-medium text-gray-600">
        <RiDoubleQuotesL color="teal" />
        <span className="mx-1 w-fit"> {review.review}</span>
        <RiDoubleQuotesR className=" self-end" color="teal" />
      </Text>
      <Flex gap={3}>
        <Avatar src={review.avatar} name={review.name} />
        <Box>
          <Text className="text-base font-medium">{review.name}</Text>
          <Text className="text-base font-medium text-teal-500">
            {review.tag}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default CardReview;
