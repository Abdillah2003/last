import './style.css';
import Logo from "../assets/logo.png";
import { click } from '@testing-library/user-event/dist/click';
import Youtube from "../assets/YOUTUBE.png";
import Whatsapp from "../assets/WHATSAPP.png";
import Instagram from "../assets/INSTAGRAM.png";
import Facebook from "../assets/FACEBOOK.png";

function Dashboard() {
    return (
        <>
        <div className='header'>
            <div className='navbar-dash'>
                <div className="imgs">
                    <div className="container-image">
                        <img src={Logo} alt="logo" className="logo"/>
                    </div>
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li>
                        <a href='/login'>Log In</a>
                    </li>
                </ul>
            </div>
        </div>
        <div>
            <div className='wrapper-dash'>
                <div className='row'>
                    <div className='column'>
                        <div className='textumkm-dash'>
                            <h1>UMKM Membangun Negeri</h1>
                            <p className='infotext-dash'>
                                UMKM atau Usaha Mikro Kecil dan Menengah adalah jenis usaha yang memiliki skala kecil dengan jumlah aset terbatas dan jumlah karyawan yang juga terbatas.
                            </p>
                            <div className="back-button">
                                <button><a href='/'>BACK</a> </button>
                            </div>
                            <p className='sosmed-text'>
                                Tinjau terlebih dahulu
                            </p>
                            <div class="sosmed-logo">
                                <a href="https://www.instagram.com/sahabat_umkm/" target="_blank">
                                <title>Instagram</title>
                                <img alt="instagram" src={Instagram} className="sosmed-items"/>
                                </a>
                    
                                <a href="https://web.whatsapp.com/" target="_blank">
                                <title>Whatsapp</title>
                                <img alt="whatsapp" src={Whatsapp} className="sosmed-items"/>
                                </a>
                    
                                <a href="https://www.youtube.com/watch?v=8Ea4oq8qFtM&t=2845s" target="_blank">
                                <title>YouTube</title>
                                <img alt="youtube" src={Youtube} className="sosmed-items"/>
                                </a>
                    
                                <a href="https://www.facebook.com/login/?privacy_mutation_token=eyJ0eXBlIjowLCJjcmVhdGlvbl90aW1lIjoxNjc5NDc1MzA0LCJjYWxsc2l0ZV9pZCI6MjY5NTQ4NDUzMDcyMDk1MX0%3D" target="_blank">
                                <title>Facebook</title>
                                <img alt="facebook" src={Facebook} className="sosmed-items"/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='column'>
                        <div className='bg-column'></div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Dashboard;