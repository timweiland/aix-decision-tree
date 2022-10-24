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

export default function Map({coordinates}) {
    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = canvas.height * 0.75;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(MapImage, 0, 0);
        ctx.fillStyle="#000000";
    }, [])

    return <canvas ref={canvasRef} style={{height: '100%', border: '1px solid black' }}/>
}