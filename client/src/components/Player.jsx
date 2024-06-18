import '../player.css';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
let User = null 
function Player({setImg, setArrow}){
    let confirmationSelection = false 
    let selectionHeading = <h1 className="selectionHeading" >Select</h1>
    
    let male = <div id='male' className="selectionBox" onClick={() => handleImg('male')}> 
                    <h1>Male Astronaut</h1>
                    <img src='https://ih1.redbubble.net/image.1114877515.6415/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg' alt='image of male astronaut'></img>
    </div>
    let female = <div id='female' className="selectionBox" onClick={() => handleImg('female')}>
                    <h1>female Astronaut</h1>
                    <img src='https://ih1.redbubble.net/image.1114877515.6415/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg' alt='image of female astronaut'></img>
    </div>
    let alien = <div id='alien' className="selectionBox" onClick={() => handleImg('alien')}>
                    <h1>alien</h1>
                    <img src='https://ih1.redbubble.net/image.1114877515.6415/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg' alt='image of alien'></img>
    </div>
    let create = <NavLink to="/player-creation">
                    <div id='create' className='selectionBox' >
                    <Link to="/player-creation">Create Your Own!</Link>
                    <img id='createImage' src='https://ih1.redbubble.net/image.1114877515.6415/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg'></img>
        </div>
    </NavLink>


    function handleImg(user){
        if (user == 'male'){
            let images = ['https://ih1.redbubble.net/image.1114877515.6415/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg', 'https://ih1.redbubble.net/image.1114877515.6415/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg', 'https://ih1.redbubble.net/image.1114877515.6415/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg']
            setImg(images)
            setArrow(true)
        } else if (user == 'female'){
            let images = ['https://ih1.redbubble.net/image.1114877515.6415/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg', 'https://ih1.redbubble.net/image.1114877515.6415/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg', 'https://ih1.redbubble.net/image.1114877515.6415/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg']
            setImg(images)
            setArrow(true)
        } else if (user == 'alien'){
            let images = ['https://ih1.redbubble.net/image.1114877515.6415/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg', 'https://ih1.redbubble.net/image.1114877515.6415/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg', 'https://ih1.redbubble.net/image.1114877515.6415/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg']
            setImg(images)
            setArrow(true)
        } 
    }

    
    return (
        <div>
            {selectionHeading}
            {male}
            {alien}
            {female}
            {create}
            {/* {confirmationBox} */}
        </div>
    )
}
export default Player