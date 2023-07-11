import "./post.css"
import { MoreVert } from "@mui/icons-material"
import { useContext, useEffect, useState } from "react";
import axios from "axios"
import { format } from "timeago.js"
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser}=useContext(AuthContext)

    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id.$oid,post.likes])

    useEffect(() => {
        const fetchUser = async () => {
          const res = await axios.get(`/users?userId=${post.userId}`);
          setUser(res.data);
        };
        fetchUser();
      }, [post.userId]);

    const likeHandler = () => {
        try{
            axios.put("/posts/"+post._id+"/like",{userId:currentUser._id.$oid})
        }catch(err){

        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            {console.log("photo+")}
                            {console.log(user)}
                            <img className="postProfileImg" src={user.profilePicture ? PF+user.profilePicture : PF + "person/noAvatar.png"} alt=""></img>
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter"></div>
                <span className="postText">{post?.desc}</span>
                <img className="postImg" src={PF + post.img} alt=""></img>
                <div className="postBottom">
                    <div className="postButtonLeft">
                        <img className="likeIcon" src={`${PF}like.png`} alt="" onClick={likeHandler}></img>
                        <img className="likeIcon" src={`${PF}heart.png`} alt="" onClick={likeHandler}></img>
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postButtonRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
