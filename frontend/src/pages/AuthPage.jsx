import { useRecoilValue } from "recoil";
import authScreenAtom from "../atoms/authAtom.js";
import LoginCard from "../components/LoginCard.jsx";
import SignupCard from "../components/SignupCard.jsx";

const AuthPage = () => {
    const authScreenState = useRecoilValue(authScreenAtom);
    //const [value, setValue] = useState("login");
  return <>{authScreenState === "login" ? <LoginCard /> : <SignupCard />}</>  // pukud jsme na login zobrazi se LoginCard else zobrazi se Signup card
}

export default AuthPage;