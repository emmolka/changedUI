import React, { Component } from "react";
import "./Shipment.css";
import Item from "../Item/Item";
import AddButton from "../Buttons/AddButton/AddButton";
import DeleteButton from "../Buttons/DeleteButton/DeleteButton";
import axios from "axios";
import { IoMdMenu } from "react-icons/io";
import clearInputs from "../Modules/clearModule/Clear";
import openClose from "../Modules/openClose/openClose";
import newId from "../Modules/newId/newId";
class Shipment extends Component {
  state = {
    items: this.props.shipment.items,
    newId: "",
    newName: "",
    open: false
  };
  //function that adds item using api
  addItem = async event => {
    try {
      await axios.post(
        `https://api.shipments.test-y-sbm.com/item`,
        {
          id: this.state.newId,
          code: this.state.newName,
          shipment_id: this.props.id,
          name: this.props.name
        },
        {
          headers: {
            Authorization: `bearer ${localStorage.token}`
          }
        }
      );
      this.addItemToState();
      clearInputs(this);
      newId(this);
    } catch (e) {
      alert("Adding item failed");
    }
  };
  //function that adds item to the state
  addItemToState = () => {
    const item = {
      id: this.state.newId,
      code: this.state.newName
    };
    const currentArray = [...this.state.items];
    const newArray = currentArray;
    newArray.push(item);
    this.setState({
      items: newArray
    });
  };
  //function that deletes shipment using api
  deleteShipment = async event => {
    try {
      await axios.delete(
        `https://api.shipments.test-y-sbm.com/shipment/${this.props.id}`,
        {
          headers: {
            Authorization: `bearer ${localStorage.token}`
          }
        }
      );
      this.props.removeShipmentFromState(this.props.id);
      this.setState({
        items: []
      });
    } catch (e) {
      alert("Deleting shipment failed");
      console.log(this.props.id);
    }
  };
  //function that deletes item using api
  deleteItem = async id => {
    try {
      await axios.delete(`https://api.shipments.test-y-sbm.com/item/${id}`, {
        headers: {
          Authorization: `bearer ${localStorage.token}`
        }
      });
      this.removeItemFromState(id);
    } catch (e) {
      alert("Deleting item failed");
    }
  };
  //function that deletes item from state
  removeItemFromState = id => {
    const currentArray = [...this.state.items];
    const newArray = currentArray.filter(item => item.id !== id);
    this.setState({
      items: newArray
    });
  };
  //function that adds item to the state
  newItemCode = event => {
    this.setState({
      newName: event.target.value
    });
  };
  componentDidMount() {
    newId(this);
  }

  render() {
    const { props, state } = this;

    return (
      <>
        {/*shipment component*/}
        <div className="shipment">
          <div className="shipment-content">
            <IoMdMenu className="hamburger" onClick={() => openClose(this)} />
            <p>
              Shipment name: <b>{props.name}</b>
            </p>
          </div>
          <div
            className="items"
            style={{ display: this.state.open ? "block" : "none" }}
          >
            {/* displaying items*/
            state.items.map(item => (
              <Item
                code={item.code}
                deleteItem={() => this.deleteItem(item.id)}
                key={item.id}
              />
            ))}

            <div className="add-item-div">
              <AddButton type={"Item"} add={this.addItem} />
              <div className="item-input">
                <input
                  placeholder="name"
                  onChange={this.newItemCode}
                  value={this.state.newName}
                />
              </div>
            </div>
            <DeleteButton delete={this.deleteShipment} type={"Shipment"} />
          </div>
        </div>
      </>
    );
  }
}

export default Shipment;
