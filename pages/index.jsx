import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import {useState, useEffect} from 'react'
import {Spinner, Button} from 'react-bootstrap'
import styles from '../styles/Home.module.css'
import NoData from '../public/no-data.gif'
import Layout from '../components/layout/Layout'
import Axios from 'axios'
import {API_URL} from '../config/url'
import { RiArrowRightCircleFill } from "react-icons/ri";
import TripRecomendation from '../components/home/TripRecomendation'
import TripUser from '../components/home/TripUser'
import Team from '../components/home/Team'
import { toast } from 'react-toastify'

const Home = () => {
  const [dataTrip, setDataTrip] = useState([]);
	const [dataRecomendation, setDataRecomendation] = useState([]);
	const [spinnerRecomendation, setSpinnerRecomendation] = useState(false)
	const [spinnerTrip, setSpinnerTrip] = useState(false)
	const [pageStateRecomendation, setPageStateRecomendation] = useState({
		pageNumber: 1,
		pageSize: 8,
		destination: "",
	});
	const pageState = {
		pageNumber: 1,
		pageSize: 4,
	};
	const [active, setActive] = useState("")

	const onSetActiveMenuItem = (item) => {
		if (item !== active) {
			setActive(item)
		} else {
			setActive("")
		}
	}

	const getRecomendationList = () => {
		setSpinnerRecomendation(true)
		Axios.post(`${API_URL}/recomendation/list`, pageStateRecomendation)
			.then((response) => {
				setDataRecomendation(response.data.data.items);
				setTimeout(() => {
					setSpinnerRecomendation(false);
				  }, 1800);
			})
			.catch((error) => {
				console.log(error.data.message);
			});
	};

	const getTripList = () => {
		setSpinnerTrip(true)
		Axios.post(`${API_URL}/trip/list`, pageState)
			.then((response) => {
				setDataTrip(response.data.data.items);
				setTimeout(() => {
					setSpinnerTrip(false)
				}, 1800)
			})
			.catch((error) => {
				console.log(error.data.message);
			});
	};

	const recomendation = () => {
		if(spinnerRecomendation){
			return (
				<Spinner animation="border" role="status" variant="info">
  					<span className="visually-hidden">Loading...</span>
				</Spinner>
			)
		}else{
			if (dataRecomendation.length > 0) {
				return (
					<TripRecomendation data={dataRecomendation} />
				);
			} else {
				return <Image className="img-fluid" width="500px" src={NoData} alt="No-data" />;
			}
		}
		
	};

	const trip = () => {
		if(spinnerTrip){
			return (
				<Spinner animation="border" role="status" variant="info">
  					<span className="visually-hidden">Loading...</span>
				</Spinner>
			)
		}else{
			if (dataTrip.length > 0) {
				return (
					<>
						<TripUser data={dataTrip} />
						<Link href="trips">
              <div style={{ textDecoration: "none", color: "#188CBD", fontSize: "20px", cursor: "pointer" }} className="float-end mt-3">
              See all
							<RiArrowRightCircleFill size={30} />
              </div>						
						</Link>
					</>
				);
			} else {
				return <Image className='img-fluid' width="500px" src={NoData} alt="No-data" />;
			}
		}
		
	};

	useEffect(() => {
		getRecomendationList();
		getTripList();
	}, []);

	useEffect(() => {
		getRecomendationList()
	}, [pageStateRecomendation])


  return (
    <>
        <Head>
          <title>Trackeling - Home</title>
          <meta name="keywords" content="travel travelling" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout>
			<section id={styles.banner}>
				<div className={styles.banner_container}>
					<h1 className="mb-4 pb-0"> Make Your Travel <span>Dreams</span> <br /> Come True Here</h1>
					<Link href='/trips'>
					<div className={styles.about}>
						GO EXPLORE
					</div>
					</Link>
				</div>
			</section>

			<main id={styles.main}>
					<section id={styles.recomendation} >
						<div className="container mt-5">
							<div className={styles.recomendation}>
								<h2>OUR RECOMMENDATION</h2>
								<p>Here are interesting places to visit, you can thank us later!</p>
							</div>

							<div className={styles.tags}>
								<Button
									onClick={() => {
										setPageStateRecomendation({ ...pageStateRecomendation, destination: "bali" });
										onSetActiveMenuItem("button1")
									}}
									className={active === "button1" ? styles.tags_btn_active : styles.tags_btn }
								>
									Bali
								</Button>
								<Button
									onClick={() => {
										setPageStateRecomendation({ ...pageStateRecomendation, destination: "bandung" });
										onSetActiveMenuItem("button2")
									}}
									className={active === "button2" ? styles.tags_btn_active : styles.tags_btn}
								>
									Bandung
								</Button>
								<Button
									onClick={() => {
										setPageStateRecomendation({ ...pageStateRecomendation, destination: "semarang" });
										onSetActiveMenuItem("button3")
									}}
									className={active === "button3" ? styles.tags_btn_active : styles.tags_btn}
								>
									Semarang
								</Button>
								<Button
									onClick={() => {
										setPageStateRecomendation({ ...pageStateRecomendation, destination: "jakarta" });
										onSetActiveMenuItem("button4")
									}}
									className={active === "button4" ? styles.tags_btn_active : styles.tags_btn}
								>
									Jakarta
								</Button>
								<Button
									onClick={() => {
										setPageStateRecomendation({
											...pageStateRecomendation,
											destination: "labuan bajo",
										});
										onSetActiveMenuItem("button5")
									}}
									className={active === "button5" ? styles.tags_btn_active : styles.tags_btn}
								>
									Labuan Bajo
								</Button>
							</div>

							<div className="mt-3 text-center">{recomendation()}</div>

							<hr className={styles.line} />
						</div>
					</section>

					<section id="trips">
						<div className="container mt-5">
							<div className={styles.recomendation}>
								<h2>New TRIPS</h2>
								<p>Latest Trips Available to Join</p>
							</div>

							<div className="text-center">{trip()}</div>
						</div>
					</section>
				</main>

				<Team />
        </Layout>      
    </>    
    
  )
}

export default Home
