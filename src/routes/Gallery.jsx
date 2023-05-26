import { useState, useEffect } from "react";
import Navbar from "./Navbar";

function Gallery() {
  const [sort, setSort] = useState("asc");
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
      setData(data.data.sort((a, b) => {
        if (sort === 'asc') {
          return a.nama_umkm.localeCompare(b.nama_umkm);
        } else {
          return b.nama_umkm.localeCompare(a.nama_umkm);
        }
      }));
      // setData(data.data);
      setLoading(false);
    }).catch(error => {
      console.log(error)
      setLoading(false)
    })
  },[sort])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) => {
    const namaUmkm = item.nama_umkm.toLowerCase();
    const searchTermLowerCase = searchTerm.toLowerCase();

    return namaUmkm.includes(searchTermLowerCase);
  });

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <div className="w-1/3">
            <select
              onChange={(e) => setSort(e.target.value)}
              data-testid="sort"
              className="px-4 py-2 rounded border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div className="w-2/3">
            <input
              className="w-full px-4 py-2 rounded border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8">Gallery UMKM</h1>
        {filteredData.map((user) => (
          <div
            key={user.id}
            className="flex justify-between items-center mb-8"
          >
            <div className="w-1/3">
              <img
                className="rounded-lg w-full"
                src={user.gambar_umkm}
                alt={user.nama_umkm}
              />
            </div>
            <div className="w-2/3 px-4">
              <h1 className="text-2xl font-bold mb-2">{user.nama_umkm}</h1>
              <h2 className="text-lg font-semibold mb-2">{user.detail_umkm}</h2>
              <p className="text-gray-700">{user.motto_umkm}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Gallery;
