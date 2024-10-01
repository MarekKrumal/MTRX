import { Avatar, Flex, Text } from '@chakra-ui/react'

const Message = ({ownMessage}) => {
  return (
    <>
    {ownMessage ?(

    <Flex
        gap={2}
        alignSelf={"flex-end"}
    >
        <Text maxWidth={"350px"} bg={"green.800"} p={1} borderRadius={"md"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id corporis quis tempora. I
        </Text>
        <Avatar src="" w="7" h={7}/>
    </Flex>
     ) : (
        <Flex
        gap={2}
        
    >
        <Avatar src="" w="7" h={7}/>
        <Text maxWidth={"350px"} bg={"green.600"} p={1} borderRadius={"md"}>. Culpa sint placeat nior a autem illo libero aut vitae deleniti, consequuntur exercitationem voluptatem.
        </Text>
        
    </Flex>
     )}
    </>
  )
}

export default Message