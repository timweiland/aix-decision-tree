import './Map.css';
import Point from '../points/Point.js';
import MapImage from '../assets/map_sketch.jpg';
import { useEffect, useRef } from 'react';

/*
export default function Map({coordinates}) {
    return  <div style={{position:"relative", display: "inline-block"}}>
                <img src={MapImage} alt="Map" className="map" style={{opacity:0.6}} />
                <div> <Point coordinates={coordinates}/> </div>
            </div>
} 
*/

export default function Map({ coordinates }) {
    const canvasRef = useRef();
    let lines = []
    let curLineStart = [0, 0];

    const image = new Image();

    function drawBackgroundImage(canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        image.src = require('../assets/map_sketch.jpg');
        image.onload = (res) => {
            drawBackgroundImage(canvas);
        }

        ctx.fillStyle = "#000000";
    }, []);

    function getMousePos(evt) {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
            x: (evt.clientX - rect.left) * scaleX,
            y: (evt.clientY - rect.top) * scaleY
        };
    }


    function addLineStart(x, y) {
        curLineStart = [x, y];
    }

    function clearCanvas(canvas) {
        const context = canvas.getContext('2d');
        // Store the current transformation matrix
        context.save();

        // Use the identity matrix while clearing the canvas
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Restore the transform
        context.restore();
    }

    function redrawAll() {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        clearCanvas(canvas);
        drawBackgroundImage(canvas);
        ctx.lineWidth = 7;
        lines.map((line) => {
            ctx.beginPath();
            ctx.moveTo(line[0][0], line[0][1]);
            ctx.lineTo(line[1][0], line[1][1]);
            ctx.stroke();
            return null;
        })
    }

    function addLineEnd(x, y) {
        lines.push([curLineStart, [x, y]]);
        redrawAll();
    }

    function startDrawing(evt) {
        const mousePos = getMousePos(evt);
        addLineStart(mousePos.x, mousePos.y);
    }

    function finishDrawing(evt) {
        const mousePos = getMousePos(evt);
        addLineEnd(mousePos.x, mousePos.y);
    }

    return <canvas ref={canvasRef} style={{ height: '100%', border: '1px solid black' }} 
    onMouseDown={startDrawing}
    onMouseUp={finishDrawing}

    />
}