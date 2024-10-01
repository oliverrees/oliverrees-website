"use client";
import { data } from "./mood";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { format, parseISO } from "date-fns";

const MoodChart = () => {
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [showAverageLines, setShowAverageLines] = useState(false);

  // Function to extract the month label
  const formatXAxis = (tickItem) => {
    return format(parseISO(tickItem), "MMM");
  };

  // Filter the data to get the first entry of each month
  const filteredData = data.filter((entry, index, array) => {
    const currentMonth = format(parseISO(entry.Date), "MMM");
    const previousMonth =
      index > 0 ? format(parseISO(array[index - 1].Date), "MMM") : null;
    return currentMonth !== previousMonth;
  });

  // Calculate averages
  const calculateAverage = (dataKey) => {
    const total = data.reduce(
      (sum, entry) => sum + parseFloat(entry[dataKey]),
      0
    );
    return total / data.length;
  };

  const ollyAverage = calculateAverage("Olly Mood");
  const ineAverage = calculateAverage("Ine Mood");

  // Custom labels for the lines
  const customLabels = {
    "Olly Mood": "My Mood (33M)",
    "Ine Mood": "Mother-in-law's Mood (75F)",
  };

  const handleSecondLineAnimationEnd = () => {
    setShowSecondLine(true);
    setTimeout(() => {
      setShowAverageLines(true);
    }, 500); // Delay for a smoother transition
  };

  return (
    <div>
      <h2>Mood Chart</h2>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="Date"
            ticks={filteredData.map((entry) => entry.Date)} // Set ticks to the first entry of each month
            tickFormatter={formatXAxis}
            tick={{ fontSize: 12 }} // Adjust the font size
          />
          <YAxis />
          <Tooltip />
          <Legend
            formatter={(value) => customLabels[value]}
            wrapperStyle={{ padding: "10px 20px" }} // Increase space between legend items
            layout="horizontal" // Arrange items horizontally
            align="center" // Center the legend horizontally
            verticalAlign="top" // Position the legend at the top
          />
          <Line
            type="monotone"
            dataKey="Olly Mood"
            stroke="red"
            dot={false}
            strokeWidth={2}
            animationDuration={5000}
            isAnimationActive={true}
            onAnimationEnd={handleSecondLineAnimationEnd}
          />
          {showSecondLine && (
            <Line
              type="monotone"
              dataKey="Ine Mood"
              stroke="blue"
              dot={false}
              strokeWidth={2}
              animationDuration={5000}
              isAnimationActive={true}
              onAnimationEnd={() => setShowAverageLines(true)}
            />
          )}
          {/* {showAverageLines && (
            <>
              <ReferenceLine
                y={ollyAverage}
                label={`Avg: ${ollyAverage.toFixed(2)}`}
                stroke="red"
                strokeDasharray="3 3"
              />
              <ReferenceLine
                y={ineAverage}
                label={`Avg: ${ineAverage.toFixed(2)}`}
                stroke="blue"
                strokeDasharray="3 3"
              />
            </>
          )} */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodChart;
