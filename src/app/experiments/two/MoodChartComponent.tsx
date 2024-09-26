"use client";
import lineBlack from "./lineBlack.png";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { format, parseISO } from "date-fns";

interface MoodChartComponentProps {
  data: any[];
  dataKey: string;
  color: string;
  average: number;
  imageSrc: any;
  altText: string;
  showAverageLine?: boolean;
  domain?: [number, number];
}

const MoodChartComponent: React.FC<MoodChartComponentProps> = ({
  data,
  dataKey,
  color,
  average,
  imageSrc,
  altText,
  showAverageLine = false,
  domain = [0, 100],
}) => {
  const [showAverageLines, setShowAverageLines] = useState(false);

  const formatXAxis = (tickItem: string) => {
    return format(parseISO(tickItem), "MMM");
  };

  const filteredData = data.filter((entry, index, array) => {
    const currentMonth = format(parseISO(entry.Date), "MMM");
    if (
      currentMonth === "Aug" &&
      format(parseISO(entry.Date), "yyyy") === "2023"
    )
      return false;
    const previousMonth =
      index > 0 ? format(parseISO(array[index - 1].Date), "MMM") : null;
    return currentMonth !== previousMonth;
  });

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          syncId={"sync"}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey="Date"
            ticks={filteredData.map((entry) => entry.Date)}
            tickFormatter={formatXAxis}
            tick={{ fontSize: 20, dy: 8 }}
          />
          <YAxis hide={false} domain={domain} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            dot={false}
            strokeWidth={2}
            animationDuration={5000}
            isAnimationActive={true}
            onAnimationEnd={() => setShowAverageLines(true)}
          />
          {showAverageLines && (
            <ReferenceLine
              y={average}
              label={{
                value: `Avg: ${average.toFixed(2)}`,
                position: "bottom",
                dy: 50,
                dx: -5,
                fontSize: 12,
              }}
              stroke={color}
              strokeDasharray="3 3"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
      <div className="absolute bottom-12 left-12 right-12 flex items-end justify-end gap-2 ">
        <Image
          src={imageSrc}
          alt={altText}
          className="w-36 rounded-full h-36 object-cover"
        />
      </div>
    </div>
  );
};

export default MoodChartComponent;
