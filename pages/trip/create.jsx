import React, { useState } from "react";
import styles from "../../styles/CreateTrip.module.css";
import { Formik, Form } from "formik";
import Axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../config/url";
import { useRouter } from "next/router";
import { FaUpload } from "react-icons/fa";
import moment from "moment";
import Layout from "../../components/layout/Layout";
import Head from "next/head";
import PrivateRoutes from "../../components/routes/PrivateRoutes";

function CreateTrip() {
	const router = useRouter();
	const [image, setImage] = useState("");

	return (
		<>
			<Head>
				<title>Create Your Own Trip</title>
			</Head>
			<PrivateRoutes>
				<Layout>
					<div className={styles.tripform_background}>
						<div className={`container ${styles.tripform_container}`}>
							<div className={`${styles.tripform_title} text-center mt-3`}>
								<h2 className={styles.tripform_title_h2}>CREATE TRIP</h2>
							</div>

							<div className={styles.tripform}>
								<Formik
									initialValues={{
										trip_name: "",
										destination: "",
										start_date: "",
										end_date: "",
										max_member: "",
										description: "",
										image: "",
									}}
									onSubmit={(values) => {
										if (values.max_member < 2) {
											toast.error("Max member must be minimal 2");
											router.push("/trip/create");
										} else if (values.start_date > values.end_date) {
											toast.error("Please input the right date");
											router.push("/trip/create");
										} else {
											const formData = new FormData();
											formData.append("trip_name", values.trip_name);
											formData.append("destination", values.destination);
											formData.append("start_date", values.start_date);
											formData.append("end_date", values.end_date);
											formData.append("max_member", values.max_member);
											formData.append("description", values.description);
											formData.append("image", values.image);

											Axios.post(`${API_URL}/trip/add`, formData)
												.then((response) => {
													console.log(response);
													toast.success("Trip Successfully created!!");
													router.push("/");
												})
												.catch((error) => {
													if (error.response) {
														toast.error(error.response.data.message);
													} else {
														toast.error("Cannot Connect to Server");
													}
												});
										}
									}}
								>
									{({ handleSubmit, handleChange, setFieldValue }) => (
										<Form id={styles.form_trip}>
											<div className="form-group">
												<label htmlFor="tripname" className={styles.form_trip_label}>
													Trip Name
												</label>
												<input
													type="text"
													className={`form-control ${styles.form_trip_input}`}
													id="tripname"
													name="trip_name"
													onChange={handleChange}
													required
												/>
											</div>
											<div className="form-group mt-3">
												<label htmlFor="destination" className={styles.form_trip_label}>
													Destination
												</label>
												<input
													type="text"
													className={`form-control ${styles.form_trip_input}`}
													id="destination"
													name="destination"
													onChange={handleChange}
													required
												/>
											</div>
											<div className="form-group mt-3">
												<label htmlFor="startdate" className={styles.form_trip_label}>
													Start Date
												</label>
												<input
													type="date"
													className={`form-control ${styles.form_trip_input}`}
													id="startdate"
													name="start_date"
													placeholder="Start Date"
													onChange={handleChange}
													required
													min={moment().add(1, "days").format("YYYY-MM-DD")}
												/>
											</div>
											<div className="form-group mt-3">
												<label htmlFor="enddate" className={styles.form_trip_label}>
													End Date
												</label>
												<input
													type="date"
													className={`form-control ${styles.form_trip_input}`}
													id="enddate"
													name="end_date"
													placeholder="End Date"
													onChange={handleChange}
													required
													min={moment().add(1, "days").format("YYYY-MM-DD")}
												/>
											</div>
											<div className="form-group mt-3">
												<label htmlFor="maxmember" className={styles.form_trip_label}>
													Max Member
												</label>
												<input
													type="number"
													className={`form-control ${styles.form_trip_input}`}
													id="maxmember"
													name="max_member"
													onChange={handleChange}
													required
													min={2}
												/>
											</div>
											<div className="form-group mt-3">
												<input
													type="file"
													id="image"
													name="image"
													accept="image/*"
													style={{ position: "absolute", opacity: 0, cursor: "pointer" }}
													onChange={(e) => {
														setImage(e.target.files[0]);
														setFieldValue("image", e.currentTarget.files[0]);
													}}
													required
												/>
												<label htmlFor="file" className={styles.form_trip_label}>
													{" "}
													<FaUpload size={22} /> Upload Trip Image{" "}
												</label>{" "}
												<br /> <br />
												<img
													src={
														image
															? URL.createObjectURL(image)
															: "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
													}
													alt="trip image"
													className={`img-fluid ${styles.image_trip}`}
												/>
											</div>
											<div className="form-group mt-3">
												<textarea
													name="description"
													placeholder="Trip Description"
													className={styles.form_trip_textarea}
													onChange={handleChange}
													required
												/>
											</div>

											<div className={`${styles.btn_create_container} mt-3`}>
												<button
													onClick={handleSubmit}
													type="submit"
													className={`${styles.btn_create} btn btn-primary mt-3`}
												>
													CREATE
												</button>
											</div>
										</Form>
									)}
								</Formik>
							</div>
						</div>
					</div>
				</Layout>
			</PrivateRoutes>
		</>
	);
}

export default CreateTrip;
