import Image from 'next/image'
import styles from "./Team.module.css";
import { BsTwitter, BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";
import Rizky from "../../public/assets/rizky.jpg";
import Juan from "../../public/assets/juan.jpg";
import Ninda from "../../public/assets/ninda.jpeg";
import Angga from "../../public/assets/angga.JPG";
import Didi from "../../public/assets/didi.jpg";
import Alifiandy from "../../public/assets/alifiandy.jpg";
import Kisbayu from "../../public/assets/kisbayu.jpg";
import Alifadel from "../../public/assets/alifadel.jpg";

function Team() {
	return (
		<section id={styles.members}>
			<div className="container">
				<div className={styles.members_header}>
					<h2>MEET THE TEAM</h2>
					<p>These are all extraordinary people who contributed to the creation of this website</p>
					<hr />
				</div>

				<div className="row d-flex justify-content-center mt-5">
					<div className="col-lg-3 col-md-6">
						<div className={styles.members}>
                            <div className={styles.image}>
							    <Image src={Didi} alt="Alifadel" layout='fill' objectFit='cover' />
                            </div>
							<div className={styles.details}>
								<h3>Didi</h3>
								<p>Mentor</p>
								<div className={styles.social}>
									{/* <a href="#twitter">
										<BsTwitter />
									</a> */}
									<a href="https://github.com/didihottest">
										<BsGithub />
									</a>
									{/* <a href="#instagram">
										<BsInstagram />
									</a> */}
									<a href="https://www.linkedin.com/in/mdidims/">
										<BsLinkedin />
									</a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-6">
						<div className={styles.members}>
                            <div className={styles.image}>
							    <Image src={Juan} alt="Alifadel" layout='fill' objectFit='cover' />
                            </div>
							<div className={styles.details}>
								<h3>Juan</h3>
								<p>Frontend Developer</p>
								<div className={styles.social}>
									{/* <a href="#twitter">
										<BsTwitter />
									</a> */}
									<a href="https://github.com/deriscode">
										<BsGithub />
									</a>
									{/* <a href="#instagram">
										<BsInstagram />
									</a> */}
									<a href="https://www.linkedin.com/in/juan-d-7b565123b/">
										<BsLinkedin />
									</a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-6">
						<div className={styles.members}>
                            <div className={styles.image}>
							    <Image src={Angga} alt="Alifadel" layout='fill' objectFit='cover' />
                            </div>
							<div className={styles.details}>
								<h3>Angga</h3>
								<p>Fullstack Developer</p>
								<div className={styles.social}>
									{/* <a href="#twitter">
										<BsTwitter />
									</a> */}
									<a href="https://github.com/aanggaadc">
										<BsGithub />
									</a>
									{/* <a href="#instagram">
										<BsInstagram />
									</a> */}
									<a href="https://www.linkedin.com/in/anggara-setiawan-b605a021b/">
										<BsLinkedin />
									</a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-6">
						<div className={styles.members}>
                            <div className={styles.image}>
							    <Image src={Rizky} alt="Alifadel" layout='fill' objectFit='cover' />
                            </div>
							<div className={styles.details}>
								<h3>Rizky</h3>
								<p>Fullstack Developer</p>
								<div className={styles.social}>
									{/* <a href="#twitter">
										<BsTwitter />
									</a> */}
									<a href="https://github.com/RizkyPDA">
										<BsGithub />
									</a>
									{/* <a href="#instagram">
										<BsInstagram />
									</a> */}
									<a href="https://www.linkedin.com/in/muhammadrizkyrs/">
										<BsLinkedin />
									</a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-6">
						<div className={styles.members}>
                            <div className={styles.image}>
							    <Image src={Ninda} alt="Alifadel" layout='fill' objectFit='cover' />
                            </div>
							<div className={styles.details}>
								<h3>Ninda</h3>
								<p>Fullstack Developer</p>
								<div className={styles.social}>
									{/* <a href="#twitter">
										<BsTwitter />
									</a> */}
									<a href="https://github.com/shafiraninda">
										<BsGithub />
									</a>
									{/* <a href="#instagram">
										<BsInstagram />
									</a> */}
									<a href="https://www.linkedin.com/in/nindasa/">
										<BsLinkedin />
									</a>
								</div>
							</div>
						</div>
					</div>

					<div className="col-lg-3 col-md-6">
						<div className={styles.members}>
                            <div className={styles.image}>
							    <Image src={Alifiandy} alt="Alifadel" layout='fill' objectFit='cover' />
                            </div>
							<div className={styles.details}>
								<h3>Alifiandy</h3>
								<p>Fullstack Developer</p>
								<div className={styles.social}>
									<a href="https://twitter.com/Alifiandyn">
										<BsTwitter />
									</a>
									<a href="https://github.com/alifiandyn">
										<BsGithub />
									</a>
									<a href="https://www.instagram.com/alifiandyn/">
										<BsInstagram />
									</a>
									<a href="https://www.linkedin.com/in/alifiandy-nugraha-4859161a4/">
										<BsLinkedin />
									</a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-6">
						<div className={styles.members}>
                            <div className={styles.image}>
							    <Image src={Kisbayu} alt="Alifadel" layout='fill' objectFit='cover' />
                            </div>
							<div className={styles.details}>
								<h3>Kisbayu</h3>
								<p>Fullstack Developer</p>
								<div className={styles.social}>
									{/* <a href="#twitter">
										<BsTwitter />
									</a> */}
									<a href="https://github.com/kisbayu">
										<BsGithub />
									</a>
									{/* <a href="#instagram">
										<BsInstagram />
									</a> */}
									<a href="https://www.linkedin.com/in/kisbayuadji/">
										<BsLinkedin />
									</a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-6">
						<div className={styles.members}>
                            <div className={styles.image}>
							    <Image src={Alifadel} alt="Alifadel" layout='fill' objectFit='cover' />
                            </div>
							<div className={styles.details}>
								<h3>Alifadel</h3>
								<p>Fullstack Developer</p>
								<div className={styles.social}>
									{/* <a href="#twitter">
										<BsTwitter />
									</a> */}
									<a href="https://github.com/Aliffadel">
										<BsGithub />
									</a>
									{/* <a href="#instagram">
										<BsInstagram />
									</a> */}
									{/* <a href="#linkedid">
										<BsLinkedin />
									</a> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Team;
