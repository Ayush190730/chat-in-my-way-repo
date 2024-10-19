import { useContext, useState } from "react";
import { ChatContext } from "../../Context/ChatContext";
import { AuthContext } from "../../Context/AuthContext";
import { unreadNotificationsFunc } from "../../Utils/unreadNotifications";
import moment from 'moment';



const Notifications = () => {

   const [isOpen, setIsOpen] = useState(false);
   const { user } = useContext(AuthContext)
   const { notifications, userChats, allUsers, markAllNotificationsAsRead, markNotificationAsRead  } = useContext(ChatContext)

   const unreadNotifications = unreadNotificationsFunc(notifications);
   const modifiedNotifications = notifications.map((n) => {
      const sender = allUsers.find(user => user?._id == n.senderId)

      return ({
         ...n,
         senderName: sender?.name
      })
   })

   console.log("un", unreadNotifications);
   console.log("mn", modifiedNotifications);

   return (

      <div className="notifications">
         <div className="notifications-icon" onClick={() => setIsOpen(!isOpen)}>

            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chat-right-text-fill" viewBox="0 0 16 16">
               <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353zM3.5 3h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1m0 2.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1m0 2.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1" />
            </svg>

            {unreadNotifications?.length === 0 ? null : (
               <span className="notification-count">
                  <span>
                     {unreadNotifications?.length}
                  </span>
               </span>
            )}
         </div>

         {isOpen ? (
            <div className="notifications-box">
               <div className="notifications-header">
                  <h3>Notifications</h3>
                  <div className="mark-as-read" onClick={() => markAllNotificationsAsRead(notifications)}>Mark All As Read</div>
               </div>
               {modifiedNotifications?.length === 0 ? <span className="notification">No Notification Yet.... </span> : null}
               {modifiedNotifications && modifiedNotifications.map((n, index) => {
                  return (<div key={index} className={n.isRead ? 'notification' : 'notification not-read'}
                            onClick={()=>{
                              markNotificationAsRead(n, userChats, user,notifications)
                              setIsOpen(false)
                            }}
                  >
                     <span>{`${n.senderName} sent you a new Message `}</span>
                     <span className="notification-time" >{moment(n.date).calendar()}</span>
                  </div>)
               })}

            </div>) : null}

      </div>

   )
}

export default Notifications;