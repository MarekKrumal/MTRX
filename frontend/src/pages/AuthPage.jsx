import { useRecoilValue } from "recoil";
import authScreenAtom from "../atoms/authAtom.js";
import LoginCard from "../components/LoginCard.jsx";
import SignupCard from "../components/SignupCard.jsx";

const AuthPage = () => {
    const authScreenState = useRecoilValue(authScreenAtom);
    //const [value, setValue] = useState("login");
  return <>{authScreenState === "login" ? <LoginCard /> : <SignupCard />}</>
  
}

export default AuthPage;