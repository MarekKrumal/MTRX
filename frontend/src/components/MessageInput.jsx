import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { IoSendSharp } from "react-icons/io5";
import useShowToast from '../hooks/useShowToast';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { conversationsAtom, selectedConversationAtom } from '../atoms/messagesAtom';
import { useState } from 'react';

const MessageInput = ({ setMessages }) => {
    const [messageText, setMessageText] = useState("");
    const showToast = useShowToast();
    const selectedConversation = useRecoilValue(selectedConversationAtom);
    const setConversations = useSetRecoilState(conversationsAtom);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!messageText) return;

        try {
            const res = await fetch("/api/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: messageText,
                    recepientId: selectedConversation.userId,
                }),
            });
            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            setMessageText("");
            setMessages((messages) => [...messages, data]);

            // Update conversations with the last message
            setConversations((prevConvs) => {
                const updatedConversations = prevConvs.map((conversation) => {
                    if (conversation._id === selectedConversation._id) {
                        return {
                            ...conversation,
                            lastMessage: {
                                text: messageText,
                                sender: data.sender,
                            },
                        };
                    }
                    return conversation;
                });
                return updatedConversations;
            });
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    return (
        <form onSubmit={handleSendMessage}>
            <InputGroup>
                <Input
                    w={"full"}
                    placeholder='Type a message'
                    onChange={(e) => setMessageText(e.target.value)}
                    value={messageText}
                />
                <InputRightElement onClick={handleSendMessage} cursor={"pointer"}>
                    <IoSendSharp />
                </InputRightElement>
            </InputGroup>
        </form>
    );
};

export default MessageInput;
