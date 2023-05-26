import Logo from "../assets/logo.png";
import { FaUserCircle } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './style.css';

const menus = [
    { 
      name: "Dashboard", 
      link: "/dashboard",
    },
    {
      name: "List UMKM", 
      link: "/list",
    },
    {
      name: "Gallery UMKM", 
      link: "/gallery",
    },
    {
      name: "Contact", 
      link: "/contact",
    },
    {
      name: "Add", 
      link: "/add",
    },
];
  
const profmenus = [
    {
      name: "Account",
      link: "/profile",
    },
    { 
      name: "Log Out",
      link: "/login"
    },
];

function Navbar() {
    const [openMenu, setOpenMenu] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const menuRef = useRef(null);
    const profileRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setOpenMenu(false);
        }
        if (profileRef.current && !profileRef.current.contains(event.target)) {
          setOpenProfile(false);
        }
    };

    return (
        <>
        <div className='header'>
          <div className='navbar'>
            <div className="imgs">
              <div className="container-image">
                <img src={Logo} alt="logo" className="logo"/>
              </div>
            </div>
            <ul className='nav-menu ml-auto cursor-pointer'>
              <li>
                <div className="relative" ref={menuRef}>
                  <h1 className='menu' onClick={() => setOpenMenu(!openMenu)}>Menu</h1>
                  {openMenu && (
                    <div className="bg-slate-300 opacity-50 m-3 p-4 w-64 shadow-lg absolute text-center -left-28 top-16 rounded-lg">
                      <ul>
                        {menus.map((menu) => (
                          <li 
                            className="font-bold p-2 text-lg cursor-pointer rounded hover:bg-blue-700"
                            key={menu.name}
                            onClick={() => {
                              navigate(menu.link);
                              setOpenMenu(false);
                            }}
                          >
                            {menu.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
              <li>
                <div className="relative right-3" ref={profileRef}>
                  <FaUserCircle  size='3rem' color='gray' onClick={() => setOpenProfile(!openProfile)}/>
                  {openProfile && (
                    <div className="bg-slate-300 opacity-50 m-3 p-4 w-46 shadow-lg absolute text-center -left-20 top-16 rounded-lg">
                      <ul>
                        {profmenus.map((menu) => (
                          <li 
                            className="font-bold p-2 text-lg cursor-pointer rounded hover:bg-blue-700" 
                            key={menu.name}
                            onClick={() => {
                              navigate(menu.link);
                              setOpenProfile(false);
                            }}
                          >
                            {menu.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
        </>
    );
}

export default Navbar;
