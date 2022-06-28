import Link from "next/link";
import styles from "./FormBiodata.module.css";
import { Formik } from "formik";
import { FaUpload } from "react-icons/fa";
import Axios from "axios";
import { API_URL } from "../../config/url";
import { toast } from "react-toastify";

function FormBiodata({ setFile, userProfile, getUserProfile, updateReduxState }) {
	return (
		<div className={styles.edit_biodata}>
			<h1>EDIT BIODATA</h1>
			<Formik
				initialValues={{
					age: userProfile.age,
					sex: userProfile.sex,
					location: userProfile.location,
					interest: userProfile.interest,
					phone_number: userProfile.phone_number,
				}}
				enableReinitialize={true}
				onSubmit={(values) => {
					if (
						values.phone_number === "" ||
						values.age === "" ||
						values.location === "" ||
						values.sex === "" ||
						values.interest === ""
					) {
						toast.error("Please Input All Data!");
					} else {
						const formData = new FormData();
						formData.append("age", values.age);
						formData.append("sex", values.sex);
						formData.append("location", values.location);
						formData.append("interest", values.interest);
						formData.append("phone_number", values.phone_number);
						formData.append("avatar", values.avatar);

						Axios.put(`${API_URL}/user/profile/edit`, formData)
							.then((response) => {
								console.log("BERHASIL BIODATA", response);
								toast.success(response.data.message);
								getUserProfile();
								updateReduxState();
							})
							.catch((error) => {
								if (error.response) {
									// console.log(error.response);
									toast.error(error.response.data.message);
								} else if (error.response.data.status === 413) {
									toast.error("Please upload image below 1MB");
								} else {
									toast.error("Cannot Connect to Server");
								}
							});
					}
				}}
			>
				{({ values, handleSubmit, handleChange, setFieldValue }) => (
					<form action="" id={styles.form_editBiodata}>
						<div className={styles.form_row}>
							{/* <div className="form-fullname">
								<label for="fullname" class="form-label">
									Full Name
								</label>
								<input type="text" class="form-control" id="fullname" placeholder="" />
							</div> */}
							<div className={styles.form_phone}>
								<label htmlFor="phone" className="form-label">
									Phone
								</label>
								<input
									type="number"
									className="form-control"
									id="phone"
									placeholder=""
									value={values.phone_number}
									name="phone_number"
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className={styles.form_row}>
							<div className="form-age">
								<label htmlFor="age" className="form-label">
									Age
								</label>
								<input
									type="number"
									className="form-control"
									id="age"
									placeholder=""
									value={values.age}
									name="age"
									onChange={handleChange}
								/>
							</div>
							<div className="form-location">
								<label htmlFor="location" className="form-label">
									Location
								</label>
								<input
									type="text"
									className="form-control"
									id="location"
									placeholder=""
									value={values.location}
									name="location"
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className={styles.form_row}>
							<div className={styles.form_sex}>
								<label htmlFor="specificSex" className="visually-hidden">
									Sex
								</label>
								<select id="specificSex" value={values.sex} name="sex" onChange={handleChange}>
									<option value="">- Pick Your Sex -</option>
									<option value="Female">Female</option>
									<option value="Male">Male</option>
								</select>
							</div>
						</div>
						<div className={styles.form_row}>
							<div className={styles.form_interest}>
								<label htmlFor="specificInterest" className="visually-hidden">
									Interest
								</label>
								<select
									id="specificInterest"
									value={values.interest}
									name="interest"
									onChange={handleChange}
								>
									<option value="">- Interest -</option>
									<option value="Food">Food</option>
									<option value="Movie">Movie</option>
									<option value="Music">Music</option>
									<option value="Photography">Photography</option>
									<option value="Sport">Sport</option>
								</select>
							</div>
						</div>
						<div className={styles.form_row}>
							<div className={styles.form_avatar}>
								<label htmlFor="file">
									<FaUpload /> Upload Avatar
								</label>
								<input
									type="file"
									id="file"
									accept="image/*"
									style={{ display: "none" }}
									name="avatar"
									onChange={(e) => {
										setFieldValue("avatar", e.currentTarget.files[0]);
										setFile(e.target.files[0]);
									}}
								/>
							</div>
						</div>
						<div className={styles.btn_submitBiodata}>
							<button onClick={handleSubmit} type="submit">
								Submit
							</button>
						</div>
					</form>
				)}
			</Formik>
			<div className={styles.change_formToAccount}>
				Change to <Link href={`/user/account`}>Edit Account</Link>
			</div>
		</div>
	);
}

export default FormBiodata;
