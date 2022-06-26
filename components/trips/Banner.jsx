import Image from 'next/image'
import styles from './Banner.module.css'
import { Carousel } from 'react-bootstrap'
import ImageOne from "../../public/assets/banner_trip1.jpg"
import ImageTwo from "../../public/assets/banner_trip2.jpg"
import ImageThree from "../../public/assets/banner_trip3.jpg"

function Banner() {
  return (
    <section className={styles.banner_trip}>
        <Carousel fade>     
            <Carousel.Item>
                <div className={styles.image_container}>
                    <Image
                    src={ImageOne}
                    alt="First slide"
                    layout='fill'
                    />
                </div>               
                <Carousel.Caption>
                    <h3>MANY BENEFIT</h3>
                    <p>Join as our member to get more trip benefit!</p>
                </Carousel.Caption>
            </Carousel.Item>
  
            <Carousel.Item>
            <div className={styles.image_container}>
                    <Image
                    src={ImageTwo}
                    alt="First slide"
                    layout='fill'
                    />
                </div>
                <Carousel.Caption>
                    <h3>MORE THAN THOUSANDS TRIP</h3>
                    <p>Choose trip to join or create new trip as you wish and host the trip</p>
                </Carousel.Caption>
            </Carousel.Item>
            
            <Carousel.Item>
            <div className={styles.image_container}>
                    <Image
                    src={ImageThree}
                    alt="First slide"
                    layout='fill'
                    />
                </div>
                <Carousel.Caption>
                    <h3>NEW ADVENTURE NEW FRIENDS</h3>
                    <p>Enjoy discover adventure while you socialize with new friends</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </section>
  )
}

export default Banner