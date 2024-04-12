import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
const apiUrl =
  "http://localhost:3000/api/tic/1a7d6a02-eaf4-4029-a817-9ccc5d1fac0f";

function QrScanBouncer(props) {
  // called by setTimeout to show scanner again
  const resetScanner = () => {
    props.setScanSuccess(null);
  };

  const handleSuccessfulScan = (text) => {
    // stores response from request
    let responseData = sendScan(text);
    useResponseData(responseData);
  };

  // called when QR is scanned by QrScanner object
  const sendScan = async (decodedText) => {
    try {
      //replace apiURL with decodedText
      let formData = new FormData();
      formData.append("auth", "bouncer");
      let response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });
      const responseData = await response.json();
      console.log(responseData);
      console.log("Successfully scanned a QR code");
      return responseData;
    } catch (e) {
      console.error(`Ran into an error contacting the API: ${e}`);
      props.setScanSuccess(false);
      setTimeout(resetScanner, 1000);
    }
  };

  // called after sendScan() returns response data from DB
  // defines what to do with the returned data based on the response status code
  const useResponseData = (data) => {
    switch (data.status) {
      case 200:
        console.log("Success! (200)");
        props.setInfo(data);
        props.setScanSuccess(true);
        setTimeout(resetScanner, 1000);
        break;
      case 404:
        console.log("Error! (500)");
        props.setScanSuccess(false);
        props.setInfo(data);
        setTimeout(resetScanner, 1000);
        break;
      default:
        console.log("Something went wrong.");
        props.setScanSuccess(false);
    }
  };

  return (
    <>
      <Scanner styles={null}
        onResult={(text) => handleSuccessfulScan(text)}
        onError={(error) => console.log(error?.message)}
      />
    </>
  );
}

export default QrScanBouncer;
