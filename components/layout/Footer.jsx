import Link from 'next/link'
import Image from 'next/image'
import Logo from "../../public/trackeling.png"
import styles from './Footer.module.css'
import { BsTwitter, BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";

function Footer() {
	return (
		<footer id={styles.footer}>
			<div className={styles.footer_top}>
				<div className="container">
					<div className="row">
						<div className={`col-lg-4 col-md-6 ${styles.footer_info}`}>
							<div style={{marginLeft: "-30px"}} >
								<Image src={Logo} alt="Trackling" width="200px" height="73px" />
							</div>
							<p>
								We're a travel platform that focused on experiences, build connections among
								travellers, and make your extraordinary trip memories.
							</p>
						</div>

						<div className={`col-lg-4 col-md-6 ${styles.footer_links}`}>
							<h4>About Us</h4>
							<ul>
								<li>
									<i className="bi bi-chevron-right"></i> <Link href="/">Our Team</Link>
								</li>
								<li>
									<i className="bi bi-chevron-right"></i> <Link href="/underconstruction">FAQ</Link>
								</li>
								<li>
									<i className="bi bi-chevron-right"></i> <Link href="/underconstruction">Why Us</Link>
								</li>
							</ul>
						</div>

						<div className={`col-lg-4 col-md-6 ${styles.footer_contact}`}>
							<h4>Contact Us</h4>
							<p>
								Jakarta Pusat, Indonesia <br />
								<strong>Phone:</strong> +62 896 5548 8855
								<br />
								<strong>Email:</strong> Business@trackeling.com
								<br />
							</p>

							<div className={styles.social_links}>
								<a href="#twitter">
									<BsTwitter size={15} />
								</a>
								<a href="#facebook">
									<BsFacebook size={15} />
								</a>
								<a href="#instagram">
									<BsInstagram size={15} />
								</a>
								<a href="#linkedin">
									<BsLinkedin size={15} />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container">
				<div className={styles.copyright}>
					&copy; Copyright <strong>Trackeling</strong>. All Rights Reserved
				</div>
				<div className={styles.credits}>
					Designed by <a href="index.html">Trackeling.com</a>
				</div>
				<div className={styles.credits}>
					Logo Designed by{" "}
					<a href="https://www.instagram.com/tyasfirmantyo" target="_blank">
						Tyas Firmantyo
					</a>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
