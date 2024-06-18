import '../player.css'
import PlayerImageReview from '../components/PlayerImageReview'
import PlayerForm from '../components/PlayerForm'
import { useState } from "react"
function PlayerCreation(){
    const [user, setUser] = useState("")
    const [lore, setLore] = useState("")
    const [images, setImages] = useState("")

    const [visiblePlayerImage, setVisiblePlayerImage] = useState(false)

    function handleSubmit() {
        console.log('logging')
    }
    return (
        <div id='test'>

            <PlayerForm visiblePlayerImage={visiblePlayerImage} setVisiblePlayerImage={setVisiblePlayerImage}/>
            <PlayerImageReview visiblePlayerImage={visiblePlayerImage}/>

        </div>
        
    )
    
}
export default PlayerCreation