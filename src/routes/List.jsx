import './style.css';
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Navbar from "./Navbar";
import UserPost from './Card';

const List = () => {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [access_token, setToken] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const access_token = localStorage.getItem('token')
    setToken(access_token)
    setLoading(true)

    fetch("http://34.101.113.12/api/umkm", {
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) => {
    const namaUmkm = item.nama_umkm.toLowerCase();
    const searchTermLowerCase = searchTerm.toLowerCase();

    return namaUmkm.includes(searchTermLowerCase);
  });

  console.log(filteredData);
  if (loading) return <h1>Loading...</h1>
  return (
    <>
    <Navbar />
    <div className="wrapper-list">
        <div className="search">
            <input className="input-search" type="search" placeholder="Search" value={searchTerm} onChange={handleSearchChange}/>
        </div>
    </div>
    <div className="textumkm-list">
        <h1>UMKM Membangun Negeri</h1>
        <p>UMKM atau Usaha Mikro Kecil Menengah adalah jenis usaha yang memiliki skala <br/> kecil dengan jumlah aset terbatas dan jumlah karyawan yang juga terbatas.</p>
        <div className="border-b-4 mt-6 w-3/4 border-gray-900"></div>
    </div>
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={10}
      slidesPerView={3}
      navigation
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="list-container">
          {filteredData.map((user) => (
            <SwiperSlide key={user.id}>
              <div className="user-image-container">
                <div className="md:w-1/2">
                  <UserPost id={user.id} nama_umkm={user.nama_umkm} profil_url={user.profil_url}/>
                </div>
              </div>  
            </SwiperSlide>
          ))}
        </ul>
      )}     
    </Swiper>
    </>
  );
}

export default List;
