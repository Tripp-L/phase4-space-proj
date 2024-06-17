import '../player.css'
import PlayerImageReview from '../components/PlayerImageReview'
import PlayerForm from '../components/PlayerForm'
import { useState } from "react"
function PlayerCreation(){
    const [user, setUser] = useState("")
    const [lore, setLore] = useState("")
    const [images, setImages] = useState("")
    function handleSubmit() {
        console.log('logging')
    }
    return (
        <div id='test'>
            <PlayerForm />
            <PlayerImageReview />
        </div>
        
    )
    
}
export default PlayerCreation