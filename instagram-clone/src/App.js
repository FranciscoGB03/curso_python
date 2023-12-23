import { useEffect, useState } from "react";
import "./App.css";
import Post from "./components/post/Post";
import { BASE_URL } from "./utils/Constantes";
import { Button } from "@mui/material";
import Login from "./components/modals/Login";
//import { getModalStyle } from "./components/modals/estilos";
import SignUp from "./components/modals/SignUp";
import ImageUpload from "./components/uploadImage/ImageUpload";

/**
 * Componente principal
 * @returns contenedor principal
 * @author Francisco Gonzalez Bobadilla
 */
function App() {
  /**hooks */
  const [posts, setPosts] = useState([]);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  //const [modalStyle, setModalStyle] = useState(getModalStyle);
  /** hooks para formulario */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  /**hooks para token */
  const [authToken, setAuthToken] = useState(null);
  const [authTokenType, setAuthTokenType] = useState(null);
  const [userId, setUserId] = useState("");
  /** para almacenar en localstorage */
  useEffect(() => {
    if (authToken !== null) window.localStorage.setItem("authToken", authToken);
    if (authTokenType !== null)
      window.localStorage.setItem("authTokenType", authTokenType);
    if (username !== "" && userId !== "")
      window.localStorage.setItem("username", username);
    if (userId !== "") window.localStorage.setItem("userId", userId);
  }, [authToken, authTokenType, userId, username]);
  /**realiza una operacion al cargar el componente */
  useEffect(() => {
    /**petición al Api para obtener todos los post */
    fetch(BASE_URL + "post/All")
      .then((response) => {
        const json = response.json();
        console.log(json);
        if (response.ok) {
          return json;
        }
        throw response;
      })
      .then((data) => {
        const result = data.sort((a, b) => {
          const t_a = a.timestamp.split(/[-T:]/);
          const t_b = b.timestamp.split(/[-T:]/);
          const d_a = new Date(
            Date.UTC(t_a[0], t_a[1] - 1, t_a[2], t_a[3], t_a[4], t_a[5])
          );
          const d_b = new Date(
            Date.UTC(t_b[0], t_b[1] - 1, t_b[2], t_b[3], t_b[4], t_b[5])
          );
          return d_b - d_a;
        });
        return result;
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }, []);
  /** useEffect*/
  useEffect(() => {
    setAuthToken(window.localStorage.getItem("authToken"));
    setAuthTokenType(window.localStorage.getItem("authTokenType"));
    setUsername(
      window.localStorage.getItem("username")
        ? window.localStorage.getItem("username")
        : ""
    );
    setUserId(window.localStorage.getItem("userId"));
  }, []);
  /**functions */
  const signIn = (event) => {
    event?.preventDefault();
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    /**request a back */
    fetch(BASE_URL + "login", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log(data);
        setAuthToken(data.access_token);
        setAuthTokenType(data.token_type);
        setUserId(data.user_id);
        setUsername(data.username);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    setOpenSignIn(false);
  };
  /**singUp */
  const signUp = (event) => {
    event?.preventDefault();

    const json_string = JSON.stringify({
      username: username,
      email: email,
      password: password,
    });

    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json_string,
    };

    fetch(BASE_URL + "user", requestOption)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        signIn();
      })
      .catch((error) => {
        console.log(error);
      });

    setOpenSignUp(false);
  };
  /**logout */
  const signOut = (event) => {
    setAuthToken(null);
    setAuthTokenType(null);
    setUserId("");
    setUsername("");
    setPassword("");
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("authTokenType");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("userId");
  };
  /**render */
  return (
    <div className="app">
      <Login
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        signIn={signIn}
        openSignIn={openSignIn}
        setOpenSignIn={setOpenSignIn}
      />
      <SignUp
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        email={email}
        setEmail={setEmail}
        openSignUp={openSignUp}
        setOpenSignUp={setOpenSignUp}
        signUp={signUp}
      />
      <div className="app_header">
        <img
          className="app_headerImage"
          src="https://1000logos.net/wp-content/uploads/2017/02/ig-logo-768x256.png"
          alt="Instagram"
        />
        {authToken ? (
          <Button onClick={() => signOut()}>Logout</Button>
        ) : (
          <div>
            <Button onClick={() => setOpenSignIn(true)}>Login</Button>
            <Button onClick={() => setOpenSignUp(true)}>SignUp</Button>
          </div>
        )}
      </div>

      <div className="app_posts">
        {(posts || []).map((post, idx) => (
          <Post
            key={idx}
            post={post}
            authToken={authToken}
            authTokenType={authTokenType}
            username={username}
          />
        ))}
      </div>

      {authToken && (
        <ImageUpload
          authToken={authToken}
          authTokenType={authTokenType}
          userId={userId}
        />
      )}
    </div>
  );
}

export default App;
