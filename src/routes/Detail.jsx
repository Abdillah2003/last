import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";

function Detail() {
  const [dataDetail, setDataDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [access_token, setToken] = useState("");

  useEffect(() => {
    const access_token = localStorage.getItem("token");
    setToken(access_token);
    setLoading(true);

    fetch(`http://34.101.119.196/api/umkm/${id}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setDataDetail(data.data);
        setLoading(false);
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id, access_token]);

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-1">
            <img
              src={dataDetail.profil_url}
              alt="UMKM Profile"
              className="object-cover w-full h-96 rounded-lg"
            />
          </div>
          <div className="md:col-span-1 flex flex-col justify-center items-start">
            <h2 className="text-2xl font-bold mb-4">{dataDetail.nama_umkm}</h2>
            <p className="mb-4">{dataDetail.detail_umkm}</p>
            <p className="mb-4 font-bold">{dataDetail.motto_umkm}</p>
            <p className="mb-4 text-center md:text-left">{dataDetail.alamat_umkm}</p>
          </div>
        </div>
        <p className="text-gray-500 text-sm text-center md:text-left">
          {dataDetail.created_at}
        </p>
        
      </div>
    </div>
  );
}

export default Detail;
