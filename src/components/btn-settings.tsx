import { useState } from "react";

export const SettingsButton = ({ audioRef }: { audioRef: any }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleSettings}
        className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 p-1 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
        aria-label="Settings"
        aria-expanded={showSettings}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
          aria-hidden="true"
        >
          <path d="M5.507 4.048A3 3 0 017.785 3h8.43a3 3 0 012.278 1.048l1.722 2.008A4.533 4.533 0 0019.5 6h-15c-.243 0-.482.02-.715.056l1.722-2.008z" />
          <path
            fillRule="evenodd"
            d="M1.5 10.5a3 3 0 013-3h15a3 3 0 110 6h-15a3 3 0 01-3-3zm15 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm2.25.75a.75.75 0 100-1.5.75.75 0 000 1.5zM4.5 15a3 3 0 100 6h15a3 3 0 100-6h-15zm11.25 3.75a.75.75 0 100-1.5.75.75 0 000 1.5zM19.5 18a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {showSettings && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
          <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
            Playback Speed
          </div>
          {[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map((rate) => (
            <button
              key={rate}
              onClick={() => handlePlaybackRateChange(rate)}
              className={`block w-full text-left px-4 py-2 text-sm ${
                playbackRate === rate
                  ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {rate}x
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Example usage with audio element
// const AudioPlayer = () => {
//   const audioRef = useRef(null);

//   return (
//     <div className="flex items-center gap-2">
//       <audio ref={audioRef} controls src="your-audio-source.mp3" />
//       <SettingsButton audioRef={audioRef} />
//       {/* Include other buttons like download, share, etc. */}
//     </div>
//   );
// };
