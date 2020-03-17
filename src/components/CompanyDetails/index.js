import React, { Component } from "react";
import "./styles.sass";

class CompanyDetails extends Component {
  render() {
    return <p>Hello id: {this.props.match.params.id} </p>;
  }
}

export default CompanyDetails;
