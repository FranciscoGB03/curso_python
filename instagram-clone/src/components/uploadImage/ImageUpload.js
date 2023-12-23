import { Button } from "@mui/material";
import { useState } from "react";
import "./ImageUpload.css";
import { BASE_URL } from "../../utils/Constantes";

const ImageUpload = ({ authToken, authTokenType, userId }) => {
  /**hooks */
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  /**functions */
  /** cargar archivo  */
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  /** guardar publicacion */
  const handleUpload = (e) => {
    e?.preventDefault();
    /** data */
    const formData = new FormData();
    formData.append("image", image);
    /**request options */
    const requestOptions = {
      method: "POST",
      headers: new Headers({
        Authorization: authTokenType + " " + authToken,
      }),
      body: formData,
    };
    /** conexion con el back para guardado de la publicacion */
    fetch(BASE_URL + "post/image", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setImage(null);
        /**create the post here */
        createPost(data.filename);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setCaption("");
        setImage("");
        document.getElementById("fileInput").value = null;
      });
  };
  /**post creation */
  const createPost=(imageUrl)=>{
    const json_string=JSON.stringify({
        'image_url':imageUrl,
        'image_url_type':'relative',
        'caption':caption,
        'creator_id':userId
    })
    /**request options */
    const requestOptions = {
      method: "POST",
      headers: new Headers({
        'Authorization': authTokenType + " " + authToken,
        'Content-Type':'application/json'
      }),
      body: json_string
    };
    /** conexion con el back para guardado de la publicacion */
    fetch(BASE_URL + "post", requestOptions)
    .then(response=>{
        if(response.ok){
            return response;
        }
        throw response;
    })
    .then(data=>{
        window.location.reload();
        window.scrollTo(0,0);
    })
    .catch(error=>{
        console.log(error);
    })
  }
  /**render */
  return (
    <div className="imageupload">
      <input
        type="text"
        placeholder="Enter a caption"
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      />
      <input type="file" id="fileInput" onChange={handleChange} />
      <Button className="imageupload_button" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
};

export default ImageUpload;
