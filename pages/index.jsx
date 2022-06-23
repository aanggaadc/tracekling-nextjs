import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import NoData from '../public/no-data.gif'
import Layout from '../components/Layout'

const Home = () => {
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

        </Layout>        
    </>    
    
  )
}

export default Home
