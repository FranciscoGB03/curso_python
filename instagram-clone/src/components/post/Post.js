import { useEffect, useState } from "react";
import "./Post.css";
import { BASE_URL } from "../../utils/Constantes";
import { Avatar, Button } from "@mui/material";

/**
 * Componente que muestra una imagen
 * @param {*} param0 arreglo que contiene la imagen
 * @returns retorna la imagen que contiene un post
 */
function Post({ post, authToken, authTokenType, username }) {
  /**hooks */
  const [imageUrl, setImageUrl] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  /**useEffect */
  useEffect(() => {
    if (post.image_url_type === "absolute") {
      setImageUrl(post.image_url);
    } else {
      setImageUrl(BASE_URL + post.image_url);
    }
    setComments(post.comments);
  }, [post]);

  /**functions */
  const handleDelete = (event) => {
    event?.preventDefault();
    /**request options */
    const requestOptions = {
      method: "GET",
      headers: new Headers({
        Authorization: authTokenType + " " + authToken,
      }),
    };

    fetch(BASE_URL + "post/delete/" + post.id, requestOptions)
      .then((response) => {
        if (response.ok) {
          window.location.reload();
        }
        throw response;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /**function to add a new comment */
  const postComment = (event) => {
    event?.preventDefault();

    const json_string = JSON.stringify({
      username: username,
      text: newComment,
      post_id: post.id,
    });

    /**request options */
    const requestOptions = {
      method: "POST",
      headers: new Headers({
        Authorization: authTokenType + " " + authToken,
        "Content-Type": "application/json",
      }),
      body: json_string,
    };
    /** fetch */
    fetch(BASE_URL + "comment", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        fetchComments();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setNewComment("");
      });
  };
  /**update comments */
  const fetchComments = () => {
    fetch(BASE_URL + "comment/all/" + post.id)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /**render */
  return (
    <div className="post">
      <div className="post_header">
        <Avatar alt="imagen" src="" />
        <div className="post_headerInfo">
          <h3>{post.user.username}</h3>
          <Button className="post_delete" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
      <img className="post_image" src={imageUrl} alt="prueba" />

      <h4 className="post_text">{post.caption}</h4>
      <div className="post_comments">
        {(comments || []).map((comment, idxComment) => (
          <p key={idxComment}>
            <strong>{comment.username}:</strong>
            {comment.text}
          </p>
        ))}
      </div>

      {authToken && (
        <form className="post_commentbox">
          <input
            className="post_input"
            type="text"
            placeholder="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="post_button"
            type="submit"
            disabled={!newComment}
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
