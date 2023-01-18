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
  const [histCounter, setHistCounter] = useState(-1);
  const [FlagHighlight, setFlagHighlight] = useState(0);

  const NoOfUserLines = userTree.structure.get_lines().length;

  const DoAverageHighlight = (node) => {
    node.hasTestPoint = true;
  };

  const ShowAvgRent = (node) => {
    let avgrent = node.avgRent;
    let coord = node.rect;
    let scaling = coord[2] * coord[3] * 0.1;
    return (
      <div
        id="showavgrent"
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

  const RemoveAvgHighlight = (node) => {
    node.hasTestPoint = false;
  };

  const bubblebob =
    "chat-bubble chat-bubble-error text-3xl bottom-0 shadow-2xl";
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
          enableInteraction={
            (Counter === 1 && NoOfUserLines != 4) ||
            (Counter === 2 && NoOfUserLines != 4)
          }
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
            {/* <FontAwesomeIcon className="fa-fade" icon={faArrowDownLong} /> */}
          </div>
        )}
        {Counter === 2 && (
          <div
            className="absolute bg-white opacity-90 rounded-2xl shadow-2xl text-black text-opacity-60 pl-3 pr-3 px-2 py-2"
            style={{
              fontSize: "50px",
              top: `${85}%`,
              left: "89%",
            }}
          >
            <FontAwesomeIcon className="fa-fade" icon={faArrowDownLong} />
          </div>
        )}
        <Taskbar undo={NoOfUserLines > 1 && undo} openTutorial={() => {}} />
      </MapColumn>

      <TreeColumn>
        <div>
          <div
            className="absolute text-black font-extralight top-8 left-8"
            style={{
              fontSize: "40px",
            }}
          >
            ANLEITUNG
          </div>
          <div className="imgbobsmall">
            <img id="bob" src={bob_mirrored} alt="bob_mirrored" />
          </div>

          {Counter != 6 && Counter >= 3 && (
            <div className="mt-4">
              <Tree
                structure={userTree.structure}
                colors={userTree.structure.get_colors()}
              />
            </div>
          )}

          {Counter === 0 && (
            <div className="speechbubble">
              <div className="chat chat-end">
                <div className={bubblebob}>
                  <div className="m-2 mx-16"> Willkommen zur Anleitung.</div>
                </div>
              </div>
              <div className="chat chat-end">
                <div className={bubblebob}>
                  <div className={textmargin}>
                    Hier ist eine Karte von Tübingen – jeder Punkt steht für ein
                    WG-Zimmer. Je größer der Punkt desto höher der Mietpreis.
                  </div>
                </div>
              </div>
              {userTree.structure.reset()}
            </div>
          )}
          {Counter === 1 && (
            <div className="speechbubble">
              <div className="chat chat-end">
                <div className={bubblebob}>
                  <div className={textmargin}>
                    Wir machen erstmal einen Probedurchlauf. Du kannst
                    horizontale oder vertikale Linien zeichnen, um die Karte zu
                    unterteilen. Probiere es für mindestens zwei Linien aus!
                  </div>
                </div>
              </div>
            </div>
          )}
          {Counter === 2 && (
            <div className="speechbubble">
              <div className="chat chat-end">
                <div className={bubblebob}>
                  <div className={textmargin}>
                    Hier kannst du eine Linien rückgängig machen...
                  </div>
                </div>
              </div>
            </div>
          )}
          {Counter === 3 && (
            <div>
              <div className="speechbubble_low">
                <div className="chat chat-end">
                  <div className={bubblebob}>
                    <div className={textmargin}>
                      Parallel entsteht ein sogenannter Entscheidungsbaum, der
                      deine Unterteilungen in der Karte darstellt. Die Farben
                      der Kreise geben an, für welchen Bereich in der Karte sie
                      stehen.
                    </div>
                  </div>
                </div>
              </div>
              {RemoveAvgHighlight(userTree.structure.get_leaves()[0])}
            </div>
          )}
          {Counter === 4 && (
            <div>
              <div className="speechbubble_low">
                <div className="chat chat-end">
                  <div className={bubblebob}>
                    <div className={textmargin}>
                      Die Zahl im Kreis gibt den Durchschnittspreis der Mieten
                      in diesem Bereich an.
                    </div>
                  </div>
                </div>
              </div>
              {DoAverageHighlight(userTree.structure.get_leaves()[0])}
            </div>
          )}
          {Counter === 5 && (
            <div>
              <div className="speechbubble_low">
                <div className="chat chat-end">
                  <div className={bubblebob}>
                    <div className={textmargin}>
                      Gleich geht die eigentliche Aufgabe los: Versuche die
                      Linien so zu ziehen, dass Bereiche mit ähnlichen
                      Mietpreisen voneinander abgegrenzt werden. Du musst
                      insgesamt 5 Linien ziehen.
                    </div>
                  </div>
                </div>
              </div>
              {RemoveAvgHighlight(userTree.structure.get_leaves()[0])}
            </div>
          )}
          {Counter === 6 && (
            <div className="speechbubble_low">
              <div className="chat chat-end">
                <div className={bubblebob}>
                  <div className="m-2 text-5xl">Bereit? Los geht's!</div>
                </div>
              </div>
              {/* {userTree.structure.reset()} */}
            </div>
          )}
        </div>
        {/* ++++++++++++++++ LEFT ARROW ++++++++++++++++ */}
        {/* move within tutorial normally */}
        {Counter !== 0 && (
          <div
            className="absolute hover:cursor-pointer bg-green-700 bg-opacity-50 rounded-2xl bottom-10 left-10 pl-8 pr-8 shadow-2xl shadow-green-700 opacity-90 text-white btn btn-lg h-25 z-50 border-transparent"
            style={{ fontSize: "60px" }}
            onClick={() => {
              setHistCounter(Counter);
              setCounter(Counter - 1);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeftLong} />
          </div>
        )}
        {/* move back to dialogue when counter is 0 */}
        {Counter === 0 && (
          <Link to="/Dialogue">
            <div
              className="absolute hover:cursor-pointer bg-green-700 bg-opacity-50 rounded-2xl bottom-10 left-10 pl-8 pr-8 shadow-2xl shadow-green-700 opacity-90 text-white btn btn-lg h-25 z-50 border-transparent"
              style={{ fontSize: "60px" }}
            >
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </div>
          </Link>
        )}

        {/* ++++++++++++++++ RIGHT ARROW ++++++++++++++++ */}
        {/* move forward within tutorial */}
        {Counter <= 5 && Counter !== 1 && (
          <div
            className="absolute hover:cursor-pointer bg-green-700 rounded-2xl bottom-10 right-10 pl-8 pr-8 shadow-2xl shadow-green-700 opacity-90 text-white btn btn-lg h-25 z-50 border-transparent"
            style={{ fontSize: "60px" }}
            onClick={() => {
              setHistCounter(Counter);
              setCounter(Counter + 1);
            }}
          >
            <FontAwesomeIcon icon={faArrowRightLong} />
          </div>
        )}
        {/* show forward button if at least two lines and max three lines are drawn */}
        {Counter === 1 && NoOfUserLines >= 2 && (
          <div
            className="absolute hover:cursor-pointer bg-green-700 rounded-2xl bottom-10 right-10 pl-8 pr-8 shadow-2xl shadow-green-700 opacity-90 text-white btn btn-lg h-25 z-50 border-transparent"
            style={{ fontSize: "60px" }}
            onClick={() => {
              setHistCounter(Counter);
              setCounter(Counter + 1);
            }}
          >
            <FontAwesomeIcon icon={faArrowRightLong} />
          </div>
        )}
        {/* move automatically forward when 3 lines are drawn */}
        {Counter === 1 &&
          histCounter != 2 &&
          NoOfUserLines === 3 &&
          //setHistCounter(Counter) &&
          setCounter(Counter + 1)}

        {/* return: move forward after pressing return 1x, and maximally one additional line is drawn */}
        {Counter === 2 &&
          histCounter != 3 &&
          (NoOfUserLines === 1 || NoOfUserLines >= 4) &&
          //setHistCounter(Counter) &&
          setCounter(Counter + 1)}

        {Counter > 5 && (
          <div
            className="absolute hover:cursor-pointer bg-green-700 rounded-2xl bottom-10 right-10 pl-8 pr-8 shadow-2xl shadow-green-700 opacity-90 text-white btn btn-lg h-25 z-50 border-transparent"
            style={{ fontSize: "60px" }}
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
