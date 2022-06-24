import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router'
import styles from '../styles/Login.module.css'
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";


import Logo from "../public/trackeling.png";
import { Formik } from "formik";
import Axios from "axios";
import { API_URL } from "../config/url";
import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { bindActionCreators } from "redux";
// import { actionCreators } from "../../store/index";

const renderTooltip = (props) => (
	<Tooltip id="button-tooltip" {...props}>
		Back to home
	</Tooltip>
);

function Login() {
    const router = useRouter()
	// const dispatch = useDispatch();
	// const { fillUser } = bindActionCreators(actionCreators, dispatch);

	return (
        <>
            <Head>
                <title>Trackeling - Login</title>
                <meta name="keywords" content="travel travelling" />
            </Head>

            <div id={styles.background_login} className={styles.content_login}>
                <div className={styles.head_login}>
                    <div className={styles.logo}>
                        <Image src={Logo} alt="logo" width="325px" height="115px" />
                    </div>
                    <div className={`${styles.title} fw-bold`}>Login</div>

                    <Link href="/">
                        <div>
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}
                            >
                                <Button variant="link">
                                    <BsFillArrowLeftCircleFill />
                                </Button>
                            </OverlayTrigger>
                        </div>                        
                    </Link>
                </div>

                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    onSubmit={(values) => {
                        Axios.post(`${API_URL}/login`, values)
                            .then((response) => {
                                // fillUser(response.data.data);
                                localStorage.setItem("authKey", JSON.stringify(response.data.data));
                                router.push("/");
                                toast.success("Welcome to Our Site!");
                            })
                            .catch((error) => {
                                if (error.response) {
                                    toast.error(error.response.data.message);
                                } else {
                                    toast.error("Can't Connect to Our Server");
                                }
                                console.log(error);
                            });
                    }}
                >
                    {({ handleSubmit, handleChange }) => (
                        <form id={styles.form_login}>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleChange}
                                />
                                {/* <small id="emailHelp" className="text-danger form-text">
                    {emailError}
                </small> */}
                            </div>

                            <div className="form-group mt-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                />
                                {/* <small id="passworderror" className="text-danger form-text"></small> */}
                            </div>

                            <div className={styles.btn_login}>
                                <button onClick={handleSubmit} type="submit" className="btn btn-primary mt-3">
                                    Login
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>

                <div className={styles.login_text}>
                    <p>
                        No Account? <Link href="/signup">Signup</Link>
                    </p>
                    <p>
                        Admin? <Link href="/login-admin">Login Here!</Link>
                    </p>
                </div>
            </div>        
        </>		
	);
}

export default Login;
