import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import logo from './logo.jpg';
import '../styles/Navbar.css';


const Navbar = () => {

    return(
        <Stack spacing={2} direction='row'>
            <Link to='/'>
                <img className='img' src={logo} alt='Logo'/>
            </Link>
            <Button id='btn'component={Link} to='/login'>Login</Button>
            <Button id='btn'component={Link} to='/register'>Register</Button>
        </Stack>
    )
}
export default Navbar