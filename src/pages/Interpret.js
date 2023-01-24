import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faArrowLeftLong,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { Stack } from "@mui/material";

import fish_2 from "../assets/fish_2.jpg";

function Interpret({ onComplete }) {
  return (
    <div className="column-container">
      <Stack
        className="space-y-6"
        direction="column"
        style={{
          marginTop: "13vh",
          marginLeft: "14.5vw",
          marginRight: "16.5vw",
          marginBottom: "7vh",
        }}
      >
        <div class="text-6xl mb-10 text-black font-semibold">
          Entscheidungsbäume sind erklärbar
        </div>
        <div class="text-3xl text-black font-normal leading-relaxed">
          Wenn eine KI eine Entscheidung trifft, möchte man oft eine{" "}
          <i>Erklärung</i>, wie sie dazu gekommen ist. Bei vielen KI-Algorithmen
          ist das nicht immer so einfach. Bei Entscheidungsbäumen geht das
          allerdings gut:
        </div>
        <div class="text-3xl text-black font-normal leading-relaxed">
          Jede Verzweigung enthält das <i>Merkmal</i> und den <i>Wert</i>,
          anhand dessen in zwei Gruppen unterteilt wurde. Wenn man den Baum von
          oben nach unten liest, erfährt man für alle Gruppen hinsichtlich
          welcher Merkmale sie <i>ähnlich</i> sind.
        </div>
        <div>
          <img
            style={{ height: "52vh", marginLeft: "1.3vw", marginTop: "-7vh" }}
            src={fish_2}
            alt="fish_2"
          />
        </div>
      </Stack>
      {/*<Link to="/final">
                <div
                className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-40 pt-2 pb-3 left-8 pl-7 pr-7 shadow-2xl shadow-green-700 opacity-80 text-white"
                style={{ fontSize: "40pt" }}
                >
                    Menü
                </div>
  </Link>*/}
      <div>
        <div
          onClick={onComplete}
          className="absolute hover:bg-green-700 bg-green-700 rounded-2xl bottom-10 left-10 pl-8 pr-8 shadow-2xl shadow-green-700 opacity-90 text-white btn btn-lg h-25 z-50 border-transparent"
          style={{ fontSize: "60px" }}
        >
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </div>
      </div>
      {/*<div>
                <Link to="/rents2">
                    <div
                    className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 right-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
                    style={{ fontSize: "50pt" }}
                    >
                        <FontAwesomeIcon icon={faArrowRightLong} />
                    </div>
                </Link>
</div>*/}
    </div>
  );
}

export default Interpret;
