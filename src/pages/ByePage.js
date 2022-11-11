import './ByePage.css';
import {Link } from "react-router-dom";
import '../map/button.css'

function ByePage() {

    return (
      <div >
        <h1> Vielen Dank fürs Mitmachen </h1>
        <br />
        <h3> Den selben Song nochmal?</h3>
        <br />
        <br />
        <Link to="/app">
          <div style={{ textAlign: 'center' }}>
            <button>
            Den selben Song nochmal!
            </button>
          </div>
        </Link>
        
      </div>
    );

}


export default ByePage;