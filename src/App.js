import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      temp: null,
      feels_like: null,
      min: null,
      max: null,
      APIKey: `b5783478348f403b7b8b38c0a2592761`,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({ city: e.target.value });
    console.log(this.state.city);
  };

  call = async (e) => {
    e.preventDefault();
    const Call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${this.state.APIKey}`
    );
    const Data = await Call.json();
    this.setState({
      temp: Data.main.temp - 273.15,
      min: Data.main.temp_min - 273.15,
      max: Data.main.temp_max - 273.15,
      feels_like: Data.main.feels_like - 273.15,
    });
    console.log(Data);
  };

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            value={this.state.city}
            onChange={this.handleChange}
          />
          <button onClick={this.call}>Search</button>
        </form>
        temp:{this.state.temp}
        <br />
        min:{this.state.min}
        <br />
        max:{this.state.max}
        <br />
        feels like:{this.state.feels_like}
      </div>
    );
  }
}

export default App;
