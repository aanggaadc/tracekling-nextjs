import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Signup.module.css";
import Logo from "../public/trackeling.png";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Formik, Form } from "formik";
import Axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../config/url";
import Head from "next/head";
import AuthRoutes from "../components/routes/AuthRoutes";

const renderTooltip = (props) => (
	<Tooltip id="button-tooltip" {...props}>
		Back to home
	</Tooltip>
);

function Signup() {
	const router = useRouter();
	return (
		<>
			<Head>
				<title>Signup to Start Your Journey!</title>
				<meta name="keywords" content="travel travelling" />
			</Head>

			<AuthRoutes>
				<div id={styles.background_signup}>
					<div className={styles.container_signup}>
						<div className={styles.left_signup}>
							<div className={styles.logo}>
								<Image src={Logo} alt="logo" width="480px" height="175px" className="img-fluid" />
							</div>
							<div className={styles.text}>
								<p>
									{" "}
									Already have an account? <Link href="/login"> Login </Link>{" "}
								</p>

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
						</div>

						<div className={styles.right_signup}>
							<div className={`${styles.title} fw-bold`}>Sign Up</div>
							<Formik
								initialValues={{
									username: "",
									email: "",
									age: "",
									phone_number: "",
									password1: "",
									password2: "",
								}}
								onSubmit={(values) => {
									console.log(values);
									Axios.post(`${API_URL}/signup`, values)
										.then((response) => {
											console.log(response);
											setTimeout(() => {
												toast.success("You Are Successfully Registered");
											}, 100);
											router.push("/login");
										})
										.catch((error) => {
											if (error.response) {
												toast.error(error.response.data.message);
											} else {
												toast.error("Cannot Connect to Server");
											}
										});
								}}
							>
								{({ handleSubmit, handleChange, setFieldValue }) => (
									<Form id={styles.form_signup}>
										<div className="form-group">
											<input
												type="text"
												className="form-control"
												id="username"
												name="username"
												placeholder="Username"
												onChange={(e) => {
													setFieldValue("username", e.target.value);
												}}
												required
											/>
										</div>
										<div className="form-group mt-3">
											<input
												type="email"
												className="form-control"
												id="emaiil"
												name="email"
												placeholder="Email"
												onChange={handleChange}
												required
											/>
										</div>
										<div className="form-group mt-3">
											<input
												type="text"
												className="form-control"
												id="phoneNumber"
												name="phone_number"
												placeholder="Phone number"
												onChange={handleChange}
												required
											/>
										</div>
										<div className="form-group mt-3">
											<input
												type="text"
												className="form-control"
												id="age"
												name="age"
												placeholder="Age"
												onChange={handleChange}
												required
											/>
										</div>
										<div className="form-group mt-3">
											<input
												type="password"
												className="form-control"
												id="password1"
												name="password1"
												placeholder="Password"
												onChange={handleChange}
												required
											/>
										</div>
										<div className="form-group mt-3">
											<input
												type="password"
												className="form-control"
												id="password2"
												name="password2"
												placeholder="Confirm Password"
												onChange={handleChange}
												required
											/>
										</div>

										<div className={styles.btn_signup}>
											<button onClick={handleSubmit} type="submit" className="btn btn-primary mt-3">
												Signup
											</button>
										</div>
									</Form>
								)}
							</Formik>
						</div>
					</div>
				</div>
			</AuthRoutes>
		</>
	);
}

export default Signup;
