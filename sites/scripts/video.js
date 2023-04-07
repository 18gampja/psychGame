// Importing the json file and initializing the information in a way we can read it
// This was stupid and I hated it

import info from './info.json' assert { type: "json"};

var data = info;

var choiceMade = false;

var keys = Object.keys(data);

let vids = [];
for (const k in data)
{
    vids.push(k);
}
 

// I implemented the list dumb, but the node itself is everything we need for the video player basically
// It uses the info parsed from the json file, eat my dick manual coding

class Node {
    constructor(video = null)
    {
        if (video != null)
        {
            // this.url = "https://drive.google.com/uc?export=download&id=" + data[video].url;
            this.url = "https://drive.google.com/uc?id=" + data[video].url;
            this.choice1 = new Answer(video, 'choice1');
            this.choice2 = new Answer(video, 'choice2');
            this.choice3 = new Answer(video, 'choice3');
            this.choice4 = new Answer(video, 'choice4');
            this.endOfVid = data[video].endOfVid;
        }
        
        else
        {
            this.url = null;
            this.choice1 = null;
            this.choice2 = null;
            this.choice3 = null;
            this.choice4 = null;
            this.endOfVid = null;
        }
    }    
}

// This is the class for answers. This is used by the Node class. It parses the json info and pairs everything up
// in a way that is pleasing to the balls resting in your brain sockets.

class Answer {

    constructor(videoNo, answerNo)
    {
        this.text = null;
        this.tip = null;
        this.progression = null;

        for (const i in keys)
        { 
            let vidNo = videoNo;
            let ansNo = answerNo;
            if(keys[i] == vidNo)
            {
                for (const j in data[keys[i]])
                {
                    if (j == ansNo)
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

// Here's the linked list. It's mostly untouched honestly, but I added some functions
// to the class itself. It should completely automate adding shit to the list, as well 
// as traversal forward and backward.

class LinkedList {

    constructor(node = null, prev = null)
    {
        if (node != null)
        {
            this.head = node;
            this.next = null;
            this.prev = prev;
        }

        else
        {
            this.head = null;
            this.next = null;
            this.prev = null;  
        }
        
    }

    append(node) 
    {
        if (this.head == null)
        {
            this.head = node
        }

        else if(this.next == null)
        {
            this.next = new LinkedList(node, this)
        }

        else
        {
            this.next.append(node)
        }
    }

    progress()
    {
        if (this.next != null)
        {
            videoList = this.next
            currentVideo = videoList.head
            hidePrompts()
            clearAnswers()
            updateVid()
        }
    }

    previous()
    {
        if (this.prev != null)
        {
            videoList = this.prev
            currentVideo = videoList.head
            hidePrompts()
            clearAnswers()
            updateVid()
        }
    }
}

// Initializing the linked list. We parse through the "video titles" to access the json file,
// then create the nodes, then insert the nodes. Eat my dick manual coding.

let videoList = new LinkedList()

for (let i = 0; i < vids.length; i ++)
{

    let newVid = new Node(vids[i])
    
    if (videoList.head == null)
    {
        videoList.head = newVid
    }

    else
    {
        videoList.append(newVid)
    }
    
}

// Pointing to the current video. 
let currentVideo = videoList.head;

// HTML is stupid
updateVid()


// Get Caption button. Temporarily houses the "Previous Video" function

var capBtn = document.getElementById("captionButton");

capBtn.onclick = function()
{
    videoList.previous()
    document.getElementById("tip").style.visibility = "hidden";
    document.getElementById("confirmButton").style.visibility = "hidden";
    clearAnswers()
    
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
var vid = document.getElementById('embedVideo');
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


// HTML is really stupid 

function hidePrompts()
{
    prm1.style.display = "none";
    prm2.style.display = "none";
    prm3.style.display = "none";
    prm4.style.display = "none";
}

function updateVid()
{
    document.getElementById("embedVideo").src = currentVideo.url;
    document.getElementById("gameScreen").style.visibility= "visible";
    document.getElementById("videoControls").style.visibility= "visible";
}

function playVid() {
    vid.play();
}

function pauseVid() {
    vid.pause();
}

function muteVid() {
    if(vid.muted == true){
    // mute.innerHTML = 'Mute';
    mute.innerHTML = '<img src="https://img.icons8.com/ios/30/737373/high-volume--v1.png"/>';
    vid.muted = false;
    } else {
    // mute.innerHTML = 'Unmute';
    mute.innerHTML = '<img src="https://img.icons8.com/ios/30/null/no-audio--v1.png"/>'
    vid.muted = true;
    }
}

// Clear Answer Colors on progression and regression
function clearAnswers() {
    prm1.style.backgroundColor = "bisque";
    prm2.style.backgroundColor = "bisque";
    prm3.style.backgroundColor = "bisque";
    prm4.style.backgroundColor = "bisque";
}

play.addEventListener("click", playVid);
pause.addEventListener("click", pauseVid);
mute.addEventListener("click", muteVid);
// End video controls


// Post video shit
document.getElementById('embedVideo').addEventListener('ended',afterVideo);
function lockOptions(){
    var options = document.getElementById('videoControls');
}

function afterVideo() {
    lockOptions();

    if (currentVideo.choice1.text === 'none' && currentVideo.choice2.text === 'none' && currentVideo.choice3.text === 'none' && currentVideo.choice4.text === 'none' && currentVideo.endOfVid === 'False') {
        var confirmButton = document.getElementById('continueButton');
        confirmButton.textContent = 'Continue';
        confirmButton.style.visibility = 'visible'
        
        confirmButton.addEventListener('click', proceed);
        return;
    }
    else if (currentVideo.endOfVid === 'True') {
        var confirmButton = document.getElementById('continueButton');
        confirmButton.textContent = 'Finish';
        confirmButton.style.visibility = 'visible';
        
        confirmButton.addEventListener('click', finish);
        return;
    }

    var prm1 = document.getElementById('prompt1');
    var prm1_h1 = document.getElementById('prompt_h1');
    prm1.style.display = "inline-flex";
    prm1_h1.innerHTML = currentVideo.choice1.text

    var prm2 = document.getElementById('prompt2');
    var prm2_h1 = document.getElementById('prompt_h2');
    prm2.style.display = "inline-flex";
    prm2_h1.innerHTML = currentVideo.choice2.text

    var prm3 = document.getElementById('prompt3');
    var prm3_h1 = document.getElementById('prompt_h3');
    prm3.style.display = "inline-flex";
    prm3_h1.innerHTML = currentVideo.choice3.text

    var prm4 = document.getElementById('prompt4');
    var prm4_h1 = document.getElementById('prompt_h4');
    prm4.style.display = "inline-flex";
    prm4_h1.innerHTML = currentVideo.choice4.text

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
var confirmButton = document.getElementById('continueButton');
confirmButton.textContent = 'Try again';

confirmButton.addEventListener('click', proceed);

function proceed()
{

    if (confirmButton.textContent != 'Continue')
    {
        confirmButton.style.visibility = 'hidden'
        tip.style.visibility = 'hidden'
        choiceMade = false;
        hidePrompts()
        vid.currentTime = 0;
        playVid()
        return;
    }

    confirmButton.style.visibility = 'hidden'
    tip.style.visibility = 'hidden'
    choiceMade = false;
    videoList.progress()
    return;

}

function finish()
{
    location.href = './end.html';
}

function unlockOptions(){
    var options = document.getElementById('videoControls');
    options.style.visibility= "visible";
}

// I updated these briefly to work with the new linked list
// and information storage system. Gratiously, this did not require much change.

function direction1(){
    
    if (choiceMade == true) return;

    prm1.style.backgroundColor = "#bd0f0f";
    confirmButton.textContent = 'Try again';
    tip.textContent = currentVideo.choice1.tip;
    tip.style.visibility = "visible";
    choiceMade = true

    if (currentVideo.choice1.progression == 'True')
    {
        prm1.style.backgroundColor = '#44f50f'
        confirmButton.textContent = 'Continue'
    }

    if (currentVideo.choice1.progression == 'ok')
    {
        prm1.style.backgroundColor = '#fa9048'
    }

    confirmButton.style.visibility = 'visible'

    unlockOptions();
}

function direction2(){
    
    if (choiceMade == true) return;

    prm2.style.backgroundColor = "#bd0f0f"; 
    confirmButton.textContent = 'Try again';
    tip.textContent = currentVideo.choice2.tip;
    tip.style.visibility = "visible";
    choiceMade = true

    if (currentVideo.choice2.progression == 'True')
    {
        prm2.style.backgroundColor = '#44f50f'
        confirmButton.textContent = 'Continue'
    }

    if (currentVideo.choice2.progression == 'ok')
    {
        prm2.style.backgroundColor = '#fa9048'
    }

    confirmButton.style.visibility = 'visible'

    unlockOptions();
}

function direction3(){
    
    if (choiceMade == true) return;

    prm3.style.backgroundColor = "#bd0f0f"; 
    confirmButton.textContent = 'Try again'; 
    tip.textContent = currentVideo.choice3.tip;
    tip.style.visibility = "visible";
    choiceMade = true

    if (currentVideo.choice3.progression == 'True')
    {
        prm3.style.backgroundColor = '#44f50f'
        confirmButton.textContent = 'Continue'
    }

    if (currentVideo.choice3.progression == 'ok')
    {
        prm3.style.backgroundColor = '#fa9048'
    }

    confirmButton.style.visibility = 'visible'
    
    unlockOptions();
}

function direction4(){

    if (choiceMade == true) return;

    prm4.style.backgroundColor = "#bd0f0f";
    confirmButton.textContent = 'Try again';
    tip.textContent = currentVideo.choice4.tip;
    tip.style.visibility = "visible";
    choiceMade = true

    if (currentVideo.choice4.progression == 'True')
    {
        prm4.style.backgroundColor = '#44f50f'
        confirmButton.textContent = 'Continue'
    }

    if (currentVideo.choice4.progression == 'ok')
    {
        prm4.style.backgroundColor = '#fa9048'
    }

    confirmButton.style.visibility = 'visible'

    unlockOptions();
}
// End choice controls

var darkMode = document.getElementById("toggle");

darkMode.onclick = function()
{
    if (document.getElementById("toggle").checked) {
        document.body.classList.add("light")
        document.body.classList.remove("dark")

        }
    else {
        document.body.classList.add("dark")
        document.body.classList.remove("light")
        }
}

// 400 lines bitch