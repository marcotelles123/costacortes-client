import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import api from "./../../service/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SimpleReactFileUpload from "./../UploadButton/UploadButton";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    display: "flex"
  },
  textField: {
    padding: theme.spacing(2),
    width: "200px"
  }
}));

export default function FormAdd() {
  var fileUpload = useState([{}]);
  const [nameState, setNameState] = useState("");
  const [priceState, setPriceState] = useState("");
  const [heigthState, setHeigthState] = useState("");
  const [widthState, setWidthState] = useState("");
  const classes = useStyles();
  
  function ClearStates(){
    setNameState("");
    setPriceState("");
    setHeigthState("");
    setWidthState("");
  }

  const onClick = event => {
    createProduct()
      .then(response => {
        debugger;
        if (response.status === 200) {

          ShowToastSuccess("Salvo com sucesso!!!");
          ClearStates();
        } else {
          debugger;
          ShowToastError("ERRO!");
          console.log(response);
        }
      })
      .catch(error => {
        debugger;
        ShowToastError("ERRO!");
        console.log(error);
      });
  };


  function ShowToastSuccess(message) {
    toast(message);
  }

  function ShowToastError(message) {
    toast(message, {
      className: "Error-Toast"
    });
  }

  async function createProduct() {
    var productCommand = {
      name: nameState,
      image: fileUpload[0].file,
      price: priceState,
      heigth: heigthState,
      width: widthState,
    };

    var res = await api.post("/product/", productCommand);
    return await res;
  }

  const handleChangeName = event => {
    setNameState(event.target.value);
  };
  const handleChangePrice = event => {
    setPriceState(event.target.value);
  };
  const handleChangeHeigth = event => {
    setHeigthState(event.target.value);
  };
  const handleChangeWidth = event => {
    setWidthState(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Grid container direction="row" spacing={3}>
        <Grid item sm={9} xs={12}>
          <TextField
            style={{ width: "100%" }}
            id="name"
            label="Nome"
            size="small"
            variant="outlined"
            value={nameState}
            onChange={handleChangeName}
          />
        </Grid>
        <Grid item sm={2} xs={12}>
          <SimpleReactFileUpload fileUpload={fileUpload} />
        </Grid>
        <Grid item sm={3} xs={12}>
          <TextField
            style={{ width: "100%" }}
            id="price"
            label="Preco"
            size="small"
            variant="outlined"
            type="number"
            value={priceState}
            onChange={handleChangePrice}
          />
        </Grid>
        <Grid item sm={9} xs={1}></Grid>
        <Grid item sm={3} xs={12}>
          <TextField
            style={{ width: "100%" }}
            id="heigthProduct"
            label="Altura(cm)"
            size="small"
            variant="outlined"
            type="number"
            value={heigthState}
            onChange={handleChangeHeigth}
          />
        </Grid>
        <Grid item sm={3} xs={12}>
          <TextField
            style={{ width: "100%" }}
            id="widthProduct"
            label="Largura"
            size="small"
            variant="outlined"
            type="number"
            value={widthState}
            onChange={handleChangeWidth}
          />
        </Grid>
        <Grid item sm={6} xs={1}></Grid>
        <Grid item sm={3} xs={12}>
          <Button
            variant="contained"
            style={{ width: "100%", marginLeft: 10 }}
            component="label"
          >
            Salvar
            <input style={{ display: "none" }} onClick={onClick} />
          </Button>
          <ToastContainer />
        </Grid>
      </Grid>
    </div>
  );
}
