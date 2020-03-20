import React from "react";
import Button from "@material-ui/core/Button";

function SimpleReactFileUpload(props) {
  const setFileUpload = props.fileUpload[1];

  // this.onFormSubmit = this.onFormSubmit.bind(this)
  //this.onChange = this.onChange.bind(this);
  //this.fileUpload = this.fileUpload.bind(this)

  var onChange = function(e) {
    fileToBase64(e.target).then(result => {
      setFileUpload({ file: result });
      setTimeout(3000);
    });
  };

  var fileToBase64 = input => {
    return new Promise(resolve => {
      var reader = new FileReader();
      reader.onload = function(event) {
        resolve(event.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    });
  };

  return (
    <Button variant="contained" style={{ width:"100%", marginLeft:10 }}  component="label">
      Upload File
      <input type="file" style={{ display: "none" }} onChange={onChange} />
    </Button>
  );
}

export default SimpleReactFileUpload;
