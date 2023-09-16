import React, { useEffect, useState } from "react";
import "./dataGrid.css";

//Material UI for card and Modal
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  minheight: 500,
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

  //State for modal data
  const [modatData, setModalData] = useState({});

  //State for Form data
  const [shipId, setShipId] = useState("");
  const [shipType, setShipType] = useState("");
  const [shipStatus, setShipStatus] = useState("");

  //URL to fetch data
  const url = `https://api.spacexdata.com/v3/ships`;
  const [urlAPI, setUrlAPI] = useState(url);

  useEffect(() => {
    fetch(urlAPI, requestOptions)
      .then((response) => response.json())
      .then((result) => setShipData([...result]))
      .catch((error) => console.log("error", error));
  }, [urlAPI]);

  //fetch modal data onClick
  const fetchModalData = (shipId) => {
    const response = shipData.filter((item) => {
      return shipId === item.ship_id;
    });
    setModalData(response);
  };

  //Handle form input
  const handleFormData = (event) => {
    if (event.target.id === "ship_id") {
      setShipId(event.target.value);
    } else if (event.target.id === "ship_type") {
      setShipType(event.target.value);
    } else if (event.target.id === "active") {
      setShipStatus(event.target.value);
    }
  };

  function capitalizeFirstLetter(str) {
    if (str.length === 0) return str; // Handle empty string
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleSearch = (shipTypeCap, shipStatus) => {
    setUrlAPI(
      `https://api.spacexdata.com/v3/ships?ship_id=${shipId}&ship_type=${shipTypeCap}&active=${shipStatus}`
    );
  };

  //To capitalize first letter of ship status
  const capiTalizeSearchWords = () => {
    const shipTypeCap = capitalizeFirstLetter(shipType);
    handleSearch(shipTypeCap, shipStatus);
  };

  //Handle Search

  return (
    <>
      <div className="dataGridContainer">
        <h1>Search wide range of ships</h1>

        <div className="outerContainer" onChange={handleFormData}>
          <div className="innerContainerOne">
            <div className="firstInputBox">
              <label htmlFor="ship_id">Ship ID: </label>
              <input
                id="ship_id"
                type="text"
                placeholder="Try searching AMERICANCHAMPION!!"
                value={shipId}
              />
            </div>
            <div className="secondInputBox">
              <label htmlFor="ship_type">Ship Type: </label>
              <input
                id="ship_type"
                type="text"
                placeholder="Try Tug or Cargo!"
                value={shipType}
              />
            </div>
          </div>

          <div className="innerContainerTwo">
            <label htmlFor="active">Active Status: </label>
            <input
              id="active"
              type="text"
              placeholder="Try true/false"
              value={shipStatus}
            />
          </div>

          <div className="innerContainerThree">
            <button onClick={capiTalizeSearchWords}>Search</button>
          </div>
        </div>
      </div>

      {shipData.length > 0 ? (
        <div className="cardsContainer">
          {shipData.map((shipItem) => {
            return (
              <div id={shipItem.ship_id} key={shipItem.ship_id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="180"
                      image={
                        shipItem.image
                          ? `${shipItem.image}`
                          : "data:image/png;base64,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"
                      }
                      alt="No Image Found"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {shipItem.ship_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Home port - {shipItem.home_port}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <Button
                    onClick={() => {
                      handleOpen();
                      fetchModalData(shipItem.ship_id);
                    }}
                  >
                    More Info{" "}
                    <span>
                      <img src="./left-arrow.svg" className="leftArrow" />
                    </span>
                  </Button>
                </Card>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="noDataImage">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/no-search-found-2511608-2133696.png"
            alt="No Data Found"
          />
        </div>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modatData[0]?.ship_name}
          </Typography>
          <img
            src={
              modatData[0]?.image
                ? `${modatData[0]?.image}`
                : "data:image/png;base64,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"
            }
            alt="No Image"
            className="modalImage"
          />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Ship Type - {modatData[0]?.ship_type}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            ship_id - {modatData[0]?.ship_id}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Active Status - {modatData[0]?.active === true ? "True" : "False"}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            weight_lbs -{" "}
            {modatData[0]?.weight_lbs ? modatData[0]?.weight_lbs : "No Data"}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            weight_kg -{" "}
            {modatData[0]?.weight_kg ? modatData[0]?.weight_kg : "No Data"}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            year_built -{" "}
            {modatData[0]?.year_built
              ? modatData[0]?.year_built
              : "Year Not Available"}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            home_port - {modatData[0]?.home_port}
          </Typography>
          <button className="modalButtonUrl">
            <a href={modatData[0]?.url} target="_blank">
              Visit Website
            </a>
          </button>
        </Box>
      </Modal>
    </>
  );
};

export default DataGrid;

{
  /* <div className="card" key={shipItem.ship_id}>
              <p>{shipItem.ship_name}</p>
              <div className="cardImage">
                <img src={shipItem.image} alt="Ship image" />
                {console.log(shipItem.url)}
              </div>
              <div>
                <Button onClick={handleOpen}>More Info</Button>
              </div>
            </div> */
}
