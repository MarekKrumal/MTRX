import { atom } from "recoil";   //vytvorili jsme atom kazdy Atom je state a muzeme jej pouzit kdekoli - musime obalit nasi aplikaci v main.jsx do <RecoilRoot>

const authScreenAtom = atom({
	key: "authScreenAtom",
	default: "login",              //defautni stranka autentifikacniho screenu (kdyz refresheneme Signup vrati nas to na login)
});

export default authScreenAtom;