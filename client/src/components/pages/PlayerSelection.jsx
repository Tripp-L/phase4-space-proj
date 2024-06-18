import PlayerSectImg from "../components/PlayerSectImg"
import Player from "../components/Player"
import '../player.css'
import { useState } from "react"
function PlayerSelection() {
    const [img, setImg] = useState(['https://ih1.redbubble.net/image.1114877515.6415/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg'])
    const [arrow, setArrow] = useState(false)
    return (
        <div id='test'>
            <Player setImg={setImg} setArrow={setArrow} />
            <PlayerSectImg img={img} setImg={setImg} arrow={arrow} setArrow={setArrow} />
        </div>
    )
}
export default PlayerSelection