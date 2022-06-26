import Link from "next/link";
import Image from "next/image";
import NotFoundImage from "../public/assets/not-found.png";
import Layout from "../components/layout/Layout";
import styles from "../styles/NotFound.module.css";
import Head from "next/head";

function NotFound() {
	return (
		<>
			<Head>
				<title>404 - Page Not Found</title>
			</Head>
			<Layout>
				<div className={`container-fluid ${styles.notFoundContainer}`}>
					<div className={styles.notFoundImgContainer}>
						<Image src={NotFoundImage} alt="notfound" layout="responsive" objectFit="contain" />
					</div>
					<div className={styles.notFound}>
						<div className={styles.notFound404}>
							<h1 className={styles.title}>Oops! Looks like you lost</h1>
						</div>
						<h2 className={styles.subTitle}>404 - Page not found</h2>
						<p className={styles.paragraph}>
							The page you are looking for might have been removed <br /> had its name changed or is
							temporarily unavailable.
						</p>
						<Link href={"/"}>
							<a className={styles.link}>Go To Homepage</a>
						</Link>
					</div>
				</div>
			</Layout>
		</>
	);
}

export default NotFound;
