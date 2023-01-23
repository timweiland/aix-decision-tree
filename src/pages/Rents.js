import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faArrowLeftLong,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { Stack } from "@mui/material";
import algo1 from "../assets/algo_sketch1.png";
import algo2 from "../assets/algo_sketch2.png";
import algo3 from "../assets/algo_sketch3.png";
import algo4 from "../assets/algo_sketch4.png";
import algo5 from "../assets/algo_sketch5.png";

function Rents() {
  return (
    <div className="column-container">
        <div className="grid grid-rows-2">
            <Stack className="space-y-6" direction="column" style={{ marginTop: "13vh", marginLeft: "14.5vw", marginRight: "16.5vw", marginBottom: "7vh" }}>
            <div 
            class="text-6xl mb-10 text-black font-semibold"
            >
                Wie schätzt die KI die Mieten in Tübingen?
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
               Die KI berechnet ihre Lösung. Für eine Teilung der Karte probiert sie systematisch alle möglichen Trennungslinien von links nach rechts und von oben nach unten aus.
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
               Für jede Linie berechnet sie die durchschnittliche Miete auf beiden Seiten der Linie. Schließlich wählt sie die Linie, wo der Unterschied zwischen echten Mietpreisen und durchschnittlicher Miete am kleinsten ist. Das ist der Fall, wenn Bereiche mit ähnlichen Mietpreisen möglichst gut voneinander abgegrenzt werden.
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
               Diese Berechnung wiederholt sie genauso für alle weiteren Teilungen in Unterbereiche. Wenn sie fertig ist, verwendet sie die durchschnittlichen Mieten pro Bereich als Schätzung.
            </div>
            </Stack>

            <div
            class="grid grid-cols-5 auto-cols-auto"
            style={{ fontSize: "50px",  marginLeft: "11.5vw", marginRight: "12.5vw", marginBottom: "7vh", marginTop: "14.5vh"}}
            >
                <div>
                    <img style={{ height: "30vh"}} src={algo1} alt="algo1"/>
                    <div class="text-base" style={{ marginLeft: "3.1vw"}}>Erste Linie ausprobieren</div>
                </div>
                <div>
                    <img style={{ height: "30vh"}} src={algo2} alt="algo2"/>
                    <div class="text-base" style={{ marginLeft: "3.1vw"}}>Durchschnittsmieten berechnen</div>
                </div>
                <div>
                    <img style={{ height: "30vh"}} src={algo3} alt="algo3"/>                    
                    <div class="text-base" style={{ marginLeft: "3.1vw"}}>Systematisch durchprobieren</div>
                </div>
                <div>
                    <img style={{ height: "20vh"}} src={algo5} alt="algo5"/>                    
                    {/*<div class="text-base" style={{ marginLeft: "3.1vw"}}>Systematisch durchprobieren</div>*/}
                </div>                
                <div>
                    <img style={{ height: "30vh"}} src={algo4} alt="algo4"/>                    
                    <div class="text-base" style={{ marginLeft: "3.1vw"}}>Beste Linie wählen</div>
                    
                </div>

            </div>
            {/*<Link to="/final">
                <div
                className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-40 pt-2 pb-3 left-8 pl-7 pr-7 shadow-2xl shadow-green-700 opacity-80 text-white"
                style={{ fontSize: "40pt" }}
                >
                    Menü
                </div>
  </Link>*/}

        </div>
            <div>
                <Link to="/final">
                    <div
                    className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 left-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
                    style={{ fontSize: "50pt" }}
                    >
                        <FontAwesomeIcon icon={faArrowLeftLong} />
                    </div>
                </Link>
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
            <Link to="/">
            <div 
                className="absolute hover:cursor-pointer bg-red-700 rounded-3xl /*top-10 right-10 pl-8 pr-8*/ top-8 right-8 pr-20 pl-20 pt-2 shadow-2xl shadow-red-700 opacity-90 text-white btn btn-lg h-25 z-10" 
                style={{ fontSize: "67px", height: "100px", width: "200px"}}            >
                    <FontAwesomeIcon icon={faXmark} />
            </div>
          </Link>  
        </div>  
    );
}

export default Rents;