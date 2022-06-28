import Image from "next/image";
import UnderConstructionImage from "../public/assets/under-construction.png";
import Layout from "../components/layout/Layout";
import styles from "../styles/UnderConstruction.module.css";

function UnderConstruction() {
	return (
		<Layout>
			<div className={`container-fluid ${styles.uc_container}`}>
				<div className={styles.uc_imgContainer}>
					<Image
						src={UnderConstructionImage}
						alt="underconstruction"
						layout="responsive"
						objectFit="contain"
					/>
				</div>
				<h1 className={styles.uc_title}> UNDER CONSTRUCTION </h1>
				<h3 className={`text-center ${styles.uc_subTitle}`}>
					{" "}
					We are currently working on this page <br /> come back later!
				</h3>
			</div>
		</Layout>
	);
}

export default UnderConstruction;
