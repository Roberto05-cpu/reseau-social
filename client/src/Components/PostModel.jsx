import React, { useState } from "react";
import defautuser from "../assets/defautuser.png";
import {
  MoreHorizontal,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
} from "lucide-react";
import axios from "axios";
import { useContext } from "react";
import { ReseauContext } from "../Context/ReseauContext";

const PostModel = ({ post, onUpdate, onDelete }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");

  const token = sessionStorage.getItem("token");
  const sessionUser = JSON.parse(sessionStorage.getItem("user")) || null;
  const currentUserId = sessionUser?._id || sessionUser?.id || null;

  const [likeCount, setLikeCount] = useState(
    post.likers ? post.likers.length : post.likes ? post.likes.length : 0,
  );
  const [isLiked, setIsLiked] = useState(() => {
    if (!currentUserId) return false;
    const likers = post.likers || [];
    return likers.some((l) =>
      typeof l === "string"
        ? l === currentUserId
        : l._id
          ? l._id.toString() === currentUserId.toString()
          : false,
    );
  });

  const [showOptions, setShowOptions] = useState(false);
  const [message, setMessage] = useState(post.message || "");
  const [isClickToEdit, setIsClickToEdit] = useState(false);
  const isOwner =
    currentUserId &&
    post.posterId &&
    post.posterId._id &&
    post.posterId._id.toString() === currentUserId.toString();

  const { getUnreadNotifCount } = useContext(ReseauContext);

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/posts/comment-post/${post._id}`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const added = res.data.comment;
      
      if (added) setComments((prev) => [...prev, added]);
      getUnreadNotifCount();
      setNewComment("");
    } catch (err) {
      console.error("Erreur lors de l ajout du commentaire", err);
      alert("Impossible d'ajouter le commentaire");
    }
  };

  const handleAddLike = async () => {
    if (!currentUserId) return alert("Connecte toi pour liker");
    try {
      await axios.patch(
        `http://localhost:5000/api/posts/like/${post._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
      getUnreadNotifCount();
    } catch (error) {
      console.error("Erreur lors de l ajout du like", error);
      alert("Impossible d'ajouter le like");
    }
  };

  const handleRemoveLike = async () => {
    if (!currentUserId) return;
    try {
      await axios.patch(
        `http://localhost:5000/api/posts/unlike/${post._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setIsLiked(false);
      setLikeCount((prev) => Math.max(prev - 1, 0));
    } catch (error) {
      console.error("Erreur lors du retrait du like", error);
      alert("Impossible de retirer le like");
    }
  };

  const permitEdit = () => {
    if (!isOwner) {
      alert("Tu n'es pas autorisé à modifier ce post");
      return;
    }
    setShowOptions(false);
    setIsClickToEdit(true);
  };

  const updatePost = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/posts/${post._id}`,
        { message },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      onUpdate(res.data.post); // 🔥 met à jour le parent
      alert("Post mis à jour avec succès !");
      setIsClickToEdit(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du post", error);
      alert("Impossible de mettre à jour le post");
    }
  };

  const deletePost = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Post supprimé avec succès !");
      onDelete(post._id);
    } catch (error) {
      console.error("Erreur lors de la suppression du post", error);
      alert("Impossible de supprimer le post");
    }
  };

  return (
    <div className="bg-white w-[400px] max-h-screen overflow-y-auto rounded-[10px] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={`${post.posterId?.avatar ? `http://localhost:5000${post.posterId.avatar}` : defautuser}`}
            className="w-16 h-16 rounded-[100%]"
            alt=""
          />
          <div>
            <p className="font-bold">{post.posterId?.name || "Utilisateur"}</p>
            <span>Dubai</span>
          </div>
        </div>
        <div className="relative">
          {isOwner && (
            <MoreHorizontal
              className="cursor-pointer"
              onClick={() => setShowOptions((prev) => !prev)}
            />
          )}
          {showOptions && (
            <div className="absolute right-0 top-full mt-2 w-36 bg-white border rounded-lg shadow-lg z-50">
              <button
                onClick={permitEdit}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Modifier
              </button>
              <button
                onClick={deletePost}
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
              >
                Supprimer
              </button>
            </div>
          )}
          {isClickToEdit && (
            <div className="absolute right-0 top-full mt-2 w-36 bg-white border rounded-lg shadow-lg z-50">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button
                onClick={updatePost}
                className="block w-full text-left px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
              >
                Sauvegarder
              </button>
            </div>
          )}
        </div>
      </div>
      {post.message && <p className="p-2 font-bold">{post.message}</p>}
      {post.picture && (
        <img
          src={`http://localhost:5000${post.picture}`}
          className="mx-auto w-[390px] h-[390px] object-cover rounded-[5px]"
          alt=""
        />
      )}
      {post.video && (
        <video
          src={`http://localhost:5000${post.video}`}
          className="mx-auto w-[390px] h-[390px] object-cover rounded-[5px]"
          controls
          autoPlay
          loop
          muted
        />
      )}
      <div className="mt-5 flex justify-between items-center">
        <div className="flex items-center gap-5">
          <button
            onClick={isLiked ? handleRemoveLike : handleAddLike}
            className={`flex items-center ${isLiked ? "text-red-500 fill-red-500" : ""}`}
          >
            <Heart />
          </button>
          <button onClick={toggleComments} className="flex items-center">
            <span className="relative left-4">
              {post.comments?.length || 0}
            </span>
            <MessageCircle />
          </button>
          <Send />
        </div>
        <Bookmark className="mr-5" />
      </div>

      <div className="mt-2">
        <p>
          {likeCount} {likeCount === 1 || likeCount === 0 ? "like" : "likes"}
        </p>
      </div>

      {showComments && (
        <div className="mt-3">
          <div className="max-h-40 overflow-y-auto space-y-2 mb-2">
            {comments.length === 0 && (
              <p className="opacity-60">Pas de commentaires</p>
            )}
            {comments.map((c, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <img
                  src={`${c.commenterId?.avatar ? `http://localhost:5000${c.commenterId.avatar}` : defautuser}`}
                  className="w-8 h-8 rounded-full"
                  alt=""
                />
                <div>
                  <p className="font-bold text-sm">{c.commenterId.name}</p>
                  <p className="text-sm">{c.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={handleAddComment}
              className="px-3 py-2 bg-blue-500 text-white rounded"
            >
              Envoyer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostModel;
