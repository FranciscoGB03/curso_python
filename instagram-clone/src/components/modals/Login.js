import { Button, Modal, Input } from "@mui/material";
import { useStyles } from "./estilos";
/**
 *  componente para login
 * 
 */
const Login = ({
    username,
    setUsername,
    password,
    setPassword,
    signIn,
    openSignIn,
    setOpenSignIn,
}) => {
    const { cx, classes } = useStyles();

    return (
        <Modal
            open={openSignIn}
            className={cx(classes.root)}
            onClose={() => setOpenSignIn(false)}
        >
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
                                placeholder="password"
                                type="password"
                                value={password || ""}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type="submit" onClick={signIn}>
                                Login
                            </Button>
                        </div>
                    </center>
                </form>
            </div>
        </Modal>
    );
};

export default Login;
