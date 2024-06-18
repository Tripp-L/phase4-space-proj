import { useState } from "react"
function PlayerForm(){
    const [user, setUser] = useState("")
    const [lore, setLore] = useState("")
    const [images, setImages] = useState("")
    function handleSubmit() {
        console.log('logging')
    }
    return (
        <div >
            <div id='inputContainer'>
                <h1 id='creationHeading'>Create your own character!</h1>
                <form onSubmit={handleSubmit}>
                <label for="fname" className='labels'>User</label>
                <br></br>
                <input type="text" id="userCreationText" className="inputCreation"name="fname" 
                onChange={(e) => setUser(e.target.value)} value={user}></input>
                <br></br>
                <label for="lore" className="labels">Lore</label>
                <br></br>
                <textarea id='loreCreationText' name="lore" rows='4' cols='50' maxLength='600' className="inputCreation"
                onChange={(e) => setLore(e.target.value)} value={lore}></textarea>
                <br></br>
                <label for="image" className="labels">Image</label>
                <br></br>
                <input type="text" id="imageCreationText" name="image" className="inputCreation" 
                onChange={(e) => setImages(e.target.value)}
                value={images}></input>
                <br></br>
                <p id="creationSelect"></p>
                
                <input type="submit" value="S u b m i t" id="submitCreation" ></input>
                
                </form>
                
            </div>
        </div>
    )
}

export default PlayerForm