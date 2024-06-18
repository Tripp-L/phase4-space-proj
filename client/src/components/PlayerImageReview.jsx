function PlayerImageReview({visiblePlayerImage}){
    let images = ['https://cdnb.artstation.com/p/assets/images/images/034/008/543/original/jade-guilbot-astronaute-idle-gif.gif?1611154641', 'https://media.tenor.com/zaSpqiXC8s8AAAAj/comet.gif']
    function rotatingImages(imageSet){ 
        let currentIndex = 0;
        let slideshowImage = document.getElementById('playerImage');
        if (!slideshowImage){
            return false
        } else {
            let images = imageSet
            function nextImage() {
                slideshowImage.style.opacity = '0'; 
                setInterval(function() {
                    currentIndex = (currentIndex + 1) % images.length; 
                    slideshowImage.src = images[currentIndex]; 
                    slideshowImage.style.opacity = '1'; 
                }, 5000); 
            }
        nextImage()
        }
        
    }
    rotatingImages(images)
    
    return (
        <div id={visiblePlayerImage ? 'playerImageContainer': 'playerImageNone'}>
            <img id='playerImage' ></img>
        </div>
    )
}

export default PlayerImageReview