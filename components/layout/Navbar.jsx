import {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Navbar.module.css'
import Logo from '../../public/trackeling.png'
import { VscListFlat } from "react-icons/vsc";
import { BiChevronDown, BiX } from "react-icons/bi";

function Navbar() {
	const [activeMobile, setActiveMobile] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState(false);
	// const authData = useAuth();
	// const navigate = useNavigate();
	// const dispatch = useDispatch();
	// const { clearUser } = bindActionCreators(actionCreators, dispatch);
	// const { user } = useSelector((state) => {
	// 	return state;
	// });

	const toggleMobileNav = () => {
		setActiveMobile(!activeMobile);
	};

	const toggleDropdownMenu = () => {
		setActiveDropdown(!activeDropdown);
	};

	const mobileNav = () => {
		if (activeMobile === false) {
			return (
				<i className={styles.mobile_nav_toggle}>
					<VscListFlat onClick={toggleMobileNav} />
				</i>
			);
		} else {
			return (
				<i className={styles.mobile_nav_toggle}>
					<BiX onClick={toggleMobileNav} />
				</i>
			);
		}
	};

	const handleLogout = () => {
		clearUser();
		navigate("/");
		toast.success("You are logged out, see ya!!");
		localStorage.removeItem("authKey");
	};

	return (
		<header id={styles.header} className="d-flex align-items-center ">
			<div className="container-fluid container-xxl d-flex align-items-center">
				<div id={styles.logo} className="me-auto">
					<Image src={Logo} alt="Trackeling" width="200px" height="73px" />
				</div>

				<nav
					id={styles.navbar}
					className={
						activeMobile
							? `${styles.navbar} order-last order-lg-0 ${styles.navbar_mobile}`
							: `${styles.navbar} order-last order-lg-0`
					}
				>
					<ul>
						<li>
							<Link className="nav-link" href="/">
								HOME
							</Link>
						</li>
						<li>
							<Link className="nav-link" href="/trips">
								TRIPS
							</Link>
						</li>
						{/* {authData ? (
							<>
								<li>
									<Link className="nav-link" to="/trip/create">
										CREATE TRIP
									</Link>
								</li>
								<li className="dropdown">
									<div className="d-flex account">
										<img src={`${API_URL}/${user.avatar}`} className="rounded-circle nav-avatar" />
										<a href="#">
											{authData.username.toUpperCase()}
											<i>
												<BiChevronDown size={25} onClick={toggleDropdownMenu} />
											</i>
										</a>
									</div>

									<ul className={activeDropdown ? "dropdown-active" : ""}>
										<li>
											<Link to={`/user/account`}>SETTING ACCOUNT</Link>
										</li>
										<li>
											<Link to={`/user/mytrip`}>MY TRIP</Link>
										</li>
									</ul>
								</li>
							</>
						) : (
							<li>
								<Link className="nav-link" to="/signup">
									REGISTER
								</Link>
							</li>
						)} */}
                            <li>
								<Link className="nav-link" href="/signup">
									REGISTER
								</Link>
							</li>

					</ul>
					{mobileNav()}
				</nav>
				{/* {authData ? (
					<button onClick={handleLogout} className="logout scrollto">
						LOGOUT
					</button>
				) : (
					<Link style={{ textDecoration: "none" }} to="/login">
						<a className="login scrollto">LOGIN</a>
					</Link>
				)} */}

                    <Link style={{ textDecoration: "none" }} href="/login">
						<a className={styles.login}>LOGIN</a>
					</Link>
			</div>
		</header>
	);
}

export default Navbar;