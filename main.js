img="";
objects=[];
status="";

function preload(){
    img=loadImage("dog_cat.jpg");
}

function setup(){
    canvas=createCanvas(640,420);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(640,420);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: object detecting";
}
function modelLoaded(){
    console.log('model is loaded');
    status=true;
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects=results;
}
function draw(){
    image(video,0,0,640,420);
    if(status !=""){
        r= random(255);
        g= random(255);
        b= random(255);
        objectDetector.detect(video, gotResult);
        for(i=0;i < objects.length;i++){
        document.getElementById("status").innerHTML="Status: Object Detect"; 
        document.getElementById("number_of_object").innerHTML="No. of object is ="+objects.length;   
        fill(r,g,b);
        percent=floor(objects[i].confidence * 100);
        text(objects[i].label+ " " +percent + "%",objects[i].x + 10,objects[i].y + 20);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}