import Link from 'next/link'
import { Button, Card, Row, Col } from "react-bootstrap";
import { API_URL } from "../../config/url";
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper'
import styles from './TripUser.module.css'

function TripRecomendation({ data }) {
  return (
    <div className="container">
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 5
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 5
          }
        }}
        pagination={{
          clickable: true
        }}
        scrollbar={{ draggable: true }}
        modules={[Pagination]}
        className='swiper'>
        <Row xs={1} md={2} lg={4} className="g-2">

          {data.map((item, index) => (
            <SwiperSlide>
              <Col key={index}>
                <Card className="text-center shadow h-100">
                  <div className={styles.card_trip}>
                    <Card.Img variant="top" src={`${API_URL}/${item.trip_image}`} className={styles.card_imgTrip} />
                  </div>
                  <Card.Body>
                      <h3 style={{ fontWeight: "Bold" }}>{item.destination}</h3>
                    <Link href={`/recommendation/detail/${item.recomendation_id}`}>
                      <Button className={`mt-2 ${styles.trip_button}`}>Detail</Button>
                    </Link>
                  </Card.Body>
                </Card>

              </Col>
            </SwiperSlide>
          ))}

        </Row>
      </Swiper>
    </div >
  );
}

export default TripRecomendation;
