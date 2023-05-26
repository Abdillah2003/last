import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import Navbar from "./Navbar";

const Edit = () => {
  const [nama_umkm, setNamaUmkm] = useState("");
  const [id_user, setIdUser] = useState("");
  const [profil_url, setProfilUrl] = useState("");
  const [gambar_umkm, setGambarUmkm] = useState("");
  const [detail_umkm, setDetailUmkm] = useState("");
  const [alamat_umkm, setAlamatUmkm] = useState("");
  const [motto_umkm, setMottoUmkm] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [access_token, setToken] =  useState([]);
  const [loading, setLoading] = useState(false)

  const [openMenu, setOpenMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const menus = ['Home', 'List UMKM', 'Gallery UMKM', 'Contact'];
  const profmenus = ['Account', 'Log Out'];
  const { id } = useParams();

  useEffect(() => {
    const access_token = localStorage.getItem('token');
    setToken(access_token);
  }, [access_token]);



  const editPhoto = (e) => {
    e.preventDefault();
    let data = {
      nama_umkm: nama_umkm,
      id_user: id_user,
      profil_url: profil_url,
      gambar_umkm: gambar_umkm,
      detail_umkm: detail_umkm,
      alamat_umkm: alamat_umkm,
      motto_umkm: motto_umkm,
      updatedAt: new Date()
    }
    
    fetch(`http://34.101.113.12/api/umkm/${id}`, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(el => el.json())
    .then(elHasil => {
      //console.log(elHasil)
      alert(
        "Foto Berhasil di Edit"
        )
        
      navigate("/list")
    })
  };
  useEffect(() => {
    setLoading(true);
    fetch(`http://34.101.113.12/api/umkm/${id}`)
    .then(hasil => {
      hasil.json()
      console.log(JSON.stringify(hasil))
    })

    .then(lastHasil => {
      setNamaUmkm(lastHasil.nama_umkm)
      setIdUser(lastHasil.id_user)
      setProfilUrl(lastHasil.profil_url)
      setGambarUmkm(lastHasil.gambar_umkm)
      setDetailUmkm(lastHasil.detail_umkm)
      setAlamatUmkm(lastHasil.alamat_umkm)
      setMottoUmkm(lastHasil.motto_umkm)
    })
    setLoading(false)
  }, [id]);
  const handleCancel = (e =>  {
    navigate("/list")
  })

  if (error) return <div>Error!</div>;

  return(
    <>
      <Navbar />
      <div className="container">
        {error && <div className="error-msg">{error}</div>}
        <h1 class="mt-10 shadow-black m-4 w-full text-center text-3xl font-serif border-b-4 border-black">FORM EDIT DATA UMKM</h1>
        <br></br>
        <form className="add-form" class="mt-5" onSubmit={editPhoto}>
        <label>
            <input
            type="text" id="nama_umkm" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-12 p-2 m-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Nama UMKM"
            value={nama_umkm}
            onChange={(e) => setNamaUmkm(e.target.value)}
            />
        </label>
        <label>
            <input
            type="text" id="id_user" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-12 p-2 m-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Id User"
            value={id_user}
            onChange={(e) => setIdUser(e.target.value)}
            />
        </label>
        <label>
            <input
            type="text" id="profil_url" class="m-4 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-12 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Profil URL"
            value={profil_url}
            onChange={(e) => setProfilUrl(e.target.value)}
            />
        </label>
        <label>
            <input
            type="text" id="gambar_umkm" class="m-4 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 h-12 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Gambar UMKM"
            value={gambar_umkm}
            onChange={(e) => setGambarUmkm(e.target.value)}
            />
        </label>


        <label>
            <input
            type="text" id="alamat_umkm" class="m-4 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 h-12 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Alamat UMKM"
            value={alamat_umkm}
            onChange={(e) => setAlamatUmkm(e.target.value)}
            />
        </label>
        <label>
            <input
            type="text" id="motto-umkm" class="m-4 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-12 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Motto UMKM"
            value={motto_umkm}
            onChange={(e) => setMottoUmkm(e.target.value)}
            />
        </label>
        <label>
            <textarea 
                id="detail_umkm" 
                class="m-4 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block w-full h-40 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                placeholder="Detail UMKM"
                value={detail_umkm}
                onChange={(e) => setDetailUmkm(e.target.value)}
            />
        </label>
        <button className="submit-btn" type="submit" value="Submit" data-testid="submit" class="bg-blue-700 rounded-lg mt-5 h-12 w-24 left-20 m-4" >Submit</button>
        <button
        onClick={handleCancel}
         className="cancle-btn" placeholder="" type="Cancel" value="Cancel" data-testid="Cancel" class="bg-red-700 rounded-lg mt-5 h-12 w-24 left-20 text-center"
        >Cancel</button>
        </form>
    </div>
    </>
);
};

export default Edit;
