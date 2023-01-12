import "./Map.css";
import { useState, useEffect, useRef } from "react";
import classNames from "classnames";

export default function Map({
  coordinates,
  tree,
  splitTree,
  highlightNode,
  unhighlightAll,
  enableInteraction,
  testPoint,
  hide
}) {
  const canvasRef = useRef();
  const [isDrawing, setIsDrawing] = useState(false);
  const [curLineStart, setCurLineStart] = useState([0, 0]);
  const [curLineEnd, setCurLineEnd] = useState([0, 0]);
  const [highlightedRect, setHighlightedRect] = useState(null);

  const image = new Image();

  function drawBackgroundImage(canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(
      image,
      0,
      0,
      image.width,
      image.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    image.src = require('../assets/map.jpg');
    image.onload = (res) => {
      redrawAll();
    }

    ctx.fillStyle = "#000000";
  }, [image, isDrawing, curLineEnd, tree]);

  function relativeToAbsoluteCoords(canvas, x, y) {
    const rect = canvas.getBoundingClientRect();
    return [(x / 100) * canvas.width, (y / 100) * canvas.height];
  }

  function absoluteToRelativeCoords(canvas, x, y) {
    const rect = canvas.getBoundingClientRect();
    return [(100 * x) / canvas.width, (100 * y) / canvas.height];
  }

  function getMousePos(evt) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (evt.clientX - rect.left) * scaleX,
      y: (evt.clientY - rect.top) * scaleY,
    };
  }

  function getTouchPos(evt) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (evt.touches) {
      if (evt.touches.length == 1) {
        var touch = evt.touches[0];
        return {
          x: (touch.pageX - touch.target.offsetLeft - rect.left) * scaleX,
          y: (touch.pageY - touch.target.offsetTop - rect.top) * scaleY,
        };
      }
    }
  }

  function addLineStart(x, y) {
    setCurLineStart([x, y]);
  }

  function treeNodeToCanvasRect(node, canvas) {
    let [treeX0, treeY0, treeX1, treeY1] = node.rect;
    [treeX0, treeY0] = relativeToAbsoluteCoords(canvas, treeX0, treeY0);
    [treeX1, treeY1] = relativeToAbsoluteCoords(canvas, treeX1, treeY1);
    return [treeX0, treeY0, treeX1 - treeX0, treeY1 - treeY0];
  }

  function highlightTreeNode(x, y) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const [x_rel, y_rel] = absoluteToRelativeCoords(canvas, x, y);

    const curTreeNode = tree.find(x_rel, y_rel);
    highlightNode(curTreeNode);
    setHighlightedRect(treeNodeToCanvasRect(curTreeNode, canvas));
  }

  function clearCanvas(canvas) {
    const context = canvas.getContext("2d");
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
    // Clear everything that has been drawn so far
    clearCanvas(canvas);
    drawBackgroundImage(canvas);

    let testPointLine = undefined;
    ctx.lineWidth = 7;
    ctx.fillStyle = "#000000";
    // Draw all of the lines the user has drawn so far
    tree.get_lines().map((line) => {
      if(line[2]) {
        testPointLine = line;
      }
      ctx.beginPath();
      ctx.moveTo(...relativeToAbsoluteCoords(canvas, line[0][0], line[0][1]));
      ctx.lineTo(...relativeToAbsoluteCoords(canvas, line[1][0], line[1][1]));
      ctx.stroke();
      return null;
    });
    // Draw the rent points on the map
    drawCoordinates(coordinates, testPoint, ctx, canvas);
    if (isDrawing && curLineEnd) {
      // Dashed line that the user is currently in the process of drawing
      ctx.setLineDash([7, 7]);
      ctx.beginPath();
      ctx.moveTo(curLineStart[0], curLineStart[1]);
      let [x1, y1] = curLineEnd;
      if (highlightedRect) {
        x1 = Math.min(
          highlightedRect[0] + highlightedRect[2],
          Math.max(highlightedRect[0], x1)
        );
        y1 = Math.min(
          highlightedRect[1] + highlightedRect[3],
          Math.max(highlightedRect[1], y1)
        );
      }
      ctx.lineTo(x1, y1);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    // Paint each tree leaf in a different color
    const treeLeaves = tree.get_leaves();
    treeLeaves.forEach((leaf) => {
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = leaf.color.hex();
      ctx.fillRect(...treeNodeToCanvasRect(leaf, canvas));
      ctx.globalAlpha = 1.0;
    });
    if (isDrawing && highlightedRect) {
      // Highlight the area of the tree that the user is currently drawing inside
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = "#CBC3E3";
      ctx.fillRect(...highlightedRect);
      ctx.globalAlpha = 1.0;
    }
    const testPointNode = tree.getTestPointNode();
    if (testPointNode !== undefined) {
      ctx.lineWidth = 30;
      ctx.strokeStyle = "#FF0000";
      ctx.fillStyle = "#ff886f";
      ctx.globalAlpha = 1.0;
      ctx.beginPath();
      ctx.rect(...treeNodeToCanvasRect(testPointNode, canvas));
      ctx.stroke();
      ctx.globalAlpha = 0.7;
      ctx.fillRect(...treeNodeToCanvasRect(testPointNode, canvas));
      ctx.globalAlpha = 1.0;
    }

    let minRent = 1000;
    let maxRent = -1000;
    coordinates.forEach((coord) => {
      const rent = coord[2];
      if (rent < minRent) {
        minRent = rent;
      }
      if (rent > maxRent) {
        maxRent = rent;
      }
    });
    if(testPointLine) {
      ctx.strokeStyle = "#FFFF00";
      ctx.lineWidth = 15;
      ctx.beginPath();
      ctx.moveTo(...relativeToAbsoluteCoords(canvas, testPointLine[0][0], testPointLine[0][1]));
      ctx.lineTo(...relativeToAbsoluteCoords(canvas, testPointLine[1][0], testPointLine[1][1]));
      ctx.stroke();
    }
    const [minSize, maxSize] = [25, 100];
    if (testPoint !== undefined) {
      const rent = testPoint[2];
      const size = Math.floor(minSize + (rent - minRent) * (maxSize - minSize) / (maxRent - minRent));
      const x = testPoint[0] * canvas.width / 100;
      const y = testPoint[1] * canvas.height / 100;
      drawCircle(ctx, x, y, size, 'yellow');
    }
  }

  function addLineEnd(x, y) {
    const canvas = canvasRef.current;
    const dx = curLineStart[0] - x;
    const dy = curLineStart[1] - y;
    const [x0, y0] = absoluteToRelativeCoords(
      canvas,
      curLineStart[0],
      curLineStart[1]
    );
    const curTreeNode = tree.find(x0, y0);
    const [treeX0, treeY0, treeX1, treeY1] = curTreeNode.rect;
    let line = null;
    let splitAxis = null;
    let splitPos = null;
    if ((2 * dx ** 2) / (dx ** 2 + dy ** 2) <= 1) {
      // Horizontal line
      line = [
        [x0, treeY0],
        [x0, treeY1],
      ];
      splitAxis = 0;
      splitPos = x0;
    } else {
      // Vertical line
      line = [
        [treeX0, y0],
        [treeX1, y0],
      ];
      splitAxis = 1;
      splitPos = y0;
    }
    splitTree(curTreeNode.idx, splitAxis, splitPos, line);
  }

  function drawCircle(ctx, x, y, radius, fill) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
    if (fill) {
      ctx.fillStyle = fill
      ctx.fill()
    }
  }

  function drawCoordinates(coordinates, testPoint, ctx, canvas) {
    let minRent = 1000;
    let maxRent = -1000;
    coordinates.forEach((coord) => {
      const rent = coord[2];
      if (rent < minRent) {
        minRent = rent;
      }
      if (rent > maxRent) {
        maxRent = rent;
      }
    });
    const [minSize, maxSize] = [25, 100];
    coordinates.forEach((c) => {
      const rent = c[2];
      const size = Math.floor(minSize + (rent - minRent) * (maxSize - minSize) / (maxRent - minRent));
      const x = c[0] * canvas.width / 100;
      const y = c[1] * canvas.height / 100;
      drawCircle(ctx, x, y, size, 'black');
    })
  }

  function startDrawing(cursorX, cursorY) {
    if (!enableInteraction) {
      return;
    }
    highlightTreeNode(cursorX, cursorY);
    addLineStart(cursorX, cursorY);
    setCurLineEnd([cursorX, cursorY]);
    setIsDrawing(true);
  }

  function finishDrawing() {
    if (!enableInteraction) {
      return;
    }
    if (isDrawing) {
      addLineEnd(curLineEnd[0], curLineEnd[1]);
    }
    setCurLineStart([0, 0]);
    setCurLineEnd([0, 0]);
    setIsDrawing(false);
    unhighlightAll();
  }

  function whileDrawing(cursorX, cursorY) {
    if (!enableInteraction) {
      return;
    }
    if (isDrawing) {
      setCurLineEnd([cursorX, cursorY]);
    }
  }

  function leaveCanvas(evt) {
    if (!enableInteraction) {
      return;
    }
    setIsDrawing(false);
    unhighlightAll();
    setCurLineStart([0, 0]);
    setCurLineEnd([0, 0]);
  }

  function passMousePos(evt, callback) {
    const pos = getMousePos(evt);
    callback(pos.x, pos.y);
  }

  function passTouchPos(evt, callback) {
    const pos = getTouchPos(evt);
    callback(pos.x, pos.y);
    evt.preventDefault();
  }

  return (
    <canvas
      ref={canvasRef}
      style={{ height: "100%", border: "1px solid black" }}
      onMouseDown={(evt) => passMousePos(evt, startDrawing)}
      onMouseUp={(evt) => finishDrawing()}
      onMouseMove={(evt) => passMousePos(evt, whileDrawing)}
      onMouseLeave={leaveCanvas}

      onTouchStart={(evt) => passTouchPos(evt, startDrawing)}
      onTouchEnd={(evt) => { finishDrawing(); evt.preventDefault(); }}
      onTouchMove={(evt) => passTouchPos(evt, whileDrawing)}
      onTouchCancel={(evt) => { leaveCanvas(evt); evt.preventDefault(); }}
      className={classNames({ "opacity-10": hide })}
    />
  );
}
