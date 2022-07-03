status = "";
video = "";
objects = [];

function preload(){
    video = createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas = createCanvas(480, 300);
    canvas.center();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Object Detecting";
}

function modelLoaded(){
    console.log("Model is Initialized.")
    status = true;
    video.loop();
    video.volume(0);
    video.speed(1);
}

function draw(){
    image(video, 0, 0, 480, 300);

    if (status != ""){
        objectDetector.detect(video, gotResult);

        for(var i = 0; i< objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("numberObjects").innerHTML = "Number of Objects Detected: " + objects.length;

            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResult(error, result){
if (error){
    console.error(error);
}
else{
    console.log(result);
    objects = result;
}
}