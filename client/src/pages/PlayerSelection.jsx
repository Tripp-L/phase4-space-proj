import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom"
import PlayerSelectionCards from "../components/Player"
function PlayerSelection( {User}) {
    // const [user, setUser] = useState('') this is meant to be set in login
    function handleUserAttr(){
        if (User == 'Male Astronaut'){
            // send a patch or post request to user information on backend
            return User
        } else if (User == 'Female Astronaut'){
            return User 
        } else if (User == 'Alien'){
            return User
        }

    }
    // No fetching in the beginning as the info will be hard coded in
    return (
        <>
            <PlayerSelectionCards User={User} />
        </>
    )
}
export default PlayerSelection