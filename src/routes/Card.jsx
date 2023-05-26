import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './style.css';

const cardmenus = (id, onDelete) => [
    {
      name: "Edit",
      link: `/list/edit/${id}`,
    },
    {
      name: "Delete",
      onClick: onDelete,
    }
];
  
function UserPost({ id, nama_umkm, profil_url, onDelete }) {
    const [openCard, setOpenCard] = useState(false);
    const cardRef = useRef(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setOpenCard(false);
      }
    };
  
    const handleDetail = () => {
      navigate(`/list/${id}`);
    }

    const handleDelete = () => {
      const access_token = localStorage.getItem('token')

      fetch(`http://34.101.113.12/api/umkm/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        setLoading(true)
        alert("Data berhasil dihapus");
        onDelete(id); 
        navigate("/list") 
        // setLoading(true)
      })
      .catch(error => {
        console.log(error);
      });
    }
    if (loading) return <h1></h1>
    return (
    <div className="list-card">
      <div ref={cardRef}>
        <button
          className="btn-dots"
          onClick={() => setOpenCard(!openCard)}
        >
          &#10247;
        </button>
        {openCard && (
          <div className="bg-slate-300 opacity-50 m-3 p-4 w-46 shadow-lg absolute text-center right-4 top-20 rounded-lg">
            <ul>
              {cardmenus(id, handleDelete).map((menu) => (
                <li
                  className="font-bold p-2 text-lg cursor-pointer rounded hover:bg-blue-700"
                  key={menu.name}
                  onClick={() => {
                    if (menu.link) {
                      navigate(menu.link);
                    } else if (menu.onClick) {
                      menu.onClick(); // memanggil fungsi onClick ketika opsi "Delete" dipilih
                      setOpenCard(false);
                    }
                  }}
                >
                  {menu.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="user-image-container">
          <img className="user-image" src={profil_url} alt={nama_umkm} />
        </div>
        <div className="user-name">{nama_umkm}</div>
        <div className="btn-card">
          <button onClick={handleDetail}>Detail</button>
        </div>
      </div>
    </div>
  );
}

export default UserPost;