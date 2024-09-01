import { Box, Flex, Text, Image, Avatar } from "@chakra-ui/react"; // Importing Text and Image from Chakra UI
import { Link } from "react-router-dom";



const UserPost = () => {
  return (
    <Link to={"/markzuckerberg/post/1"}>
        <Flex gap={3} mb={4} py={5}>
            <Flex flexDirection={"column"} alignItems={"center"}>
                <Avatar size={"md"} name="Mark Zuckerberg" src="/zuck-avatar.png" />
                <Box w="1px" h={"full"} bg="gray.light" my={2}></Box>
                <Box position={"relative"} w={"full"}>
                    <Avatar 
                        size="xs"
                        name="John doe"
                        src="https://bit.ly/dan-abramov"
                        position={"absolute"}
                        top={"0px"}
                        left="15px"
                        padding={"2px"}
                    />
                    <Avatar 
                        size="xs"
                        name="John doe"
                        src="https://bit.ly/sage-adebayo"
                        position={"absolute"}
                        bottom={"0px"}
                        right="-5px"
                        padding={"2px"}
                    />
                    <Avatar 
                        size="xs"
                        name="John doe"
                        src="https://bit.ly/prosper-baba"
                        position={"absolute"}
                        bottom={"0px"}
                        left="4px"
                        padding={"2px"}
                    />
                </Box>
            </Flex>
            <Flex flex={1} flexDirection={"column"} gap={2}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Flex w={"full"} alignItems={"center"}>
                    <Text fontSize={"sm"} fontWeight={"bold"}>markzuckerberg</Text>
                    <Image src="/verified.png" w={4} h={4} ml={1}></Image>
                </Flex>
            </Flex>
            </Flex>
        </Flex>
    </Link>
  );
};

export default UserPost;