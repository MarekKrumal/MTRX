import { atom } from "recoil";

const userAtom = atom({
	key: "userAtom",
	default: JSON.parse(localStorage.getItem("user-threads")), //ziskavame udaje o nasem Userovi je to budto "null" nebo z localstorage dostame naseho user
});

export default userAtom;