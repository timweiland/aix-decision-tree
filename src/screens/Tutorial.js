import "./Tutorial.css";
import { useState } from "react";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faArrowLeftLong,
  faArrowDownLong,
} from "@fortawesome/free-solid-svg-icons";

import ColumnContainer from "../columns/ColumnContainer";
import MapColumn from "../columns/MapColumn";
import TreeColumn from "../columns/TreeColumn";
import Taskbar from "../taskbar/taskbar";
import Map from "../map/Map";
import Tree from "../tree/Tree";

import bob_mirrored from "../assets/bob_mirrored.png";
// import hand from "../assets/hand_emoji.png";
import Xarrow from "react-xarrows";
import { get } from "lodash";

function Tutorial({
  cleanUp,
  userTree,
  mietdaten,
  undo,
  splitTree,
  highlightNode,
  unhighlightAll,
  onComplete,
}) {
  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [Counter, setCounter] = useState(0);

  const NoOfUserLines = userTree.structure.get_lines().length;

  const DoAverageHighlight = (node) => {
    node.hasTestPoint = true;
  };

  const ShowAvgRent = (node) => {
    let avgrent = node.avgRent;
    let coord = node.rect;
    console.log(coord);
    let scaling = coord[2] * coord[3] * 0.1;
    console.log(scaling * 0.01);
    return (
      <div
        style={{
          position: "absolute",
          fontSize: `${scaling}%`,
          color: "yellow",
          left: `${(coord[2] - coord[0]) / 2 - Math.round(scaling * 0.02)}%`,
          top: `${(coord[3] - coord[1]) / 2 - Math.round(scaling * 0.015)}%`,
        }}
      >
        {Math.round(avgrent)}€
      </div>
    );
  };

  const bubblebob = "chat-bubble chat-bubble-primary text-3xl";
  const textmargin = "m-2";

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <ColumnContainer>
      <MapColumn>
        {Counter === 4 && ShowAvgRent(userTree.structure.get_leaves()[0])}
        <Map
          coordinates={mietdaten}
          tree={userTree.structure}
          splitTree={splitTree}
          highlightNode={highlightNode}
          unhighlightAll={unhighlightAll}
          enableInteraction={Counter === 1 || Counter === 2}
        />
        {Counter === 0 && (
          <div
            className="absolute hover:cursor-pointer bg-white opacity-60 rounded-2xl shadow-2xl text-black text-opacity-60 pl-3 pr-3"
            style={{
              fontSize: "400%",
              top: `${85}%`,
              left: "30%",
            }}
          >
            <FontAwesomeIcon className="fa-fade" icon={faArrowDownLong} />
          </div>
        )}
        {Counter === 2 && (
          <div
            className="absolute hover:cursor-pointer bg-white opacity-60 rounded-2xl shadow-2xl text-black text-opacity-60 pl-3 pr-3"
            style={{
              fontSize: "400%",
              top: `${85}%`,
              left: "79%",
            }}
          >
            <FontAwesomeIcon className="fa-fade" icon={faArrowDownLong} />
          </div>
        )}
        <Taskbar undo={undo} openTutorial={() => {}} />
      </MapColumn>

      <TreeColumn>
        <div>
          <div className="imgbobsmall">
            <img id="bob" src={bob_mirrored} alt="bob_mirrored" />
          </div>

          {Counter >= 3 && (
            <Tree
              structure={userTree.structure}
              colors={userTree.structure.get_colors()}
            />
          )}

          {Counter === 0 && (
            <div>
              <div id="start" className="speechbubble">
                <div className="chat chat-end">
                  <div className={bubblebob}>
                    <div className={textmargin}>
                      Hier ist eine Karte von Tübingen, auf der die Mietpreise
                      pro Quadratmeter eingezeichnet sind.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {Counter === 1 && (
            <div class="box_dialogue_middle sbbob">
              Du kannst horizontale oder vertikale Striche zeichnen, um die
              Karte zu unterteilen. Probiere es gerne aus!
            </div>
          )}
          {Counter === 2 && (
            <div>
              <div id="box" className="box_dialogue_small sbbob">
                Hier kannst du einen Strich rückgängig machen...
              </div>
              <Xarrow
                start="box" //can be react ref
                end="rotateleft" //or an id
                color="black"
                endAnchor="top"
                path="smooth"
                curveness={1}
                animateDrawing
                strokeWidth={10}
              />
            </div>
          )}
          {Counter === 3 && (
            <div class="box_dialogue_small sbbob">
              Parallel entsteht ein sogenannter Entscheidungsbaum, der deine
              Unterteilungen in der Karte darstellt. Jeder Kreis steht für einen
              Bereich in der Karte.
            </div>
          )}
          {Counter === 4 && (
            <div>
              <div class="box_dialogue_small sbbob">
                Die Zahl im Kreis gibt den Durchschnittspreis der Mieten in
                diesem Bereich an.
              </div>
              {DoAverageHighlight(userTree.structure.get_leaves()[0])}
            </div>
          )}
          {Counter === 5 && (
            <div class="box_dialogue_small sbbob">
              Versuche die Striche so zu ziehen, dass die beiden Bereiche
              möglichst unterschiedliche Durchschnittspreise haben. Für deinen
              Baum kannst du 5 Striche ziehen.
            </div>
          )}
          {Counter === 6 && (
            <div class="box_dialogue_small sbbob">Bereit? Los geht's!</div>
          )}
        </div>
        {/* ++++++++++++++++ LEFT ARROW ++++++++++++++++ */}
        {Counter !== 0 && (
          <div
            className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 left-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-50 text-white"
            style={{ fontSize: "50pt" }}
            onClick={() => {
              setCounter(Counter - 1);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeftLong} />
          </div>
        )}
        {Counter === 0 && (
          <Link to="/Dialogue">
            <div
              className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 left-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-50 text-white"
              style={{ fontSize: "50pt" }}
            >
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </div>
          </Link>
        )}
        {/* ++++++++++++++++ RIGHT ARROW ++++++++++++++++ */}
        {Counter <= 5 && Counter !== 1 && (
          <div
            className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 right-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
            style={{ fontSize: "50pt" }}
            onClick={() => {
              setCounter(Counter + 1);
            }}
          >
            <FontAwesomeIcon icon={faArrowRightLong} />
          </div>
        )}
        {Counter === 1 && NoOfUserLines < 1 && (
          <div
            className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 left-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-50 text-white"
            style={{ fontSize: "50pt" }}
            onClick={() => {
              setCounter(Counter - 1);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeftLong} />
          </div>
        )}
        {Counter === 1 && NoOfUserLines >= 1 && NoOfUserLines <= 4 && (
          <div
            className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 right-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
            style={{ fontSize: "50pt" }}
            onClick={() => {
              setCounter(Counter + 1);
            }}
          >
            <FontAwesomeIcon icon={faArrowRightLong} />
          </div>
        )}
        {Counter === 1 && NoOfUserLines === 4 && setCounter(Counter + 1)}
        {Counter === 2 && NoOfUserLines >= 5 && setCounter(Counter + 1)}
        {Counter > 5 && (
          <div
            className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 right-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
            style={{ fontSize: "50pt" }}
            onClick={() => {
              cleanUp();
              onComplete();
            }}
          >
            <FontAwesomeIcon icon={faArrowRightLong} />
          </div>
        )}
      </TreeColumn>
    </ColumnContainer>
  );
}

export default Tutorial;
