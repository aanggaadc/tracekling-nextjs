import Head from "next/head";
import Layout from "../../../components/layout/Layout";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../store/userContext";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../../styles/TripDetail.module.css";
import { Container, Row, Col, Card, ProgressBar, Button, Modal, Spinner } from "react-bootstrap";
import Axios from "axios";
import { API_URL } from "../../../config/url";
import { toast } from "react-toastify";
import OtherTripList from "../../../components/OtherTrip";
// import { useSelector } from "react-redux";
import NoData from "../../../public/no-data.gif";
import { RiArrowRightCircleFill } from "react-icons/ri";
import { IoIosPerson } from "react-icons/io";
import PrivateRoutes from "../../../components/routes/PrivateRoutes";

function DetailTrip({tripData, otherTripData, tripStatus}) {
	const router = useRouter();
	const { tripId } = router.query;
	const [status, setStatus] = useState();
	const [dataOtherTrip, setDataOtherTrip] = useState([]);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [spinner, setSpinner] = useState(false);
	const { isUser } = useContext(UserContext);

	//   const { user } = useSelector((state) => {
	//     return state;
	//   });

	

	const [trip, setTrip] = useState({
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
		username: "",
		avatar_url: "",
		interest: "",
		location: "",
		phone_number: "",
	});

	const memberPercent = (trip.count_member * 100) / trip.max_member;
	const sisa = 100 - memberPercent;

	const getDataOtherTrip = () => {
		setSpinner(true);
		setDataOtherTrip(otherTripData)
		setTimeout(() => {
			setSpinner(false);
		}, 1500);
	};

	const getVerfication = () => {
		Axios.get(`${API_URL}/trip/join_verification/${tripId}`)
			.then((response) => {
				setStatus(response.data.status);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getTrip = () => {
		setTrip({
			trip_id: tripData.trip_id,
			owner_id: tripData.owner_id,
			trip_image: API_URL + tripData.trip_image,
			destination: tripData.destination,
			trip_name: tripData.trip_name,
			start_date: tripData.start_date,
			end_date: tripData.end_date,
			count_member: tripData.count_member,
			max_member: tripData.max_member,
			description: tripData.description,
			trip_status: tripData.trip_status,
			username: tripData.username,
			avatar_url: API_URL + tripData.avatar_url,
			interest: tripData.interest,
			location: tripData.location,
			phone_number: tripData.phone_number,
		});
	};

	const joinTrip = () => {
		Axios.post(`${API_URL}/trip/join/${tripId}`)
			.then((response) => {
				console.log(response);
				toast.success(`You Are Succesfully Join ${trip.trip_name} Trip!!!`);
				getVerfication();
				getTrip();
			})
			.catch((error) => {
				if (error.response) {
					toast.error(error.response.data.message);
				} else {
					toast.error("Something Wrong");
				}
			});
	};

	const handleTripButton = () => {
		if (isUser) {
			if (isUser.user_id === trip.owner_id) {
				return (
					<div style={{ display: "flex", gap: "10px", padding: "0px" }}>
						<Link href={`/trip/edit/${tripId}`}>
							<Button variant="primary" active style={{ width: "80px" }}>
								Edit
							</Button>
						</Link>
						<Button onClick={handleShow} variant="danger" active style={{ width: "80px" }}>
							Delete
						</Button>
					</div>
				);
			} else {
				if (status === "UNJOIN") {
					return (
						<Button onClick={joinTrip} className={`${styles.btn_join} ml-4`} active>
							Join
						</Button>
					);
				} else {
					return (
						<Button
							style={{ width: "115px" }}
							className="btn-detailtrip ml-4"
							variant="info"
							disabled
						>
							Already Join
						</Button>
					);
				}
			}
		}
	};

	const OtherTrip = () => {
		if (spinner) {
			return (
				<Spinner animation="border" role="status" variant="info">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			);
		} else {
			if (dataOtherTrip.length > 0) {
				return (
					<>
						<OtherTripList data={dataOtherTrip} />
						<Link href="/trips">
							<div
								style={{
									textDecoration: "none",
									color: "#188CBD",
									fontSize: "20px",
									cursor: "pointer",
								}}
								className="float-end mt-3"
							>
								See Other
								<RiArrowRightCircleFill size={30} />
							</div>
						</Link>
					</>
				);
			} else {
				return <img className="img-fluid" style={{ width: "500px" }} src={NoData} alt="No-data" />;
			}
		}
	};

	const deleteTrip = () => {
		Axios.delete(`${API_URL}/trip/delete/${tripId}`)
			.then((response) => {
				console.log(response);
				toast.success(`Trip ${trip.trip_name} Successfully Deleted!!`);
				router.push("/");
			})
			.catch((error) => {
				if (error.response.message) {
					toast.error(error.response.message);
				} else {
					toast.error("Cant Connect to Our Server!");
				}
			});
	};

	useEffect(() => {
		getVerfication();
		getTrip();
		getDataOtherTrip();
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [tripId]);

	return (
		<>
			<Head>
				<title>{trip.trip_name}</title>
				<meta name="keywords" content="travel travelling" />
			</Head>
			<PrivateRoutes>
				<Layout>
					<Container className={`${styles.detailtrip_container} py-5`}>
						<Modal show={show} onHide={handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>Delete {trip.trip_name} Trip</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								Are you sure want to <span style={{ fontWeight: "bold" }}>delete</span> this trip?
							</Modal.Body>
							<Modal.Footer>
								<Button variant="secondary" onClick={handleClose}>
									No
								</Button>
								<Button variant="danger" onClick={deleteTrip}>
									Yes, I'm sure
								</Button>
							</Modal.Footer>
						</Modal>
						<Row>
							<Col lg="5">
								<Card style={{ width: "100%" }}>
									<img
										src={trip.trip_image}
										alt="Trip Image"
										className={`img-fluid rounded shadow-4 ${styles.detail_trip_img}`}
									/>
								</Card>
							</Col>
							<Col lg>
								<h1>{trip.trip_name}</h1>
								<h3>{trip.destination}</h3>
								<p>
									From {trip.start_date} to {trip.end_date}
								</p>
								<div>
									Already Join
									<ProgressBar className="w-75" style={{ height: "30px" }}>
										<ProgressBar
											variant="success"
											now={Math.ceil(memberPercent)}
											label={`${Math.ceil(memberPercent)}%`}
										/>
										<ProgressBar variant="info" now={Math.floor(sisa)} />
									</ProgressBar>
									<div className="w-75">
										<div className={styles.member_info}>
											<IoIosPerson />
											{trip.count_member}/{trip.max_member}
										</div>
									</div>
								</div>
								<div>
									<Row className="justify-content-start mx-0 my-4">{handleTripButton()}</Row>
								</div>
							</Col>
						</Row>
						<hr className="my-5" />
						<Row className="mb-3">
							<h3>Description</h3>
							<br />
							<p>{trip.description}</p>
						</Row>
						<Row className="mt-3">
							<Col lg="4">
								<h3>Posted By</h3>
								<div className={styles.posted}>
									<img
										src={trip.avatar_url}
										alt="owner avatar"
										className={`img-fluid rounded-circle shadow-4 ${styles.image_profile}`}
									/>
									<div className="name-profile">
										<p className="mb-0">
											<b>{trip.username}</b>
										</p>
										<small className="mb-0">{trip.location}</small>
									</div>
								</div>
								<div className="mt-2">
									<p>
										Contact :
										<a className="contact-owner" href={`https://wa.me/${trip.phone_number}`}>
											{trip.phone_number}{" "}
										</a>
									</p>
								</div>
							</Col>
						</Row>
						<hr className="my-5" />
						<Row>
							<div className={styles.other_trip}>
								<h2>OTHER TRIP</h2>
								<p>Other exciting places to visit</p>
							</div>
							<div className="text-center">{OtherTrip()}</div>
						</Row>
					</Container>
				</Layout>
			</PrivateRoutes>
		</>
	);
}

export default DetailTrip;


export const getServerSideProps = async (context) => {
	try {
		const dataTrip = await Axios.get(`${API_URL}/trip/detail/${context.params.tripId}`)
		const dataOtherTrip = await Axios.get(`${API_URL}/trip/other_trip/${context.params.tripId}`)
		// const tripStatus = await Axios.get(`${API_URL}/trip/join_verification/${context.params.tripId}`)

		return {
			props: {
				tripData : dataTrip.data.data,
				otherTripData : dataOtherTrip.data.data
			}
		}
	} catch (error) {
		return {
			props: {
				tripData : {},
				otherTripData : {}
			}
		}
	}
}
