import { useState, useRef, useEffect } from "react";

interface DraggableLegendProps {
  colorScale: (value: number) => string;
  maxVisitors: number;
}

export const DraggableLegend = ({
  colorScale,
  maxVisitors,
}: DraggableLegendProps) => {
  const [position, setPosition] = useState({ x: 16, y: 16 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const legendRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    document.body.style.userSelect = "none"; // Prevent text selection during drag
  };

  interface DragStartPosition {
    x: number;
    y: number;
  }

  const handleMouseMove = (e: MouseEvent): void => {
    if (!isDragging) return;

    const newX: number = e.clientX - dragStartPos.current.x;
    const newY: number = e.clientY - dragStartPos.current.y;

    // Get viewport dimensions
    const viewportWidth: number = window.innerWidth;
    const viewportHeight: number = window.innerHeight;

    // Get element dimensions
    const elementWidth: number = legendRef.current
      ? legendRef.current.offsetWidth
      : 0;
    const elementHeight: number = legendRef.current
      ? legendRef.current.offsetHeight
      : 0;

    // Constrain to viewport boundaries
    const constrainedX: number = Math.max(
      0,
      Math.min(newX, viewportWidth - (elementWidth || 0))
    );
    const constrainedY: number = Math.max(
      0,
      Math.min(newY, viewportHeight - (elementHeight || 0))
    );

    setPosition({
      x: constrainedX,
      y: constrainedY,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.userSelect = "";
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch: React.Touch = e.touches[0];
    setIsDragging(true);
    dragStartPos.current = {
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const touch: React.Touch = e.touches[0];

    const newX = touch.clientX - dragStartPos.current.x;
    const newY = touch.clientY - dragStartPos.current.y;

    // Constrain to viewport
    const viewportWidth: number = window.innerWidth;
    const viewportHeight: number = window.innerHeight;
    const elementWidth: number = legendRef.current?.offsetWidth || 0;
    const elementHeight: number = legendRef.current?.offsetHeight || 0;

    const constrainedX: number = Math.max(
      0,
      Math.min(newX, viewportWidth - elementWidth)
    );
    const constrainedY: number = Math.max(
      0,
      Math.min(newY, viewportHeight - elementHeight)
    );

    setPosition({
      x: constrainedX,
      y: constrainedY,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={legendRef}
      className={`fixed bg-white p-2 sm:p-3 rounded shadow-md text-xs sm:text-sm z-50 cursor-move ${
        isDragging ? "shadow-lg" : ""
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        touchAction: "none", // Prevent browser touch behaviors
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <span className="text-gray-950 text-[10px] bg-purple-500 p-[3px] rounded-lg ">
        Drag this modal
      </span>
      <div className="font-semibold text-black mb-1 sm:mb-2">
        Visitor Density
      </div>
      <div className="flex text-black flex-col space-y-0.5 sm:space-y-1">
        {[0, 0.25, 0.5, 0.75, 1].map((value) => (
          <div key={value} className="flex items-center">
            <div
              className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0"
              style={{
                backgroundColor: colorScale(maxVisitors * value),
              }}
            ></div>
            <span className="truncate">
              {value === 0
                ? "No data"
                : `${Math.round(
                    maxVisitors * value
                  ).toLocaleString()} visitors`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Usage in your component:
// <DraggableLegend colorScale={colorScale} maxVisitors={maxVisitors} />
