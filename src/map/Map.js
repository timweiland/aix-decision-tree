import './Map.css';
import Point from '../points/Point.js';
import MapImage from '../assets/map_sketch.jpg';
import { useState, useEffect, useRef } from 'react';
import './button.css';

export default function Map({ coordinates, treeState, splitTree }) {
    const canvasRef = useRef();
    const [isDrawing, setIsDrawing] = useState(false);
    const [curLineStart, setCurLineStart] = useState([0, 0]);
    const [curLineEnd, setCurLineEnd] = useState([0, 0]);
    const [highlightedRect, setHighlightedRect] = useState(null);

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

        image.src = require('../assets/map_prototype.jpg');
        image.onload = (res) => {
            redrawAll();
        }

        ctx.fillStyle = "#000000";
    }, [image, isDrawing, curLineEnd, treeState]);

    function relativeToAbsoluteCoords(canvas, x, y) {
        const rect = canvas.getBoundingClientRect();
        return [(x / 100.) * canvas.width, (y / 100.) * canvas.height]
    }

    function absoluteToRelativeCoords(canvas, x, y) {
        const rect = canvas.getBoundingClientRect();
        return [100. * x / canvas.width, 100. * y / canvas.height]
    }

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
        setCurLineStart([x, y]);
    }

    function treeNodeToCanvasRect(node, canvas) {
        let [treeX0, treeY0, treeX1, treeY1] = node.rect;
        [treeX0, treeY0] = relativeToAbsoluteCoords(canvas, treeX0, treeY0);
        [treeX1, treeY1] = relativeToAbsoluteCoords(canvas, treeX1, treeY1);
        return [treeX0, treeY0, treeX1 - treeX0, treeY1 - treeY0]
    }

    function highlightTreeNode(x, y) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const [x_rel, y_rel] = absoluteToRelativeCoords(canvas, x, y);

        const curTreeNode = treeState.treeStructure.find(x_rel, y_rel);
        setHighlightedRect(treeNodeToCanvasRect(curTreeNode, canvas));
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

    function drawCoordinates(coordinates, ctx, canvas) {
        let minRent = 1000;
        let maxRent = -1000;
        coordinates.forEach((coord) => {
            const rent = coord[2];
            if(rent < minRent) {
                minRent = rent;
            }
            if(rent > maxRent) {
                maxRent = rent;
            }
        });
        const [minSize, maxSize] = [5, 20];
        coordinates.forEach((c) => {
            const rent = c[2];
            const size = Math.floor(minSize + (rent - minRent) * (maxSize - minSize) / (maxRent - minRent));
            ctx.fillRect(c[0] * canvas.width / 100, c[1] * canvas.height / 100, size, size);
        })
    }

    function redrawAll() {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        // Clear everything that has been drawn so far
        clearCanvas(canvas);
        drawBackgroundImage(canvas);

        ctx.lineWidth = 7;
        ctx.fillStyle = "#000000";
        // Draw all of the lines the user has drawn so far
        treeState.treeStructure.get_lines().map((line) => {
            ctx.beginPath();
            ctx.moveTo(...relativeToAbsoluteCoords(canvas, line[0][0], line[0][1]));
            ctx.lineTo(...relativeToAbsoluteCoords(canvas, line[1][0], line[1][1]));
            ctx.stroke();
            return null;
        })
        // Draw the rent points on the map
        drawCoordinates(coordinates, ctx, canvas);
        if(isDrawing && curLineEnd) {
            // Dashed line that the user is currently in the process of drawing
            ctx.setLineDash([7, 7]);
            ctx.beginPath();
            ctx.moveTo(curLineStart[0], curLineStart[1]);
            let [x1, y1] = curLineEnd;
            if(highlightedRect) {
                x1 = Math.min(highlightedRect[0] + highlightedRect[2], Math.max(highlightedRect[0], x1));
                y1 = Math.min(highlightedRect[1] + highlightedRect[3], Math.max(highlightedRect[1], y1));
            }
            ctx.lineTo(x1, y1);
            ctx.stroke();
            ctx.setLineDash([]);
        }
        // Paint each tree leaf in a different color
        const treeLeaves = treeState.treeStructure.get_leaves();
        treeLeaves.forEach((leaf) => {
            ctx.globalAlpha = 0.6;
            ctx.fillStyle = leaf.color.hex();
            ctx.fillRect(...treeNodeToCanvasRect(leaf, canvas));
            ctx.globalAlpha = 1.0;
        })
        if(isDrawing && highlightedRect) {
            // Highlight the area of the tree that the user is currently drawing inside
            ctx.globalAlpha = 0.6;
            ctx.fillStyle = "#CBC3E3";
            ctx.fillRect(...highlightedRect);
            ctx.globalAlpha = 1.0;
        }
    }

    function addLineEnd(x, y) {
        const canvas = canvasRef.current;
        const dx = curLineStart[0] - x;
        const dy = curLineStart[1] - y;
        const [x0, y0] = absoluteToRelativeCoords(canvas, curLineStart[0], curLineStart[1]);
        const curTreeNode = treeState.treeStructure.find(x0, y0);
        const [treeX0, treeY0, treeX1, treeY1] = curTreeNode.rect;
        let line = null;
        let splitAxis = null;
        let splitPos = null;
        if (2 * dx ** 2 / (dx ** 2 + dy ** 2) <= 1) {
            // Horizontal line
            line = [[x0, treeY0], [x0, treeY1]]
            splitAxis = 0;
            splitPos = x0;
        }
        else {
            // Vertical line
            line = [[treeX0, y0], [treeX1, y0]];
            splitAxis = 1;
            splitPos = y0;
        }
        splitTree(curTreeNode.idx, splitAxis, splitPos, line);
    }

    function startDrawing(evt) {
        const mousePos = getMousePos(evt);
        highlightTreeNode(mousePos.x, mousePos.y);
        addLineStart(mousePos.x, mousePos.y);
        setCurLineEnd([mousePos.x, mousePos.y]);
        setIsDrawing(true);
    }

    function finishDrawing(evt) {
        if (isDrawing) {
            const mousePos = getMousePos(evt);
            addLineEnd(mousePos.x, mousePos.y);
        }
        setCurLineStart([0, 0]);
        setCurLineEnd([0, 0]);
        setIsDrawing(false);
    }

    function whileDrawing(evt) {
        if(isDrawing) {
            const mousePos = getMousePos(evt);
            setCurLineEnd([mousePos.x, mousePos.y]);
        }
    }
    function leaveCanvas(evt) {
        setIsDrawing(false);
        setCurLineStart([0, 0]);
        setCurLineEnd([0, 0]);
    }

    return <canvas ref={canvasRef} style={{ height: '100%', border: '1px solid black' }}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={whileDrawing}
        onMouseLeave={leaveCanvas}
    />
}