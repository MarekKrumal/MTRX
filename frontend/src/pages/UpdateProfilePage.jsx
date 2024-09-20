import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
} from '@chakra-ui/react'
import { useRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import { useRef, useState } from 'react';
import usePreviewImg from '../hooks/usePreviewImg';
import useShowToast from '../hooks/useShowToast';

//https://chakra-templates.vercel.app/forms/authentication

export default function UpdateProfilePage() {
    const [user, setUser] = useRecoilState(userAtom);
	const [inputs, setInputs] = useState({
		name: user.name,
		username: user.username,
		email: user.email,
		bio: user.bio,
		password: "",
    });

    const fileRef = useRef(null);

    const showToast = useShowToast();

    const { handleImageChange, imgUrl } = usePreviewImg() //kdyz zmenime image pomoci Buttonu(<Input type='file' hidden ref={fileRef}/>) tato funkce se spusti
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(`api/users/update/${user._id}`,{
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({...inputs, profilePic:imgUrl}),
        })
        const data = await res.json(); //updejtovany user objekt
        if(data.error){
          showToast("Error", data.error, "error")
          return;
        }
        showToast("Success", "Profile updated successfully", "success");
        setUser(data);
        localStorage.setItem("user-threads", JSON.stringify(data));
      } catch (error) {
        showToast("Error", error, "error")
      }
    }

  return (
    <form onSubmit={handleSubmit}>
    <Flex
      align={'center'}
      justify={'center'}
      my={6}
      >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.dark')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" boxShadow={"md"} src={imgUrl || user.profilePic} />

            </Center>
            <Center w="full">
              <Button w="full" onClick={() => fileRef.current.click()}>Change Avatar</Button>
              <Input type='file' hidden ref={fileRef} onChange={handleImageChange}/>
            </Center>
          </Stack>
        </FormControl>
        <FormControl>
          <FormLabel>Full name</FormLabel>
          <Input
            placeholder="Marek Krumal"
            value={inputs.name}
			onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="Marek"
            value={inputs.username}
			onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            value={inputs.email}
			onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            _placeholder={{ color: 'gray.500' }}
            type="email"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Bio</FormLabel>
          <Input
            placeholder="Your bio."
            value={inputs.bio}
			onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="password"
            value={inputs.password}
			onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            _placeholder={{ color: 'gray.500' }}
            type="password"
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}>
            Cancel
          </Button>
          <Button
            bg={'green.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
            type='submit'
            >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
    </form>
  )
}