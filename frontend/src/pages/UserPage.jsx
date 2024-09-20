import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"
import { useParams } from "react-router-dom";
import useShowToast from '../hooks/useShowToast';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username }= useParams();
  const showToast = useShowToast();

  useEffect(() => {
    const getUser = async() => {
      try {
        const res = await fetch(`/api/users/profile/${username}`)
        const data = await res.json()
        if(data.error){
          showToast("Error", data.error, "error")
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error, "error")
      }
    };

    getUser();
  },[username, showToast]);

  if(!user) return null;

  return (
  <>
    <UserHeader user={user} />
    <UserPost likes={22563} replies={895} postImg="/post1.png" postTitle="Lets talk about threads."/>
    <UserPost likes={8124} replies={705} postImg="/post2.jpg" postTitle="Nice place."/>
    <UserPost likes={1580} replies={896} postImg="/post3.png" postTitle="I love this guy."/>
    <UserPost likes={2574} replies={481} postTitle="This is my first thread."/>
  </>
  );
};

export default UserPage;