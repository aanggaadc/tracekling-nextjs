import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/User.module.css'
import { Button, Card, Col, Pagination, Form, ProgressBar, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import Layout from '../../components/layout/Layout'
import Axios from "axios";
import { API_URL } from "../../config/url";
import { Formik } from "formik";
import NoData from "../../public/no-data.gif";

function MyTrip() {
	const [data, setData] = useState([]);
	const isData = data.length > 0;
	const [totalPages, setTotalPages] = useState(0);
	const [currentPages, setCurrentPages] = useState(1);
	const [filter, setFilter] = useState({
		destination: "",
		start_date: "",
		end_date: "",
	});
	const [pageState, setPageState] = useState({
		pageNumber: 1,
		pageSize: 8,
	});

	const pageNumbers = [];
	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}

	useEffect(() => {
		Axios.post(`${API_URL}/trip/get_user_trip`, pageState)
			.then((response) => {
				setData(response.data.data.items);
				setTotalPages(response.data.data.total_pages);
				setCurrentPages(response.data.data.current_page);
			})
			.catch((error) => {
				console.log(error.data.message);
			});
	}, [pageState, filter]);

	const nextPage = () => {
		setCurrentPages(currentPages + 1);
		setPageState({ ...pageState, pageNumber: pageState.pageNumber + 1 });
	};

	const prevPage = () => {
		setCurrentPages(currentPages - 1);
		setPageState({ ...pageState, pageNumber: pageState.pageNumber - 1 });
	};

	const handlePagination = () => {
		if (data.length > 0) {
			return (
				<div className="col-12">
					<Pagination className={styles.mytrip_pagination}>
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

	return (
		<>
        <Layout>
			<div className={`container ${styles.container_mytrip}`}>
				<div className={`${styles.mytrip_title} text-center`}>
					<h1>MY TRIP</h1>
					<p>This is your created or joined trip list</p>
				</div>
				<Formik
					initialValues={{
						pageNumber: 1,
						pageSize: 8,
						destination: "",
						start_date: "",
						end_date: "",
					}}
					onSubmit={(values) => {
						Axios.post(`${API_URL}/trip/get_user_trip`, values)
							.then((response) => {
								setData(response.data.data.items);
								setTotalPages(response.data.data.total_pages);
								setCurrentPages(response.data.data.current_page);
							})
							.catch((error) => {
								console.log(error);
							});
					}}
				>
					{({ handleSubmit, handleChange, resetForm }) => (
						<Form className={styles.mytrip_filters}>
							<div className={styles.form_row}>
								<Form.Group className={`mb-3 ${styles.mytrip_search}`} controlId="formGroupEmail">
									<Form.Label>Destination</Form.Label>
									<Form.Control
										type="text"
										placeholder="Search by Destination"
										name="destination"
										value={filter.destination}
										onChange={(e) => {
											handleChange(e);
											setFilter({ ...filter, destination: e.target.value });
										}}
									/>
								</Form.Group>
							</div>
							<div className={styles.form_row}>
								<Form.Group className={`mb-3 ${styles.mytrip_search}`} controlId="formGroupPassword">
									<Form.Label>Start Date</Form.Label>
									<Form.Control
										type="date"
										placeholder="Search by Start Date"
										name="start_date"
										value={filter.start_date}
										onChange={(e) => {
											handleChange(e);
											setFilter({ ...filter, start_date: e.target.value });
										}}
									/>
									<Form.Text className="text-muted">Search by Start Date</Form.Text>
								</Form.Group>
								<Form.Group className={`mb-3 ${styles.mytrip_search}`}  controlId="formGroupPassword">
									<Form.Label>End Date</Form.Label>
									<Form.Control
										type="date"
										placeholder="Search by End Date"
										name="end_date"
										value={filter.end_date}
										onChange={(e) => {
											handleChange(e);
											setFilter({ ...filter, end_date: e.target.value });
										}}
									/>
									<Form.Text className="text-muted">Search by End Date</Form.Text>
								</Form.Group>
							</div>
							<div className={`${styles.form_row} ${styles.btn_clearField}`}>
								<button type='submit' onClick={handleSubmit}>Search</button>
								<button
									onClick={(e) => {
										setFilter({
											destination: "",
											start_date: "",
											end_date: "",
										});
										resetForm();
										e.preventDefault();
									}}
								>
									Clear
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
			<div className="container">
				<Row xs={1} md={2} lg={4} className="g-4">
					{isData ? (
						data.map((item, index) => {
							return (
								<Col key={index}>
									<Card className="text-center shadow h-100">
										<div className={styles.card_trip}>
											<Card.Img
												variant="top"
												src={`${API_URL}/${item.trip.trip_image}`}
												className={styles.card_imgTrip}
											/>
										</div>
										<Card.Body>
											<Card.Title>
												<h3 style={{ fontWeight: "Bold" }}>{item.trip.trip_name}</h3>
											</Card.Title>
												<h4>{item.trip.destination}</h4>
												<p>
													{item.trip.start_date} to {item.trip.end_date}
												</p>
											<ProgressBar
												variant="info"
												now={(item.trip.count_member * 100) / item.trip.max_member}
												label={`${item.trip.count_member}/${item.trip.max_member}`}
											/>
											<Link href={`/trip/detail/${item.tripTripId}`}>
												<Button className={`mt-2 ${styles.trip_button}`}>Detail</Button>
											</Link>
										</Card.Body>
									</Card>
								</Col>
							);
						})
					) : (
                        <div style={{margin: "auto", width: "500px"}}>
                            <Image
							src={NoData}
							alt="No-data"
                            width="500px"
						    />
                        </div>						
					)}
				</Row>
			</div>
			<div className="container">
				<div className="row">{handlePagination()}</div>
			</div>

            </Layout>
		</>
	);
}

export default MyTrip;
