import info from './info.json' assert { type: "json"};

var data = info;

// console.log(Object.keys(data));
var keys = Object.keys(data);
var choices = Object.values(data)
// console.log(data['video1'])

let test11 = [];
for (const k in data)
{
    test11.push(k);
}
 
class Node {
    constructor(video)
    {
        this.url = data[video].url;
        this.choice1 = new Answer(video, 'choice1');
        this.choice2 = new Answer(video, 'choice2');
        this.choice3 = new Answer(video, 'choice3');
        this.choice4 = new Answer(video, 'choice4');
    }    
}

class Answer {

    constructor(videoNo, answerNo)
    {
        this.text = null;
        this.tip = null;
        this.progression = null;

        for (const i in keys)
        { 
            let test = videoNo;
            let test2 = answerNo;
            if(keys[i] == test)
            {
                for (const j in data[keys[i]])
                {
                    if (j == test2)
                    {
                        this.text = data[keys[i]][j].text;
                        this.tip = data[keys[i]][j].tip;
                        this.progression = data[keys[i]][j].progression;
                    }
                }
            }
        }
    }
}

let test = new Node('video1')
console.log(test)

class LinkedList {

    constructor()
    {
        this.head = null;
        this.next = null;
        this.prev = null;
    }

    append(node) 
    {
        if (this.next == null)
        {
            this.next = node
        }

        else
        {
            this.next.append(node)
        }
    }
}


var videoList = new LinkedList();
videoList.head = test;
console.log(videoList.head);


// alert(videoList.head.video);
// alert(videoList.head.choice1.video);


let currentVideo = videoList.head;



document.getElementById("embedVideo").src = currentVideo.url;
document.getElementById("gameScreen").style.visibility= "visible";
document.getElementById("videoControls").style.visibility= "visible";

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

var pause = document.getElementById("pauseVideoButton");
var mute = document.getElementById("muteVideoButton");
var play = document.getElementById("playVideoButton");

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
document.getElementById('embedVideo').addEventListener('ended',afterVideo);
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

