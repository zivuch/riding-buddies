import axios from 'axios';
import {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {Grid, Box, Typography, Paper, TextField, Button} from '@mui/material';
import '../styles/LoginForm.css';
import { AppContext } from '../App';
import Navbar from './Navbar';


const LoginForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('')

    const {setToken} = useContext(AppContext)

    const navigate= useNavigate()

    const handleClick = async () => {
        console.log('handleClick');
        try{
            //********** removed http://localhost:3001 **********
            const response = await axios.post('/login',{
                email, password
            },{
                headers:{
                    'Content-type': 'application/json'
                }
            })
            console.log(response.data);
            setToken(response.data.token)
            navigate('/profile')
        }catch(e){
            console.log(e.response.data) 
            setMsg(e.response.data.msg)
        }
    }
    return(
        <>
            <Navbar/>
            <Grid>
                <Paper id='paper' elevation={20} >
                    <Grid align='center'>
                        <h2 id='header'>Welcome Back</h2>
                        <Typography variant='caption'>Please enter your email and password</Typography>
                    </Grid>
                    <div>
                        <TextField fullWidth label='Email' placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                        <TextField fullWidth label='Password' placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/>
                        {/* <Button id = 'btn' variant='contained' color='primary' onClick={handleClick}>Log in</Button> */}
                    </div>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        >
                        <Button id = 'btn' variant='contained' color='primary' onClick={handleClick}>Log in</Button>
                    </Box>
                </Paper>
            </Grid>
            <div style={{color:'white', textAlign:'center'}}>{msg}</div> 
        </>   
    )
}
export default LoginForm

