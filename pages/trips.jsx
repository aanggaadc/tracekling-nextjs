import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../components/layout/Layout";
import styles from "../styles/Trips.module.css";
import BannerTrip from "../components/trips/Banner";
import NoData from "../public/no-data.gif";
import { Form, Formik } from "formik";
import Axios from "axios";
import { API_URL } from "../config/url";
import { toast } from "react-toastify";
import { Button, Card, Col, ProgressBar, Pagination, Row, Spinner } from "react-bootstrap";
import Head from "next/head";

function Trip() {
	const [totalPages, setTotalPages] = useState(0);
	const [currentPages, setCurrentPages] = useState(1);
	const [pageState, setPageState] = useState({
		pageNumber: 1,
		pageSize: 8,
	});
	const [filter, setFilter] = useState({
		trip_name: "",
		destination: "",
		start_date: "",
		end_date: "",
		count_member: "",
		max_member: "",
	});
	const [spinner, setSpinner] = useState(false);

	const pageNumbers = [];
	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}

	const [trip, setTrip] = useState([
		{
			trip_id: "",
			owner_id: "",
			trip_image: "",
			destination: "",
			trip_name: "",
			start_date: "",
			end_date: "",
			count_member: "",
			max_member: "",
			description: "",
			trip_status: "",
		},
	]);

	const handleTripCard = () => {
		if (spinner) {
			return (
				<Spinner style={{ margin: "auto" }} animation="border" role="status" variant="info">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			);
		} else {
			if (trip.length > 0) {
				return Array.from(trip).map((_, idx) => (
					<Col key={idx}>
						<Card className="text-center shadow h-100">
							<div className={styles.card_trip}>
								<Card.Img variant="top" src={_.trip_image} className={styles.card_imgTrip} />
							</div>
							<Card.Body>
								<Card.Title>
									<h3>{_.trip_name}</h3>
								</Card.Title>
								<h4> {_.destination}</h4>
								<p>
									{_.start_date} ~ {_.end_date}{" "}
								</p>
								<ProgressBar
									variant="info"
									now={(_.count_member / _.max_member) * 100}
									label={`${_.count_member}/${_.max_member}`}
								/>
								<Link href={`/trip/detail/${_.trip_id}`}>
									<Button className={`mt-2 ${styles.trip_button}`}>Detail</Button>
								</Link>
							</Card.Body>
						</Card>
					</Col>
				));
			} else {
				return (
					<img
						className="img-fluid"
						style={{ width: "500px", margin: "auto" }}
						src={NoData}
						alt="No-data"
					/>
				);
			}
		}
	};

	const getTrips = () => {
		setSpinner(true);
		Axios.post(`${API_URL}/trip/filter`, (trip, pageState))
			.then((response) => {
				const data = response.data.data.items;
				setTrip(
					data.map((item) => {
						return {
							trip_id: item.trip_id,
							owner_id: item.owner_id,
							trip_image: API_URL + item.trip_image,
							destination: item.destination,
							trip_name: item.trip_name,
							start_date: item.start_date,
							end_date: item.end_date,
							count_member: item.count_member,
							max_member: item.max_member,
							description: item.description,
							trip_status: item.trip_status,
						};
					})
				);
				setTotalPages(response.data.data.total_pages);
				setCurrentPages(response.data.data.current_page);
				setTimeout(() => {
					setSpinner(false);
				}, 1800);
			})
			.catch((error) => {
				if (error.response) {
					toast.error(error.response.data.data.message);
				} else {
					toast.error("Internal Server Error");
				}
			});
	};

	const nextPage = () => {
		setCurrentPages(currentPages + 1);
		setPageState({ ...pageState, pageNumber: pageState.pageNumber + 1 });
	};

	const prevPage = () => {
		setCurrentPages(currentPages - 1);
		setPageState({ ...pageState, pageNumber: pageState.pageNumber - 1 });
	};

	const handlePagination = () => {
		if (trip.length > 0) {
			return (
				<div className="col-12 d-flex justify-content-center">
					<Pagination>
						<Pagination.First
							onClick={() => {
								setCurrentPages(1);
								setPageState({ ...pageState, pageNumber: 1 });
							}}
						/>
						<Pagination.Prev onClick={prevPage} disabled={currentPages === 1} />
						{pageNumbers.map((num) => {
							return (
								<Pagination.Item
									key={num}
									active={num === currentPages}
									onClick={() => {
										setCurrentPages(num);
										setPageState({ ...pageState, pageNumber: num });
									}}
								>
									{num}
								</Pagination.Item>
							);
						})}
						{/* <Pagination.Ellipsis /> */}
						<Pagination.Next onClick={nextPage} disabled={currentPages === totalPages} />
						<Pagination.Last
							onClick={() => {
								setCurrentPages(totalPages);
								setPageState({ ...pageState, pageNumber: totalPages });
							}}
						/>
					</Pagination>
				</div>
			);
		}
	};

	useEffect(() => {
		getTrips();
	}, [pageState]);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	return (
		<>
			<Head>
				<title>Find Trips That Suit You 😄</title>
				<meta name="keywords" content="travel travelling" />
			</Head>
			<Layout>
				<BannerTrip />
				<div className={`${styles.search} mx-5 my-5`}>
					<div className="text-center">
						<h2>SEARCH TRIP</h2>
					</div>
					<Formik
						initialValues={{
							pageNumbers: 1,
							pageSize: 8,
							trip_name: "",
							destination: "",
							start_date: "",
							end_date: "",
							count_member: "",
							max_member: "",
						}}
						onSubmit={(values) => {
							Axios.post(`${API_URL}/trip/filter`, values)
								.then((response) => {
									const data = response.data.data.items;
									console.log(response.data.data.items);
									setTrip(
										data.map((item) => {
											return {
												trip_id: item.trip_id,
												owner_id: item.owner_id,
												trip_image: API_URL + item.trip_image,
												destination: item.destination,
												trip_name: item.trip_name,
												start_date: item.start_date,
												end_date: item.end_date,
												count_member: item.count_member,
												max_member: item.max_member,
												description: item.description,
												trip_status: item.trip_status,
											};
										})
									);
									setTotalPages(response.data.data.total_pages);
									setCurrentPages(response.data.data.current_page);
								})
								.catch((error) => {
									if (error.response) {
										toast.error(error.response.data.message);
									} else {
										toast.error("Internal Error Server");
									}
								});
						}}
					>
						{({ handleSubmit, handleChange, resetForm }) => (
							<Form id="filter-trip">
								<div className={styles.searchform}>
									<div className="form-row col-12 col-md-9">
										<div className={`${styles.form_search} mt-3`}>
											<label htmlFor="trip_name">Search Trip by Trip Name</label>
											<input
												type="text"
												className="form-control"
												id="trip_name"
												name="trip_name"
												onChange={(e) => {
													handleChange(e);
													setFilter({ ...filter, trip_name: e.target.value });
												}}
												value={filter.trip_name}
											/>
										</div>
										<div className={`${styles.form_search} mt-3`}>
											<label htmlFor="destination">Search Trip by Destination</label>
											<input
												type="text"
												className="form-control"
												id="destination"
												name="destination"
												onChange={(e) => {
													handleChange(e);
													setFilter({ ...filter, destination: e.target.value });
												}}
												value={filter.destination}
											/>
										</div>
										<div className={`${styles.form_search} mt-3`}>
											<label htmlFor="start_date">Search Trip by Start Date</label>
											<input
												type="date"
												className="form-control"
												id="start_date"
												name="start_date"
												onChange={(e) => {
													handleChange(e);
													setFilter({ ...filter, start_date: e.target.value });
												}}
												value={filter.start_date}
											/>
										</div>
									</div>
									<div className="form-row col-12 col-md-9">
										<div className={`${styles.form_search} mt-3`}>
											<label htmlFor="end_date">Search Trip by End Date</label>
											<input
												type="date"
												className="form-control"
												id="end_date"
												name="end_date"
												onChange={(e) => {
													handleChange(e);
													setFilter({ ...filter, end_date: e.target.value });
												}}
												value={filter.end_date}
											/>
										</div>
										<div className={`${styles.form_search} mt-3`}>
											<label htmlFor="count_member">Search Trip by Current Member</label>
											<input
												type="number"
												className="form-control"
												id="count_member"
												name="count_member"
												onChange={(e) => {
													handleChange(e);
													setFilter({ ...filter, count_member: e.target.value });
												}}
												value={filter.count_member}
											/>
										</div>
										<div className={`${styles.form_search} mt-3`}>
											<label htmlFor="max_member">Search Trip by Max Member</label>
											<input
												type="number"
												className="form-control"
												id="max_member"
												name="max_member"
												onChange={(e) => {
													handleChange(e);
													setFilter({ ...filter, max_member: e.target.value });
												}}
												value={filter.max_member}
											/>
										</div>
									</div>
								</div>
								<div className="mt-3 text-center">
									<button
										style={{ color: "white" }}
										onClick={handleSubmit}
										type="submit"
										className="btn btn-primary mt-3"
									>
										FIND TRIP
									</button>
									<button
										style={{ color: "white" }}
										onClick={() => {
											setFilter({
												trip_name: "",
												destination: "",
												start_date: "",
												end_date: "",
												count_member: "",
												max_member: "",
											});
											resetForm();
										}}
										type="submit"
										className="btn btn-warning mt-3 mx-3"
									>
										CLEAR
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
				<div className="container mb-3">
					<Row xs={1} md={2} lg={4} className="g-4">
						{handleTripCard()}
					</Row>
				</div>

				<div className="container">
					<div className="row">{handlePagination()}</div>
				</div>
			</Layout>
		</>
	);
}

export default Trip;
