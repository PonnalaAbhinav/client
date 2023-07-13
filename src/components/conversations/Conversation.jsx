import { useEffect, useState } from "react"
import "./conversation.css"
import axios from "axios";
import { CleaningServices } from "@mui/icons-material";

export default function Conversation({conversation,currentUser}) {
  const [user,setUser]=useState(null);
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(()=>{
    const friendId=conversation.members.find((m)=>m!== currentUser._id)

    const getUser=async ()=>{
      try{
        const res=await axios("/users?userId="+friendId);
        setUser(res.data);
      }catch(err){
        console.log(err);
      }
    }
    getUser();
  },[currentUser,conversation])

  return (
    <div className="coversation">
      {console.log("user")}
      {console.log(user)}
      <img className="conversationImg" src={user?.profilePicture ? PF+user.profilePicture :PF+"person/noAvatar.png" } alt=""></img>
      <span className="conversationName"> {user?.username }</span>
    </div>
  )
}
