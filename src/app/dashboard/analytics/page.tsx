"use client";
import initialVisitorData from "@/components/data.json";
import SimpleVisitorGlobe from "@/components/SimpleVisitorGlobe";
import { Button } from "@/components/ui/button"; // Assumed - adjust path if needed
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Assumed - adjust path if needed
import { ScrollArea } from "@/components/ui/scroll-area"; // Assumed - adjust path if needed
import { motion } from "framer-motion";
import { Loader2, MapPin, Users } from "lucide-react"; // Import icons
import { useCallback, useEffect, useState } from "react";

// Color mapping function (adjust as needed)
const getColor = (visitors: number): string => {
  if (visitors > 100000) return "#6b0504"; // Darkest Red
  else if (visitors > 75000) return "#9e1010"; // Darker Red
  else if (visitors > 50000) return "#c31414"; // Dark Red
  else if (visitors > 30000) return "#e53935"; // Red
  else if (visitors > 10000) return "#ff5252"; // Light Red
  else if (visitors > 5000) return "#ff7043"; // Orange Red
  else if (visitors > 1000) return "#ff8a65"; // Light Orange Red
  else if (visitors > 500) return "#ffab91"; // Light Orange
  else if (visitors > 100) return "#ffcc80"; // Very Light Orange
  else return "#ffe082"; // Light Yellow
};

// Simple Country Map Component (Placeholder - Replace with actual map)
// TODO REPLACE

// Top Countries List Component
const TopCountriesList = ({
  visitorData,
  onCountryClick,
}: {
  visitorData: typeof initialVisitorData;
  onCountryClick: (countryCode: string) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortedData, setSortedData] = useState<typeof initialVisitorData>([]);

  useEffect(() => {
    // Sort data by visitors in descending order
    const sorted = [...visitorData].sort((a, b) => b.visitors - a.visitors);
    setSortedData(sorted);
  }, [visitorData]);

  const topCountries = sortedData.slice(0, 5);
  console.log(sortedData);

  return (
    <div className="w-full md:w-1/3 space-y-4">
      <h2 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
        <Users className="w-5 h-5" />
        Top 5 Countries
      </h2>
      <div className="bg-gray-800/50 backdrop-blur-md rounded-lg p-4 shadow-md border border-gray-700 space-y-2">
        {topCountries.map((country) => (
          <motion.div
            key={country.code}
            className="flex items-center justify-between p-2 rounded-md hover:bg-gray-700/50 transition-colors cursor-pointer"
            onClick={() => onCountryClick(country.code)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-200 font-medium">
                {country.country}
              </span>
            </div>
            <span className="text-gray-300">
              {country.visitors.toLocaleString()}
            </span>
          </motion.div>
        ))}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full bg-gray-800/50 hover:bg-gray-700/50 text-gray-200 border-gray-700 shadow-md"
          >
            Show More
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700 text-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-gray-100">All Countries</DialogTitle>
            <DialogDescription className="text-gray-400">
              Visitor data for all countries.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-72">
            <div className="space-y-2">
              {sortedData.map((country) => (
                <div
                  key={country.code}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{country.country}</span>
                  </div>
                  <span className="text-gray-300">{country.visitors}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
          <DialogClose asChild>
            <Button
              variant="secondary"
              className="mt-4 w-full bg-gray-800/50 hover:bg-gray-700/50 text-gray-200 border-gray-700"
            >
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const VisitorsMap = () => {
  const [visitorData, setVisitorData] =
    useState<typeof initialVisitorData>(initialVisitorData);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Simulate data fetching (replace with actual API call)
  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      // Simulate data update
      // In a real app, you'd fetch data from an API
      // For this example, we'll just add some random variation
      const updatedData = initialVisitorData.map((item) => ({
        ...item,
        visitors: item.visitors, // +/- 10000
      }));
      setVisitorData(updatedData);
      setLoading(false);
    }, 2000); // Simulate 2-second delay

    return () => clearTimeout(timeoutId);
  }, []);

  const handleCountryClick = useCallback((countryCode: string) => {
    setSelectedCountry(countryCode);
    // In a real app, you might want to show more details about the selected country
    console.log("Clicked on country:", countryCode);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Website Visitors by Location
          </h1>
          <p className="text-gray-400 text-lg">
            Explore visitor data from around the world. Click on a country to
            see details.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="animate-spin text-4xl text-gray-400" />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            {/* // TODO REPLACE */}
            {/* <CountryMap
              visitorData={visitorData}
              selectedCountry={selectedCountry}
              onCountryClick={handleCountryClick}
            /> */}
            <SimpleVisitorGlobe visitorData={initialVisitorData} />
            <TopCountriesList
              visitorData={visitorData}
              onCountryClick={handleCountryClick}
            />
          </div>
        )}

        {/* Selected Country Info (Optional -  add more details as needed) */}
        {selectedCountry && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 backdrop-blur-md rounded-lg p-4 shadow-md border border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-200">
              Selected Country:
            </h3>
            <p className="text-gray-300">
              Code: {selectedCountry}
              {/* Add more country details here */}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VisitorsMap;
