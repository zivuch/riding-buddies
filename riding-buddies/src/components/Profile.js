import {useContext, useEffect} from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import NavLoggedIn from './NavLoggedIn'

const Profile = (props) => {

    const {token, setToken} = useContext(AppContext)
    const navigate = useNavigate()

    useEffect (() => {
        try{
            const decode = jwt_decode(token)
            const expire = decode.exp;
            if(expire * (60* 60* 1000) < new Date().getTime()){
                navigate('/login')
            }
        }catch(e){
            console.log(e);
            setToken(null)
            navigate('/login')
        }   
    })  

    return(
        <>
        <NavLoggedIn/>
        <h1 style={{color:'white'}}>Profile page is under construction</h1>
        <h3 style={{color:'white'}}>Meanwhile feel free to find friends on Map (👆)</h3>
        <h3 style={{color:'white'}}>* Dont forget to click on the marker icon to get the ridder's info *</h3>
        <h3 style={{color:'white'}}>And coonect via a live chat in Messanger (👆)</h3>
        </>
    )
}
export default Profile