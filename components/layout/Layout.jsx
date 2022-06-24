import Navbar from './Navbar'
import Footer from './Footer'

function Layout({children}) {
    return (
        <>
        <Navbar />

        {children}

        <div style={{marginTop: "100px"}}>
            <Footer />
        </div>
        </>        
    )
}

export default Layout