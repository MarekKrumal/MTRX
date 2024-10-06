import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import io from "socket.io-client";
import userAtom from "../atoms/userAtom";

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const user = useRecoilValue(userAtom);

    useEffect(() => {
        const socket = io("/", {
            query: {
                userId: user?._id,
            },
        });

        setSocket(socket);

        // Emit online status
        socket.emit("userOnline", user?._id);

        socket.on("getOnlineUsers", (users) => {
            setOnlineUsers(users);
        });

        return () => {
            socket.emit("userOffline", user?._id);
            socket.disconnect();
        };
    }, [user?._id]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
