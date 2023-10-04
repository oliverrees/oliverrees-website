"use client";
import RUNNING_DATA from "../data/running.json";
import Image from "next/image";
import {
  LineChart,
  Line,
  Area,
  AreaChart,
  Brush,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface PowerMetricProps {}

const PowerMetric = ({}: PowerMetricProps) => {
  const graphData = RUNNING_DATA.timestamp_list.map((item, index) => {
    return {
      time: item,
      power: RUNNING_DATA.total_power_list[index],
      speed: RUNNING_DATA.speed_list[index],
      heartRate: RUNNING_DATA.heart_rate_list[index],
    };
  });
  const calculatePaceMetersPerSecond = (speedMPS: number): string =>
    (60 / (speedMPS * 3.6)).toFixed(2).replace(".", ":");

  return (
    <div className="prose lg:prose-lg max-w-4xl">
      <Image
        alt="Power Metric"
        src="/img/posts/power.jpg"
        placeholder="blur"
        blurDataURL="/img/blur/power.jpg"
        width={1680}
        height={1000}
      />
      <h2>Helllo</h2>
      <div style={{ width: "100%" }}>
        <h4>A demo of synchronized AreaCharts</h4>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            width={500}
            height={200}
            data={graphData}
            syncId="runningChart"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="power"
              dot={false}
              stroke="#8884d8"
              fill="#8884d8"
            />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            width={500}
            height={200}
            data={graphData}
            syncId="runningChart"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickFormatter={(time: number) => {
                return new Date(time * 1000).toLocaleTimeString();
              }}
            />
            <YAxis />
            <Tooltip
              formatter={(speed: number) => {
                return calculatePaceMetersPerSecond(speed) + "/km";
              }}
            />

            <Line
              type="monotone"
              dataKey="speed"
              dot={false}
              stroke="#82ca9d"
              fill="#82ca9d"
            />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            width={500}
            height={200}
            data={graphData}
            syncId="runningChart"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="heartRate"
              dot={false}
              stroke="#82ca9d"
              fill="#82ca9d"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PowerMetric;
