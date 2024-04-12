import { useEffect, useRef } from 'react';
import checkmark from '../assets/checkmark.svg';
import error from '../assets/error.svg';

export default function StreamContainer(props) {

  useEffect(() => {
    const showStream = () => {
      document.getElementById('success').setAttribute("style", "display: none");
      document.getElementById('failure').setAttribute("style", "display: none");
      document.getElementById('qr-stream').setAttribute("style", "display: block");
      document.getElementById('info').setAttribute("style", "display: none");
      props.setFeedbackDiv(false);
    }
    setTimeout(showStream, 1500)

  }, [props.displayFeedbackDiv]);

  return (
    <div id="stream-container">
      <div id="success">
        <img src={checkmark} alt="checkmark"></img>
      </div>
      <div id="failure">
        <img src={error} alt="error x"></img>
      </div>
      <video id='qr-stream'></video>
    </div>
  )
}