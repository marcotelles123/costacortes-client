import React, { useState, useEffect } from "react";
import api from "./../../service/api";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import LightBox from "./../LightBoxImage/LightBoxImage";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function FormList() {
  const [products, setProducts] = useState([]);
  const openImageState = useState(Boolean);
  const [imageBytes, setImageBytes] = useState();

  const openImage = openImageState[0];
  const setOpenImage = openImageState[1];

  async function loadProducts() {
    const response = await api.get("/product");
    setProducts(response.data);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function ShowToastSuccess(message) {
    toast(message);
  }

  function ShowToastError(message) {
    toast(message, {
      className: "Error-Toast"
    });
  }

  function showImage(bytes) {
    setOpenImage(true);
    setImageBytes(bytes);
  }

  async function deleteRow(e) {
    await api
      .delete(`/product/${e._id}`)
      .then(response => {
        if (response.status === 200) {
          ShowToastSuccess("Deletado com sucesso!!!");
          loadProducts();
        } else {
          ShowToastError("ERRO!");
          console.log(response);
        }
      })
      .catch(error => {
        ShowToastError("ERRO!");
        console.log(error);
      });
  }

  const classes = useStyles();
  var table = (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Nome</TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="right">
              Preco
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="right">
              Largura
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="right">
              Altura
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="center">
              Imagem
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}  align="center" >
              Apagar
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(row => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">R$ {row.price}</TableCell>
              <TableCell align="right">{row.width}</TableCell>
              <TableCell align="right">{row.heigth}</TableCell>
              <TableCell
                style={{ padding: "5px" }}
                align="center"
                onClick={() => showImage(row.image)}
              >
                <img
                  id="ItemPreview"
                  style={{ maxHeight: "35px" }}
                  src={row.image}
                />
              </TableCell>
              {openImage && <LightBox imageBytes={imageBytes} openImageState={openImageState} />}
              <TableCell className="deleteColumn" align="center" onClick={() => deleteRow(row)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  return (
    <div id="formList">
      {table}
      <ToastContainer />
    </div>
  );
}

export default FormList;
