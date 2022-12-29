import {useState, useEffect} from 'react'
import {redirect} from "react-router-dom";

const Users = (props) => {
    
    const [users, setUsers] = useState([])

    useEffect (()=>{
        //********** removed http://localhost:3001 **********
        fetch('/users')
        .then(res => {
            if(res.status === 200){
                return res.json()
            }
            else{
                redirect('/login')
            }
        })
        .then(data => {
            setUsers(data)
        })
        .catch(e=>{
            console.log(e);
        },[])
    })

    if (users.length === null) return null

    return(
        <div>

        {
            users ? users.map(item=>{
                return(
                    <div key={item.id}>
                        {item.id} : {item.email}
                    </div>
                )
            }) : 'Unauthorized'
        }

        </div>
    )
}

export default Users