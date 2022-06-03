song = " ";
leftwristY = " ";
leftwristX = " ";
rightwristY = " ";
rightwristX = " ";
scoreLeftWrist = " ";
scoreRightWrist = " ";

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("PoseNet Model Is Loaded!! :)");
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreRightWrist > 0.2){
        circle(rightwristX, rightwristY, 20);

        if(rightwristY > 100 && rightwristY<= 200){
            document.getElementById("speed").innerHTML = "Speed = 01x";
            song.rate(01);
        }

        if(rightwristY > 200 && rightwristY<= 300){
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }

        if(rightwristY > 300 && rightwristY<= 400){
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        if(rightwristY > 400 && rightwristY<= 500){
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }

    if(scoreLeftWrist > 0.2){
        circle(leftwristX, leftwristY, 20);
        inNumberLeftWristY = Number(leftwristY);
        noDecimalsLeftWristY = Math.floor(inNumberLeftWristY);
        volume = noDecimalsLeftWristY/500;
        song.setVolume(volume);
        document.getElementById("volume").innerHTML = "Volume of the Song is " + volume;
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results) {
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score of Left Wrist = " + scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score of Right Wrist = " + scoreRightWrist);
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log("X coordinates of left Wrist = " + leftwristX + ", Y coordinates of left Wrist = " + leftwristY);
        console.log("X coordinates of right Wrist = " + rightwristX + ", Y coordinates of right Wrist = " + rightwristY);
    }
}
