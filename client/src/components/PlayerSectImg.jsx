import { NavLink } from 'react-router-dom';
import '../player.css'
import { useState } from 'react'
function PlayerSectImg({img, setImg, arrow, setArrow}){
    const [currentImage, setCurrentImage] = useState(0);
    let images = img 
    function handleImgChange(){
        setCurrentImage((currentImage + 1) % images.length)
    }
    function handleConfirmation(decision){
        if (decision == 'No'){
            setArrow(false)
            setImg(['https://ih1.redbubble.net/image.1114877515.6415/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg'])
        } else if (decision == 'Yes'){
            // make patch request 
            // change NavLink
            return decision
        }
    }
    return (
        <div className={arrow ? "playerImageSect": "invisibleImageSect"}>
            <img id="playerImageRotation" src={images[currentImage]}></img>
            <img  src='https://studio.code.org/v3/assets/kT_AOOARKKm6wZ_ZvqCkJYoSjzvb-yhHUTRrTUGJEYM/rocket2.gif' onClick={() => handleImgChange()} className="visibleArrow"></img>
            {/* change image */}
            <p>Select this space explorer?</p>
            <NavLink to='/'>
                <button id="yesButton" className='playerButton' onClick={() => handleConfirmation('Yes')}>Yes</button>
            </NavLink>
            
            <button id="noButton" className='playerButton' onClick={() => handleConfirmation('No')}>No</button>
        </div>
    )
}
export default PlayerSectImg