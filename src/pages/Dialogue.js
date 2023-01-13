import "./Dialogue.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bob from "../assets/bob.png";
import alice from "../assets/alice.png";
import alice_map from "../assets/alice_map.png";
import alice_laptop from "../assets/alice_laptop.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

function Dialogue() {
  const [Counter, setCounter] = useState(0);

  const [inactivityTime, setInactivityTime] = useState(0);

  const resetTime = 150; // seconds
  useEffect(() => {
    const inactivityInterval = setInterval(() => {
      setInactivityTime((inactivityTime) => inactivityTime + 1);
    }, 1000);

    const resetTimer = () => {
      setInactivityTime(0);
    };

    document.addEventListener("click", resetTimer);

    return () => {
      clearInterval(inactivityInterval);
      document.removeEventListener("click", resetTimer);
    };
  }, []);

  useEffect(() => {
    if (inactivityTime > resetTime) {
      window.location.replace("/");
    }
  }, [inactivityTime]);

  const bubblebob = "chat-bubble chat-bubble-primary text-3xl mx-2 my-3";
  const bubblealice = "chat-bubble chat-bubble-secondary text-3xl mx-2 my-3";
  const textmargin = "m-3";

  return (
    <div className="column-container">
      <div className="column">
        <img src={bob} alt="bob" />
      </div>

      <div className="column">
        <div className="chat chat-end">
          <div className={bubblealice}>
            <div className={textmargin}>
              Hier ist eine Karte von Tübingen, auf der die Mietpreise pro
              Quadratmeter eingezeichnet sind.
            </div>
          </div>
        </div>
        {Counter >= 1 && (
          <div className="chat chat-start">
            <div className={bubblebob}>
              <div className={textmargin}>
                Wenn ich den Durchschnitt berechne, weiß ich ungefähr, wie hoch
                die Miete ist...
              </div>
            </div>
          </div>
        )}
        {Counter >= 2 && (
          <div className="chat chat-end">
            <div className={bubblealice}>
              <div className={textmargin}>
                Das ist aber nicht sehr genau. Es gibt viele Zimmer, die
                deutlich teurer oder billiger sind.
              </div>
            </div>
          </div>
        )}
        {Counter >= 3 && (
          <div className="chat chat-start">
            <div className={bubblebob}>
              <div className={textmargin}>
                Ich habe eine bessere Idee: Ich kann die Stadt in teure und
                billige Viertel einteilen, und dann jeweils den
                Durchschnittspreis berechnen!
              </div>
            </div>
          </div>
        )}
        {Counter >= 4 && (
          <div className="chat chat-end">
            <div className={bubblealice}>
              <div className={textmargin}>
                Gute Idee! Und ich kann eine KI programmieren, die das Gleiche
                macht. Dann können wir am Ende beide Ergebnisse vergleichen!
              </div>
            </div>
          </div>
        )}
        {Counter >= 5 && (
          <div className="chat chat-start">
            <div className={bubblebob}>
              <div className={textmargin}>
                Hey, hast Du Lust mir zu helfen? Ich erkläre Dir wie es geht.
              </div>
            </div>
          </div>
        )}
        {/* <div class="box_dialogue sbalice">
          {" "}
          Hier ist eine Karte von Tübingen, auf der die Mietpreise pro
          Quadratmeter eingezeichnet sind.{" "}
        </div> */}
        <div id="addStatement"> </div>
      </div>

      <div className="column">
        {Counter > 3 ? (
          <img src={alice_laptop} alt="alice_laptop" />
        ) : (
          <img src={alice_map} alt="alice_map" />
        )}

        {Counter < 5 ? (
          <div
            className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 right-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
            style={{ fontSize: "50pt" }}
            onClick={() => {
              setCounter(Counter + 1);
              // addStatement(Counter, "addStatement");
            }}
          >
            <FontAwesomeIcon icon={faArrowRightLong} />
          </div>
        ) : (
          <Link to="/App">
            <div
              className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 right-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
              style={{ fontSize: "50pt" }}
            >
              {/* <button className="btn btn-lg text-4xl text-white btn-secondary">WEITER</button> */}
              <FontAwesomeIcon icon={faArrowRightLong} />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

function addStatement(counter, div_id) {
  var theDiv = document.getElementById(div_id);

  {
    (() => {
      switch (counter) {
        case 1:
          return theDiv.insertAdjacentHTML(
            "beforeend",
            //"<div class='box_dialogue sbbob'> Wenn ich den Durchschnitt berechne, weiß ich ungefähr, wie hoch die Miete ist...</div>"
            "<div className='chat chat-start'><div className='chat-bubble chat-bubble-secondary text-3xl mx-3 my-10'><div className='m-5'>Hier ist eine Karte von Tübingen, auf der die Mietpreise proQuadratmeter eingezeichnet sind.</div></div></div>"
          );
        case 2:
          return theDiv.insertAdjacentHTML(
            "beforeend",
            "<div class='box_dialogue sbalice'>Das ist aber nicht sehr genau. Es gibt viele Zimmer, die deutlich teurer oder billiger sind.</div>"
          );
        case 3:
          return theDiv.insertAdjacentHTML(
            "beforeend",
            "<div class='box_dialogue sbbob'> Ich habe eine bessere Idee: Ich kann die Stadt in teure und billige Viertel einteilen, und dann jeweils den Durchschnittspreis berechnen! </div>"
          );
        case 4:
          return theDiv.insertAdjacentHTML(
            "beforeend",
            "<div class='box_dialogue sbalice'>  Gute Idee! Und ich kann eine KI programmieren, die das Gleiche macht. Dann können wir am Ende beide Ergebnisse vergleichen!  </div>"
          );
        case 5:
          return theDiv.insertAdjacentHTML(
            "beforeend",
            "<div class='box_dialogue sbbob'> Hey, hast Du Lust mir zu helfen? Ich erkläre Dir wie es geht.  </div>"
          );
        default:
          return;
      }
    })();
  }
}

export default Dialogue;
