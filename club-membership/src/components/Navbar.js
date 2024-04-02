import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png'
import '../styles/index.css'

export const Navbar = () => {
    return (
        <div className=' bg-gray-700 flex flex-row justify-between items-center w-full h-36 px-44'>
            <Link to="/">
                <img src={Logo} alt="logo" className=' h-28'/>
            </Link>
            <h1 className=' text-white fancy text-6xl'>Welcome to our dance club!</h1>
        </div>
      );
};

export default Navbar