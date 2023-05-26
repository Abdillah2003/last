import './style.css'
import { FaSearch} from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Navbar from "./Navbar";

const Akun = (e) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [access_token, setToken] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      const access_token = localStorage.getItem('token')
      setToken(access_token)
      setLoading(true)
  
      fetch("http://34.101.113.12/api/register", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        setData(data.data);
        setLoading(false);
      }).catch(error => {
        console.log(error)
        setLoading(false)
      })
    },[])
    console.log(JSON.stringify(data))

    return(
        <div>
            ini adalah akun
        </div>
    )
}

export default Akun;