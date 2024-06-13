let User = null 
// User is gonna equal the player that logs in, set attributes based on what character chosen. 
// Can possibly implement a view character section where they can set their info. Use the nav bar in mission and 
// celestial body pages to link back to character
// after login, possible character creation? They have to choose male female alien, then set their names
function PlayerSelectionCards(){
    let selectionHeading = <h1>Choose your character below</h1>
    
    let male = <div id='male' onClick={() => setUser(User)}> 
    {/*  Design the separate cards in css, add hover effect, add timers, switch between three pics, first pic stay on 
    for more than 5, when hover out reset to first pic. Add border effect? Add zoom effect with hovering over effect
    handle this on ALL cards  */}
                    <h1>Male Astronaut</h1>
                    <img src='image' alt='image of male astronaut'></img>
                    <p>Description of male astronaut</p>
                    <ul>
                        <li>Possible Implementation of characteristics listed below?</li>
                    </ul>
    </div>
    let female = <div id='female' onClick={() => setUser(User)}>
                    <h1>female Astronaut</h1>
                    <img src='image' alt='image of female astronaut'></img>
                    <p>Description of male astronaut</p>
                    <ul>
                        <li>Possible Implementation of characteristics listed below?</li>
                    </ul>
    </div>
    let alien = <div id='alien' onClick={() => setUser(User)}>
    {/* follow same design scheme for all cards, set user will be a state set function, add a SELECT? with hover over event
    then SELECT {BLANK} welcome to {BLANK} federation or whatever we decide, set time, stay on page for 5 seconds.
    POSSIBLE STRETCH GOAL: fade in black after 5 seconds, fade in text that desribes their mission, then enter
    spacecraft react component */}
                    <h1>alien</h1>
                    <img src='image' alt='image of alien'></img>
                    <p>Description of male astronaut</p>
                    <ul>
                        <li>Possible Implementation of characteristics listed below?</li>
                    </ul>
                    <a href="leads to the spacecraft react component so player can choose spacecraft"></a>
    </div>

    function handleEffects() {
        console.log('hello')
    }
    handleEffects()
    // handleEffects is gonna handle different effects based on which User state is setInterval, checks if user is set then 
    // decides what to do based on that info. 
    return (
        <>
            {selectionHeading}
            {male}
            {female}
            {alien}
        </>
    )
}
export default PlayerSelectionCards