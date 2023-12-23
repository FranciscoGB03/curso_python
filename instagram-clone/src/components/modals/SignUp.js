import { Button, Input, Modal } from "@mui/material";
import { useStyles } from "./estilos";

const SignUp = ({username,setUsername,password,setPassword, email,setEmail,openSignUp,setOpenSignUp,signUp}) => {
    /**llamado de estilos */
  const { cx, classes } = useStyles();

  /**render */
  return (
    <Modal
      open={openSignUp}
      className={cx(classes.root)}
      onClose={() => setOpenSignUp(false)}>
      <div className={cx(classes.body, "registro")}>
        <form className="app_signin">
          <center>
            <img
              className="app_headerImage"
              src="https://1000logos.net/wp-content/uploads/2017/02/ig-logo-768x256.png"
              alt="Instagram"
            />
            <div className="app_signin">
              <Input
                placeholder="username"
                type="text"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder="email"
                type="email"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="password"
                type="password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signUp}>
                Sing up
              </Button>
            </div>
          </center>
        </form>
      </div>
    </Modal>
  );
};

export default SignUp;
