import './StartPage.css';
import {Link } from "react-router-dom";

function StartPage() {

    return (
      <div >
        <h1> WG-Zimmer gesucht? </h1>
        <br />
        <h3> Hier kannst du Mietpreise vorhersagen und dich mit einer KI vergleichen.</h3>
        <br />
        <br />
        <Link to="/app">
          <div style={{ textAlign: 'center' }}>
            <button>
            LOS 
            </button>
          </div>
        </Link>
        
      </div>
    );

}


export default StartPage;