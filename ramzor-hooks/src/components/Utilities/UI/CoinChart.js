import React, { useEffect, useState } from "react";
import { Sparklines, SparklinesLine, SparklinesBars } from "react-sparklines";
import coinService from "../../../services/coin.service";
import Spinner from "./Spinner";
import Typography from "./Typography";

const Chart = props => {
  const [coinData, setCoinData] = useState([]);
  const [coinInfo, setCoinInfo] = useState({
    close: 0,
    high: 0,
    img: "",
    low: 0
  });

  const [coin] = useState(props.coin);

  useEffect(() => {
    const id = setTimeout(() => {
      getCoinData(coin);
    }, 1500);
    return () => clearTimeout(id);
  }, []);

  const getCoinData = async coin => {
    let res = await coinService.getCoinMarketData(coin);
    let updateData = [];
    res.data.Data.forEach(day => {
      updateData.push(day.high);
    });
    try {
      setCoinData(updateData);
      setCoinInfo({
        close: res.data.Data[res.data.Data.length - 1].close,
        high: res.data.Data[res.data.Data.length - 1].high,
        low: res.data.Data[res.data.Data.length - 1].low
      });
    } catch (e) {}
  };

  return coinData.length ? (
    <div className="sparkline-container">
      <Typography
        text={`Last 10 Days History of ${props.coin}`}
        type="h2"
        action="auto"
      />
      <Sparklines data={coinData}>
        <SparklinesBars style={{ fill: "#b4b4b4", fillOpacity: ".25" }} />
        <SparklinesLine style={{ stroke: "#ebb811", fill: "none" }} />
      </Sparklines>

      <div className="coin-statistics">
        <Typography text="24HRS Statistics" type="h3" action="auto" />
      </div>

      <div className="coininfo-field">
        <div>24HR Close price</div>
        <Typography text={coinInfo.close} type="h2" action="auto" />
      </div>

      <div className="coininfo-field">
        <div>24HR High price</div>
        <Typography text={coinInfo.high} type="h2" action="auto" />
      </div>

      <div className="coininfo-field">
        <div>24HR Low price</div>
        <Typography text={coinInfo.low} type="h2" action="auto" />
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default Chart;
