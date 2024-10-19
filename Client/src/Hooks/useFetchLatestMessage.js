import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Context/ChatContext";
import { baseUrl,getRequest} from "../Utils/services";


export const useFetchLatestMessage = (chat) =>{
          const {newMessage, notifications} = useContext(ChatContext);
          const [latestMessage, setLatestMessage] = useState(null);
            
          useEffect(()=>{
              const getMessages = async ()=>{
                  
                 const response = await getRequest(`${baseUrl}/message/${chat?._id}`);

                 if(response?.error){
                    return console.log("Error getting messages...", error)
                 }
                  
                 const latestMessage = response[response?.length - 1];

                 setLatestMessage(latestMessage);

              };
          
          getMessages();
          }, [newMessage, notifications]);

          return {latestMessage};
                   
};