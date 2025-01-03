import { Box, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

const CardSlider = ({
  img,
  text1,
  text2,
  title,
  sousTitle,
}: {
  img: string;
  text1: string;
  text2: string;
  title: string;
  sousTitle: string;
}) => {
  // const itemVariants = {
  //   closed: {
  //     opacity: 0,
  //   },
  //   open: { opacity: 1 },
  // };
  return (
    <Flex
      position={"relative"}
      bgImage={img}
      bgRepeat={"no-repeat"}
      bgSize={"cover"}
      bgPosition={"center"}
      width={"full"}
      height={"100vh"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={6}
    >
      <Box
        className="bg-gray-600 opacity-25 z-0"
        w={"full"}
        h={"full"}
        position={"absolute"}
        style={{ opacity: 0.5 }}
      ></Box>

      <motion.p
        className="text-teal-400 sm:text-lg text-sm font-bold  px-2 z-10 mb-4"
        style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 0.8)" }}
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1, delay: 0.2 }}
      >
        {sousTitle}
      </motion.p>
      <motion.p
        className="text-gray-50 sm:text-5xl text-3xl font-bold z-10"
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1, delay: 0.5 }}
      >
        {title}
      </motion.p>
      {/* green line */}
      <motion.div
        className="w-16 h-1 rounded-xl bg-teal-100 z-10"
        variants={{
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1, delay: 1 }}
      />
      <motion.p
        className="text-gray-50 sm:text-lg text-sm font-semibold z-10"
        style={{ zIndex: 20 }}
        variants={{
          hidden: { opacity: 0, x: 150 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 2.5, delay: 1.5 }}
      >
        {text1}
      </motion.p>
      <motion.p
        className="text-gray-50 sm:text-lg text-sm font-semibold z-10"
        style={{ zIndex: 20 }}
        variants={{
          hidden: { opacity: 0, x: -150 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 2.5, delay: 1.5 }}
      >
        {text2}
      </motion.p>
    </Flex>
  );
};

export default CardSlider;
