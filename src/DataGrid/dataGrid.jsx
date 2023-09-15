import React, { useEffect, useState } from "react";
import "./dataGrid.css";

//Material UI for card and Modal
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
//end of Material UI

//pre-requisites for API call
var requestOptions = {
  method: "GET",
  redirect: "follow",
};

const DataGrid = () => {
  //state for ship data
  const [shipData, setShipData] = useState([]);

  //Material UI
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetch(`https://api.spacexdata.com/v3/ships`, requestOptions)
      .then((response) => response.json())
      .then((result) => setShipData([...result]))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <>
      <div className="dataGridContainer">
        <h1>Search</h1>

        <div className="outerContainer">
          <div className="innerContainerOne">
            <div className="firstInputBox">
              <input type="text" placeholder="key1" />
            </div>
            <div className="secondInputBox">
              <input type="text" placeholder="key2" />
            </div>
          </div>

          <div className="innerContainerTwo">
            <input type="text" placeholder="key3" />
          </div>

          <div className="innerContainerThree">
            <button>Search</button>
          </div>
        </div>
      </div>

      <div className="cardsContainer">
        {shipData.map((shipItem) => {
          return (
            <div className="card" key={shipItem.ship_id}>
              <p>{shipItem.ship_name}</p>
              <div className="cardImage">
                <img src={shipItem.image} alt="Ship image" />
                {console.log(shipItem.url)}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DataGrid;
