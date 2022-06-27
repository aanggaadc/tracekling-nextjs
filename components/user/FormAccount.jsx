import Link from 'next/link'
import styles from './FormAccount.module.css'
import { Formik } from "formik";
import Axios from "axios";
import { API_URL } from "../../config/url";
import { toast } from "react-toastify";

function FormAccount({ userProfile, getUserProfile, updateReduxState }) {
	return (
		<div className={styles.edit_account}>
			<h1>Edit Account</h1>
			<Formik
				initialValues={{
					username: userProfile.username,
					email: userProfile.email,
					password1: "",
					password2: "",
				}}
				enableReinitialize={true}
				onSubmit={(values, actions) => {
					console.log("VALUE", values);
					Axios.put(`${API_URL}/user/edit`, values)
						.then((response) => {
							console.log("BERHASIL", response);
							toast.success(response.data.message);
							getUserProfile()
							updateReduxState()
						})
						.catch((error) => {
							if (error.response) {
								toast.error(error.response.data.message);
							} else {
								toast.error("Cannot Connect to Server");
							}
						});
					actions.setFieldValue("password1", "");
					actions.setFieldValue("password2", "");
				}}
			>
				{({ values, handleChange, handleSubmit, setFieldValue }) => (
					<form action="" id={styles.form_editAccount}>
						<div className={styles.form_row}>
							<div className="form-username">
								<label htmlFor="username" className="form-label">
									Username
								</label>
								<input
									type="text"
									className="form-control"
									id="username"
									placeholder=""
									name="username"
									required
									value={values.username}
									onChange={handleChange}
								/>
							</div>
							<div className="form-email">
								<label htmlFor="email" className="form-label">
									Email
								</label>
								<input
									type="email"
									className="form-control"
									id="email"
									placeholder=""
									name="email"
									required
									value={values.email}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className={styles.form_row}>
							<div className="form-pwd">
								<label htmlFor="pwd" className="form-label">
									Password
								</label>
								<input
									type="password"
									className="form-control"
									id="pwd"
									placeholder=""
									name="password1"
									value={values.password1}
									required
									onChange={handleChange}
								/>
							</div>
							<div className="form-confirmPwd">
								<label htmlFor="confirmpwd" className="form-label">
									Confirm Password
								</label>
								<input
									type="password"
									className="form-control"
									id="confirmpwd"
									placeholder=""
									name="password2"
									value={values.password2}
									required
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className={styles.btn_submitAccount}>
							<button
								// onClick={(e) => {
								// 	e.preventDefault();
								// 	handleSubmit();
								// 	setFieldValue("password1", "");
								// 	setFieldValue("password2", "");
								// }}
								onClick={handleSubmit}
							>
								Submit
							</button>
						</div>
					</form>
				)}
			</Formik>
			<div className={styles.change_formToBiodata}>
				Change to{" "}
				<Link href="/user/biodata">
					Edit Biodata
				</Link>
			</div>
		</div>
	);
}

export default FormAccount;
