import React from 'react';

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Input,
    Button,
    Label,
  } from "reactstrap";


export default class HandleKlasse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      items: []
    }
  }

  updateMessage(event) {
    this.setState({
      message: event.target.value
    });
  }

  handleClick() {
    var items = this.state.items;

    items.push(this.state.message);

    this.setState({
      items: items,
      message: ""
    });
  }

  handleItemChanged(i, event) {
    var items = this.state.items;
    items[i]  = event.target.value;

    this.setState({
      items: items
    });
  }

  handleItemDeleted(i) {
    var items = this.state.items;

    items.splice(i, 1);

    this.setState({
      items: items
    });
  }

  renderRows() {
    var context = this;

    return  this.state.items.map(function(o, i) {
              return (
                <tr key={"item-" + i}>
                  <td>
                    <input
                      type="text"
                      value={o}
                      onChange={context.handleItemChanged.bind(context, i)}
                    />
                  </td>
                  <td>
                    <Button className="btn-round" color="primary"
                      onClick={context.handleItemDeleted.bind(context, i)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            });
  }

  render() {
    return (
      <div>
        <table className="">

          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
        <input
          type="text"
          value={this.state.message}
          onChange={this.updateMessage.bind(this)}
        />
        <Button className="btn-round" color="primary"
          onClick={this.handleClick.bind(this)}
        >
          Add
        </Button>
      </div>
    );
  }
}