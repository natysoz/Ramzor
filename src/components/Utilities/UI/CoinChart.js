import React, { Component } from "react";
import { Sparklines, SparklinesLine, SparklinesBars } from "react-sparklines";
import coinService from "../../../services/coin.service";
import Spinner from "./Spinner";
import Typography from "./Typography";

class Chart extends Component {
  state = {
    coinData: [],
    coinInfo: {
      close: 0,
      high: 0,
      img: "",
      low: 0
    },
    demoDelay: null
  };

  componentDidMount() {
    this.setState({
      demoDelay: setTimeout(() => {
        this.getCoinData(this.props.coin);
      }, 1000)
    });
  }

  componentWillUnmount() {
    clearTimeout(this.state.demoDelay);
    this.setState({ demoDelay: null });
  }

  async getCoinData(symbol) {
    let res = await coinService.getCoinMarketData(symbol);
    let updateData = [];
    res.data.Data.forEach(day => {
      updateData.push(day.high);
    });

    try {
      this.setState({
        ...this.state,
        coinData: updateData,
        coinInfo: {
          close: res.data.Data[res.data.Data.length - 1].close,
          high: res.data.Data[res.data.Data.length - 1].high,
          low: res.data.Data[res.data.Data.length - 1].low
        }
      });
    } catch (e) {
      //Put here a swal of some shit
    }
  }

  render() {
    return this.state.coinData.length ? (
      <div className="sparkline-container">
        <Typography
          text={`Last 10 Days History of ${this.props.coin}`}
          type="h2"
          action="auto"
        />
        <Sparklines data={this.state.coinData}>
          <SparklinesBars style={{ fill: "#b4b4b4", fillOpacity: ".25" }} />
          <SparklinesLine style={{ stroke: "#ebb811", fill: "none" }} />
        </Sparklines>

        <div className="coin-statistics">
          <Typography text="24HRS Statistics" type="h3" action="auto" />
          <img
            src={`https://cryptoicons.org/api/color/${this.props.coin.toLowerCase()}/40`}
            alt="coin icon"
          />
        </div>

        <div className="coininfo-field">
          <div>24HR Close price</div>
          <Typography
            text={this.state.coinInfo.close}
            type="h2"
            action="auto"
          />
        </div>

        <div className="coininfo-field">
          <div>24HR High price</div>
          <Typography text={this.state.coinInfo.high} type="h2" action="auto" />
        </div>

        <div className="coininfo-field">
          <div>24HR Low price</div>
          <Typography text={this.state.coinInfo.low} type="h2" action="auto" />
        </div>
      </div>
    ) : (
      <Spinner />
    );
  }
}
export default Chart;
