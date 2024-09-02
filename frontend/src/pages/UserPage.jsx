import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"

const UserPage = () => {
  return (
  <>
    <UserHeader />
    <UserPost likes={22563} replies={895} postImg="/post1.png" postTitle="Lets talk about threads."/>
    <UserPost likes={8124} replies={705} postImg="/post2.jpg" postTitle="Nice place."/>
    <UserPost likes={1580} replies={896} postImg="/post3.png" postTitle="I love this guy."/>
    <UserPost likes={2574} replies={481} postTitle="This is my first thread."/>
  </>
  );
};

export default UserPage;