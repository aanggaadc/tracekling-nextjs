import { useEffect, useState } from "react";
import Image from 'next/image'
import styles from '../../styles/User.module.css'
import Layout from '../../components/layout/Layout'
import FormBiodata from "../../components/user/FormBiodata";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import Axios from "axios";
import { API_URL } from "../../config/url";
// import { useDispatch } from "react-redux";
// import { bindActionCreators } from "redux";
// import { actionCreators } from "../../store/index";

function Biodata() {
    const [file, setFile] = useState("");
	// const location = useLocation();
	// const dispatch = useDispatch();	
	// const { fillUser } = bindActionCreators(actionCreators, dispatch);

	const [userProfile, setUserProfile] = useState({
		username: "",
		email: "",
		age: "",
		sex: "",
		location: "",
		interest: "",
		phone_number: "",
		avatar_url: "",
	});

	const getUserProfile = () => {
		Axios.get(`${API_URL}/user/single`)
			.then((response) => {
				// console.log("RESPONSE PROFILE", response);
				const apiData = response.data.data;
				setUserProfile({
					username: apiData.username,
					email: apiData.email,
					age: apiData.profile.age,
					sex: apiData.profile.sex,
					location: apiData.profile.location,
					interest: apiData.profile.interest,
					phone_number: apiData.profile.phone_number,
					avatar_url: apiData.profile.avatar_url,
				});
			})
			.catch((error) => {
				console.log("ERROR PROFILE", error);
			});
	};

	const updateReduxState = () => {
		Axios.get(`${API_URL}/user/single`)
			.then((response) => {
				fillUser(response.data.redux);
				localStorage.setItem("authKey", JSON.stringify(response.data.redux));
			})
			.catch((error) => {
				console.log("ERROR PROFILE", error);
			});
	};

	useEffect(() => {
		getUserProfile();
	}, []);

	return (
        <Layout>
            <div id={styles.background_profile}>
                <div className={`container ${styles.container_profile}`}>
                    <div className={styles.account_profile}>
                        <div className={styles.left_profile}>
                            <div className={styles.title_profile}>
                                <h1 style={{ color: "#25abe3", filter: "brightness(95%)", textAlign: "center" }}>
                                    My Profile
                                </h1>
                            </div>
                            <div className={`${styles.photo} mt-4`}>
                                <div className={styles.avatar}>
                                    <Image
                                        src={file ? URL.createObjectURL(file) : `${API_URL}/${userProfile.avatar_url}`}
                                        alt="avatar"
                                        width="150px"
                                        height="150px"
                                        objectFit="cover"
                                    />
                                </div>
                               
                            </div>
                            <div className={styles.info_profile}>
                                <div className={`${styles.info_detail} mt-3`}>
                                    <div className={styles.info_detail_left}>Username:</div>
                                    <div className={styles.info_detail_right}>{userProfile.username}</div>
                                </div>
                                <div className={styles.info_detail}>
                                    <div className={styles.info_detail_left}>Email:</div>
                                    <div className={styles.info_detail_right}>{userProfile.email}</div>
                                </div>
                                <div className={styles.info_detail}>
                                    <div className={styles.info_detail_left}>Phone:</div>
                                    <div className={styles.info_detail_right}>{userProfile.phone_number}</div>
                                </div>
                                <div className={styles.info_detail}>
                                    <div className={styles.info_detail_left}>Age:</div>
                                    <div className={styles.info_detail_right}>{userProfile.age}</div>
                                </div>
                                <div className={styles.info_detail}>
                                    <div className={styles.info_detail_left}>Sex:</div>
                                    <div className={`${styles.info_detail_right} ${styles.gender}`}>
                                        {userProfile.sex}
                                        {userProfile.sex === "Female" && <BsGenderFemale />}
                                        {userProfile.sex === "Male" && <BsGenderMale />}
                                        {userProfile.sex === null && "Still Empty :("}
                                    </div>
                                </div>
                                <div className={styles.info_detail}>
                                    <div className={styles.info_detail_left}>Location:</div>
                                    <div className={styles.info_detail_right}>
                                        {userProfile.location}
                                        {userProfile.location === null && "Still Empty :("}
                                    </div>
                                </div>
                                <div className={styles.info_detail}>
                                    <div className={styles.info_detail_left}>Interest:</div>
                                    <div className={styles.info_detail_right}>
                                        {userProfile.interest}
                                        {userProfile.interest === null && "Still Empty :("}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.right_profile}>
                                <FormBiodata
                                    setFile={setFile}
                                    userProfile={userProfile}
                                    getUserProfile={getUserProfile}
                                    updateReduxState={updateReduxState}
                                />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
	);
}

export default Biodata;
