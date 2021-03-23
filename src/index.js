import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

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
      country: "",
      flagLink: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({ city: e.target.value });
    console.log(this.state.city);
  };

  call = async (e) => {
    e.preventDefault();

    const callWeatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${this.state.APIKey}`
    );
    const Data = await callWeatherData.json();
    this.setState({
      temp: (Data.main.temp - 273.15).toFixed(),
      min: (Data.main.temp_min - 273.15).toFixed(),
      max: (Data.main.temp_max - 273.15).toFixed(),
      feels_like: (Data.main.feels_like - 273.15).toFixed(),
      country: Data.sys.country,
    });
    this.setState({
      flagLink: `https://www.countryflags.io/${this.state.country}/shiny/64.png`,
    });

    console.log(this.state.flagLink);
  };

  render() {
    return (
      <div>
        <div>
          <img src={this.state.flagLink} />
        </div>
        <form>
          <input
            type="text"
            value={this.state.city}
            onChange={this.handleChange}
          />
          <button onClick={this.call}>Search</button>
        </form>

        <section>
          <span>temp: {this.state.temp}&deg;</span>
          <span>min: {this.state.min}&deg;</span>
          <span>max: {this.state.max}&deg;</span>
          <span>feels like: {this.state.feels_like}&deg;</span>
        </section>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
