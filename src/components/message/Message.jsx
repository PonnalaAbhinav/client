import "./message.css"
import {format} from "timeago.js"

export default function Message({message,own}) {
  return (
    <div className={own ? "message own" :"message"}>
        <div className="messageTop">
            <img className="messageImg" src="https://cdn.fstoppers.com/styles/full/s3/media/2017/09/10/1_use_psychology_to_take_better_photographs.jpeg" alt=""></img>
            <p className="messageText">{message.text}</p>
        </div>
        <div className="messageBottom">
            {format(message.createdAt)}
        </div>
    </div>
  )
}
