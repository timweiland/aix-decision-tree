import './StartPage.css';
import {Link } from "react-router-dom";

function ByePage() {

    return (
      <div >
        <h1> Super!  </h1>
        <br />
        <h1> Dann siehst du jetzt den Entscheidungsbaum der KI</h1>
        <br />
        <br />
        <Link to="/app">
          <div style={{ textAlign: 'center' }}>
            <button>
            Bitte hier klicken
            </button>
          </div>
        </Link>
        
      </div>
    );

}


export default ByePage;