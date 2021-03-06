export default function sketch(p5, props) {

    let totalFrames = 60;
    let counter = 0;

    let eyeWidth = 150;
    let eyeHeight = 150;
    let eyeRadius = 30;
    let eyeSpacing = 200;

    let x, y, minX, minY, maxX, maxY;
    let easingConst = 0.02;

    let currentEmotion;
    let randomEmotion = false;
    let blinking = false;

    p5.setup = function() {
        p5.createCanvas(800, 480);
        x = p5.width/2;
        y = p5.height/2;
        maxX = p5.width - eyeWidth/2 - eyeSpacing/2 - 50;
        maxY = p5.height - eyeHeight/2 - 50;
        minX = eyeWidth/2 + eyeSpacing/2 + 50;
        minY = eyeHeight/2 + 50;
        
    }
    
    p5.myCustomRedrawAccordingToNewPropsHandler = function(props) {
        console.log(props)
        if (props.emotion === "random")
            randomEmotion = true;
        else
            currentEmotion = props.emotion;
    }
    
    p5.draw = function(props) {
        counter++;
        if (counter > totalFrames) {
            emotion();
            if (p5.random(0, 100) >= 80)
                blinking = true;
            else
                blinking = false;
            counter = 0;
        }
        render();
        
    }
    
    function render(percent) {
        p5.background(0);

        easing();
        
        if (blinking)
            blink();
        
        // if (currentEmotion === "normal")
        //     normalEyes(x, y, eyeSpacing, eyeWidth, eyeHeight, eyeRadius);
        
        // if (currentEmotion === "happy")
        //     happyEyes(x, y, eyeSpacing, eyeWidth, eyeHeight);
        
        // if (currentEmotion === "sad")
        //     sadEyes(x, y, eyeSpacing, eyeWidth, eyeHeight, eyeRadius);

        // if (currentEmotion === "bored")
            // sadEyes(x, y, eyeSpacing, eyeWidth, eyeHeight, eyeRadius);

    }

    function emotion() {
        if (randomEmotion) {
            let random = p5.random(0, 100);
            if (random <= 10)
                currentEmotion = "happy"
            if (random > 25 && random <= 35)
                currentEmotion = "sad"
            if (random > 50 && random <= 60)
                currentEmotion = "bored"
            if (random > 75 && random <= 85)
                currentEmotion = "normal"
            console.log(currentEmotion)
        }
    }

    //Normal Eyes
    function normalEyes(x, y, hgap, w, h, r) {
        let halfGap = hgap/2;
        let xleft = x - halfGap;
        let xright = x + halfGap;
        p5.fill("#66ccff")
        p5.rectMode(p5.CENTER)
        p5.rect(xleft, y, w, h, r);
        p5.rect(xright, y, w, h, r);
        // console.log(`x: ${x}, y: ${y}, w: ${w}`)
    }

    //Happy Eyes
    function happyEyes(x, y, hgap, w, h) {
        let halfGap = hgap/2;
        let xleft = x - halfGap;
        let xright = x + halfGap;
        p5.fill("#66ccff")
        // p5.rect(xleft, y, w, h, r);
        // p5.rect(xright, y, w, h, r);
        
        p5.ellipse(xleft, y, w, h);
        p5.ellipse(xright, y, w, h);
        
        p5.fill(0);
        p5.ellipse(xleft, y, w - 50, h - 50);
        p5.ellipse(xright, y, w - 50, h - 50);
        p5.rectMode(p5.CENTER)
        p5.rect(xleft, y + h/2, w, h)
        p5.rect(xright, y + h/2, w, h)
    }

    //Sad Eyes
    function sadEyes(x, y, hgap, w, h, r) {
        let halfGap = (hgap - 100)/2;
        let xleft = x - halfGap;
        let xright = x + halfGap;
        let dy = -(y/480 * 80);
        let halfHeight = h/4;
        p5.fill("#66ccff");

        p5.beginShape();
        p5.vertex(xleft - w, y - halfHeight)
        p5.curveVertex(xleft, y - halfHeight - 20);
        p5.curveVertex(xleft, y + halfHeight + 40* h/150 + dy);
        p5.curveVertex(xleft - w + 10, y + halfHeight + 40 * h/150 + dy)
        p5.endShape(p5.CLOSE);

        p5.beginShape();
        p5.vertex(xright + w, y - halfHeight)
        p5.curveVertex(xright, y - halfHeight - 20)
        p5.curveVertex(xright, y + halfHeight + 40 * h/150 + dy)
        p5.curveVertex(xright + w - 10, y + halfHeight + 40 * h/150 + dy)
        p5.endShape(p5.CLOSE);

    }

    function boredEyes(x, y, hgap, w, h, r) {
        
    }

    function easing() {
        let targetX = p5.mouseX;
        let targetY = p5.mouseY;
        // let targetX = p5.width/2;
        // let targetY = p5.height/2;

        let dx = targetX - x;
        x += dx * easingConst;

        let dy = targetY - y;
        y += dy * easingConst;

        if (x > maxX)
            x = maxX;
        if (x < minX)
            x = minX;
        if (y > maxY)
            y = maxY;
        if (y < minY)
            y = minY;
    }

    function blink() {
        if (counter < 5)
            eyeHeight -= 20;
        else if (counter < 10)
            eyeHeight += 20;
    }
}
