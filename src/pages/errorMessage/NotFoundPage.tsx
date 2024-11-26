import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const NotFoundPage: React.FC = () => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Box
        bgImage={`https://res.cloudinary.com/dt9bjjzrd/image/upload/v1732604242/qwlurz7toyosg28m07ed.png`}
        width={"550px"}
        height={"450px"}
        bgSize={"cover"}
        bgRepeat={"no-repeat"}
        bgPos={"center"}
      ></Box>
      <Text fontSize="3xl" fontWeight="bold" color={"darkcyan"} mt={4}>
        Error 404: Page Not Found
      </Text>
      <Text mt={2}>
        We're sorry, but the page you are looking for does not exist.
      </Text>

      <Link to="/">
        <Button colorScheme="teal" variant="solid" mt={5}>
          Back Home
        </Button>
      </Link>
    </Flex>
  );
};

export default NotFoundPage;
