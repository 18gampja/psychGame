fetch("info.json")
    .then(response => response.json())
    .then(data => {
        console.log(data.video1.choice1[1])
    })

    class Node {
        constructor(video)
        {
            this.video = video;
            this.choice1 = new Answer();
            this.choice2 = null;
            this.choice3 = null;
            this.choice4 = null;
        }    
    }
    
    class Answer {
    
        constructor(choice, text, check = false)
        {
            this.choice = choice;
            this.check = check;
            this.text = text;
        }
    }
    
    class LinkedList {
        constructor()
        {
            this.head = null;
            this.tail = null;
        }
    }
    
    
    var videoList = new LinkedList();
    videoList.head = new Node("../videos/1-Video.mp4");
    videoList.head.choice1 = new Node("../videos/2-Video.mp4");
    videoList.head.choice2 = new Node("../videos/3-Video.mp4");
    videoList.head.choice3 = new Node("../videos/4-Video.mp4");
    videoList.head.choice4 = new Node("../videos/5-Video.mp4");
    
    
    // alert(videoList.head.video);
    // alert(videoList.head.choice1.video);
    
    let currentVideo = videoList.head;
    
    function videoAppear(){
        document.getElementById("mainVideo").src = currentVideo.video;
        document.getElementById("gameScreen").style.visibility= "visible";
        document.getElementById("videoControls").style.visibility= "visible"; 
    }
    
    // Get the modal
    var modal = document.getElementById("fileModal");
    
    // Get the button that opens the modal
    var btn = document.getElementById("fileButton");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    
    // When the user clicks on the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
    // Video controls
    var vid = document.getElementById('mainVideo');
    var supposedCurrentTime = 0;
    vid.addEventListener('timeupdate', function() {
        if (!vid.seeking) {
            supposedCurrentTime = vid.currentTime;
        }
    });
    vid.addEventListener('seeking', function() {
        var delta = vid.currentTime - supposedCurrentTime;
        var okay = vid.currentTime > supposedCurrentTime;
        if (Math.abs(delta) > 0.01 & okay) {
        vid.currentTime = supposedCurrentTime;
        }
    });
    vid.addEventListener('ended', function() {
        supposedCurrentTime = 0;
    });
    
    pause = document.getElementById("pauseVideoButton");
    mute = document.getElementById("muteVideoButton");
    play = document.getElementById("playVideoButton");
    
    function playVid() {
        vid.play();
    }
    
    function pauseVid() {
        vid.pause();
    }
    
    function muteVid() {
        if(vid.muted == true){
        mute.innerHTML = 'Mute';
        vid.muted = false;
        } else {
        mute.innerHTML = 'Unmute';
        vid.muted = true;
        }
    }
    play.addEventListener("click", playVid);
    pause.addEventListener("click", pauseVid);
    mute.addEventListener("click", muteVid);
    // End video controls
    
    
    // Post video shit
    document.getElementById('mainVideo').addEventListener('ended',afterVideo);
    function lockOptions(){
        var options = document.getElementById('videoControls');
        // options.style.visibility= "hidden";
        // options.style.display = 'none';
    }
    
    function afterVideo() {
        lockOptions();
        var prm1 = document.getElementById('prompt1');
        prm1.style.display = "inline-flex";
        var prm2 = document.getElementById('prompt2');
        prm2.style.display = "inline-flex";
        var prm3 = document.getElementById('prompt3');
        prm3.style.display = "inline-flex";
        var prm4 = document.getElementById('prompt4');
        prm4.style.display = "inline-flex";
    }
    
    
    // Choice controls
    document.getElementById("prompt1").addEventListener("click", direction1);
    document.getElementById("prompt2").addEventListener("click", direction2);
    document.getElementById("prompt3").addEventListener("click", direction3);
    document.getElementById("prompt4").addEventListener("click", direction4);
    
    var prm1 = document.getElementById('prompt1');
    var prm2 = document.getElementById('prompt2');
    var prm3 = document.getElementById('prompt3');
    var prm4 = document.getElementById('prompt4');
    var tipReply = document.getElementById('tip');
    
    function unlockOptions(){
        var options = document.getElementById('videoControls');
        options.style.visibility= "visible";
    }
    
    if(currentVideo.choice1) {
        document.getElementById("prompt1").style.visibility= "visible";
    }
    if(currentVideo.choice2) {
        document.getElementById("prompt2").style.visibility= "visible";
    }
    if(currentVideo.choice3) {
        document.getElementById("prompt3").style.visibility= "visible";
    }
    if(currentVideo.choice4) {
        document.getElementById("prompt4").style.visibility= "visible";
    }
    
    function direction1(){
        // alert('Direction 1!');
        
        prm1.style.backgroundColor = "#de821f"; //OK respone 
        tip.textContent = 'Not the worst response.  What else can you say to Mrs. Jones to facilitate a home visit?';
        tip.style.visibility = "visible";
        
        prm1.style.display = "none";
        prm2.style.display = "none";
        prm3.style.display = "none";
        prm4.style.display = "none";
    
        unlockOptions();
    
        // currentVideo = currentVideo.choice1;
        // document.getElementById("mainVideo").src = currentVideo.video;
    
    }
    
    function direction2(){
        // alert('Direction 2!');
        
        prm2.style.backgroundColor = "#bd0f0f"; //BAD respone 
        tip.textContent = 'Not a good response!  How might you deliver this message differently?';
        tip.style.visibility = "visible";
        
        prm1.style.display = "none";
        prm2.style.display = "none";
        prm3.style.display = "none";
        prm4.style.display = "none";
    
        unlockOptions();
    
        // currentVideo = currentVideo.choice2;
        // document.getElementById("mainVideo").src = currentVideo.video;
    }
    
    function direction3(){
        // alert('Direction 3!');
        
        prm3.style.backgroundColor = "#44f50f"; //GOOD respone 
        tip.textContent = 'Good!  This response is less likely to elicit a defensive response from the client while continuing to allow her a choice to participate.';
        tip.style.visibility = "visible";
        
        prm1.style.display = "none";
        prm2.style.display = "none";
        prm3.style.display = "none";
        prm4.style.display = "none";
    
        unlockOptions();
    
        currentVideo = currentVideo.choice3;
        document.getElementById("mainVideo").src = currentVideo.video;
    }
    
    function direction4(){
        // alert('Direction 4!');
    
        prm4.style.backgroundColor = "#de821f"; //OK respone 
        tip.textContent = 'Not the worst response.  What else can you say to Mrs. Jones to facilitate a home visit?';
        tip.style.visibility = "visible";
        
        prm1.style.display = "none";
        prm2.style.display = "none";
        prm3.style.display = "none";
        prm4.style.display = "none";
    
        unlockOptions();
    
        // currentVideo = currentVideo.choice4;
        // document.getElementById("mainVideo").src = currentVideo.video;
    }
    // End choice controls