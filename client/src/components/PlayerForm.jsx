import { useState } from "react"
function PlayerForm( {setVisiblePlayerImage, visiblePlayerImage}){
    const [user, setUser] = useState("")
    const [lore, setLore] = useState("")
    const [images, setImages] = useState("")
    if (setVisiblePlayerImage == true){
        console.log('Bitch')
    } else {
        console.log('Hoe')
    }
    function handleSubmit(e) {
        e.preventDefault()
        let block = document.getElementById('inputContainer')
        block.style.transform = 'translateX(-300px)'
        setTimeout(function () {
            setVisiblePlayerImage(true)
        }, 800)
    }
    function handleTransition() {
        if (visiblePlayerImage == true){
            setVisiblePlayerImage(false)
            setTimeout(function () {
                let block = document.getElementById('inputContainer')
                block.style.transform = 'translateX(5px)'
                
            }, 400)
        }
    }
        
    
    return (
        <div >
            <div id={visiblePlayerImage ? 'playerImageNone': 'inputContainer'}>
                <h1 id='creationHeading'>Create your own character!</h1>
                <form onSubmit={handleSubmit} id="playerForm">
                <label for="fname" className='labels'>User</label>
                <br></br>
                <input type="text" id="userCreationText" className="inputCreation"name="fname" 
                onChange={(e) => setUser(e.target.value)} value={user}></input>
                <br></br>
                <label for="image" className="labels">Image</label>
                <br></br>
                <input type="text" id="imageCreationText" name="image" className="inputCreation" 
                onChange={(e) => setImages(e.target.value)}
                value={images}></input>
                <br></br>
                <label for="image" className="labels">Image</label>
                <br></br>
                <input type="text" id="imageCreationText" name="image" className="inputCreation" 
                onChange={(e) => setImages(e.target.value)}
                value={images}></input>
                <br></br>
                <label for="image" className="labels">Image</label>
                <br></br>
                <input type="text" id="imageCreationText" name="image" className="inputCreation" 
                onChange={(e) => setImages(e.target.value)}
                value={images}></input>
                <br></br>
                <p id="creationSelect"></p>
                <label for="equipment" className="labels">Equipment</label>
                <br></br>
                <input type="text" id="imageCreationText" name="equipment" className="inputCreation" 
                onChange={(e) => setImages(e.target.value)}
                value={images}></input>
                <br></br>
                <label for="lore" className="labels">Story:</label>
                <br></br>
                <textarea id='loreCreationText' name="lore" rows='4' cols='50' maxLength='600'
                onChange={(e) => setLore(e.target.value)} value={lore}></textarea>
                <br></br> 
                <input type="submit" value="S u b m i t" id="submitCreation" ></input>
                </form>
                
                
            </div>
            <div id={visiblePlayerImage ? 'playerInfo' : 'playerImageNone'}>
                <h1 className="playerHeading">Despite Everything, It's Still You!</h1>
                <h3 className="playerHeading">Player Name:</h3>
                <p className="playerHeading" >Urah</p>
                <h3 className="playerHeading">Equipment:</h3>
                <p className="playerHeading">Ray Gun</p>
                <h3 className="playerHeading">Story:</h3>
                <p className="playerHeading">Hello</p>
                <button className="playerEditButton" onClick={() => handleTransition()}> Edit </button>
            </div>
        </div>
    )
}

export default PlayerForm
