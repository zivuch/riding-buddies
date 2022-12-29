import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import logo from './logo.jpg';
import '../styles/Navbar.css';


const NavLoggedIn = () => {

    const navigate = useNavigate()

    const logout = async() => {
        try{
            //********** removed http://localhost:3001 **********
            const response = await axios.delete('/logout')
            if(response.status === 200 || response.status === 204){
                navigate('/login')
            }
        }catch(e){
            console.log(e);
            navigate('/login')
        }
    }

    return(
        <Stack spacing={2} direction='row'>
            <Link to='/'>
            <img className='img' src={logo} alt='Logo'/>
            </Link>
            <Button id='btn' component={Link} to='/messages'>Messanger</Button>
            <Button id='btn'component={Link} to='/map'>Map</Button>
            <Button id='btn'component={Link} to='/profile'>Profile</Button>
            <Button id='btn' onClick={logout}>Logout</Button>
        </Stack>
    )
}
export default NavLoggedIn