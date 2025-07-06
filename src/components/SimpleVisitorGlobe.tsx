"use client";

import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { useState } from "react";
import Countriesdata from "@/components/data.json";
import { DraggableLegend } from "./draggable-legend";
// import { saveToFile } from "./save-to-file";

// const countries = [];

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const SimpleVisitorGlobe = ({
  visitorData,
}: {
  visitorData: typeof Countriesdata;
}) => {
  const [tooltipContent, setTooltipContent] = useState<{
    country: string;
    visitors: number;
    code: string;
  } | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Create a color scale with a wider range of colors
  const maxVisitors = Math.max(...visitorData.map((d) => d.visitors));

  const colorScale = scaleLinear<string>()
    .domain([
      0,
      maxVisitors * 0.25,
      maxVisitors * 0.5,
      maxVisitors * 0.75,
      maxVisitors,
    ])
    .range(["#e6f3ff", "#7fb9ff", "#3c82f6", "#1a56c9", "#0d2b80"]);

  // Function to handle mouse movement for tooltip positioning
  interface TooltipPosition {
    x: number;
    y: number;
  }

  interface MouseEventWithClient
    extends React.MouseEvent<HTMLDivElement, MouseEvent> {
    clientX: number;
    clientY: number;
  }

  const handleMouseMove = (event: MouseEventWithClient): void => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div className="relative w-full h-full" onMouseMove={handleMouseMove}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 120,
          center: [0, 20],
        }}
        className="w-full h-full"
      >
        {/* Background and graticule */}
        <Sphere
          stroke="#E4E5E6"
          strokeWidth={0.5}
          fill="transparent"
          id="background"
        />
        {/* <Graticule stroke="#E4E5E6" strokeWidth={0.5} /> */}

        <Geographies geography={geoUrl}>
          {({ geographies }: { geographies: any[] }) =>
            geographies.map((geo, i) => {
              const countryData = visitorData.find((d) => d.id === geo.id);
              //   console.log("geo", { id: geo.id, name: geo.properties.name });
              //   const output = { id: geo.id, name: geo.properties.name };
              const visitors = countryData?.visitors || 0;
              //   countries.push(output);
              //   if (i === geographies.length - 1) {
              //     saveToFile(countries);
              //   }
              const countryName = geo.properties.name;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={visitors ? colorScale(visitors).toString() : "#F5F5F5"}
                  stroke="#D6D6DA"
                  strokeWidth={0.3}
                  style={{
                    default: { outline: "none" },
                    hover: {
                      fill: visitors
                        ? colorScale(visitors * 1.2).toString()
                        : "#DDDDDD",
                      outline: "none",
                      stroke: "#3c82f6",
                      strokeWidth: 0.8,
                    },
                    pressed: { outline: "none" },
                  }}
                  onMouseEnter={() => {
                    setTooltipContent({
                      country: countryName,
                      visitors: visitors,
                      code: geo.properties.isoA2,
                    });
                  }}
                  onClick={() => {
                    setTooltipContent({
                      country: countryName,
                      visitors: visitors,
                      code: geo.properties.isoA2,
                    });
                    console.log(tooltipContent);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent(null);
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Tooltip */}
      {tooltipContent && (
        <div
          className="absolute bg-white p-3 rounded shadow-md text-sm pointer-events-none z-10"
          style={{
            left: `${tooltipPosition.x - 200}px`,
            top: `${tooltipPosition.y - 20}px`,
            minWidth: "160px",
            transform: "translateY(-50%)",
          }}
        >
          <div className="font-semibold text-black">
            {tooltipContent.country} ({tooltipContent.code})
          </div>
          <div className="text-blue-600">
            {tooltipContent.visitors.toLocaleString()} visitors
          </div>
        </div>
      )}

      {/* Enhanced Legend */}
      <DraggableLegend colorScale={colorScale} maxVisitors={maxVisitors} />
    </div>
  );
};

export default SimpleVisitorGlobe;
