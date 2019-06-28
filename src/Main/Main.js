import React from "react";
import { Redirect } from "react-router";
import Shipment from "../Shipment/Shipment";
import axios from "axios";
import AddButton from "../Buttons/AddButton/AddButton";
import "./Main.css";
import LogOut from "../LogOut/LogOut";
import { IoIosAddCircleOutline } from "react-icons/io";
import clearInputs from "../Modules/clearModule/Clear";
import openClose from "../Modules/openClose/openClose";
import newId from "../Modules/newId/newId";
import AdminLTE, {
  Sidebar,
  Content,
  Row,
  Col,
  Box,
  Button
} from "adminlte-2-react";

const { Item } = Sidebar;

class HelloWorld extends React.Component {
  state = {};

  render() {
    return (
      <Content
        title="Shipment name"
        subTitle="List of items below"
        browserTitle="Hello World"
      >
        <Row>
          <Col xs={6}>
            <Box
              title="My first box"
              type="primary"
              closable
              collapsable
              footer={<Button type="danger" text="Danger Button" />}
            >
              Hello World
            </Box>
          </Col>
          <Col xs={6}>
            <Box title="Another box">Content goes here</Box>
          </Col>
        </Row>
      </Content>
    );
  }
}

class Main extends React.Component {
  state = {
    shipments: [],
    newId: "",
    newName: "",
    open: false
  };

  newShipmentName = event => {
    this.setState({
      newName: event.target.value
    });
  };
  addShipment = async event => {
    try {
      await axios.post(
        `https://api.shipments.test-y-sbm.com/shipment`,
        {
          id: this.state.newId,
          name: this.state.newName
        },
        {
          headers: {
            Authorization: `bearer ${localStorage.token}`
          }
        }
      );
      this.addShipmentToState();
      clearInputs(this);
      newId(this);
      this.setState({ open: false });
    } catch (e) {
      alert("Adding shipment failed");
      console.log(e);
    }
  };
  addShipmentToState = () => {
    const ship = {
      id: this.state.newId,
      name: this.state.newName,
      items: []
    };
    //{ id: "46", shipment_id: "45", name: "Maciek", code: "Maciek" }
    const currentArray = [...this.state.shipments];
    const newArray = currentArray;
    newArray.push(ship);
    this.setState({
      shipments: newArray
    });
  };

  removeShipmentFromState = id => {
    const currentArray = [...this.state.shipments];
    const newArray = currentArray.filter(item => item.id !== id);
    this.setState({
      shipments: newArray
    });
  };

  async componentDidMount() {
    newId(this);
    try {
      const data = await axios.get(
        `https://api.shipments.test-y-sbm.com/shipment`,
        {
          headers: {
            Authorization: `bearer ${localStorage.token}`
          }
        }
      );
      const list = data.data.data.shipments;

      this.setState({
        shipments: list
      });
    } catch (e) {
      this.props.history.push("/login");
      localStorage.clear();
    }
  }

  logOut = () => {
    this.props.history.push("/login");
    localStorage.clear();
  };
  sidebar = [
    <Item key="keyos" text="Hello" to="/hello-world" />,
    <Item key="keyos1" text="Hello1" to="/hello-world1" />,
    <Item key="keyos2" text="Hello2" to="/hello-world2" />
  ];

  render() {
    const { props, state } = this;

    if (!props.isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <>
        <AdminLTE
          title={["Admin", " LTE"]}
          titleShort={["A", "LTE"]}
          theme="blue"
          sidebar={this.sidebar}
        >
          <HelloWorld path="/hello-world1" />
        </AdminLTE>
        {/*main structure*/}
        {/*log-out button*/}
        <LogOut logOut={this.logOut} />
        {/*adding shipment section*/}
        <div className="add-shipment-div" onClick={() => openClose(this)}>
          <div className="add-shipment-div-items">
            <IoIosAddCircleOutline className="openShip" />
            <p>
              <b>Add Shipment</b>
            </p>
          </div>
        </div>
        <div
          className="add-shipment-div normal-cursor"
          style={{ display: this.state.open ? "block" : "none" }}
        >
          <div className="shipment-input">
            <input
              placeholder="name"
              onChange={this.newShipmentName}
              value={this.state.newName}
            />
          </div>
          <AddButton type={"Shipment"} add={this.addShipment} />
        </div>
        {/*shipments list*/}
        {state.shipments.map(shipment => (
          <Shipment
            shipment={shipment}
            id={shipment.id}
            name={shipment.name}
            removeShipmentFromState={this.removeShipmentFromState}
            key={shipment.id}
          />
        ))}
      </>
    );
  }
}

export default Main;
