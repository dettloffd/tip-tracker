import { useState, useRef, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import format from "date-fns/format";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays, subDays } from "date-fns";
import { Button } from "@chakra-ui/react";

const DateRangeSelector = ({setSelectedDateRange}) => {

  const [range, setRange] = useState([
    {
      startDate: subDays(new Date(), 30),
      endDate: new Date(),
      key: "selection", 
    },
  ]);

//   console.log(range);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    // setCalendar(format(new Date(), "yyyy-MM-dd"));
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // get target element to toggle
  const refOne = useRef(null);

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <div className="calendarWrap">
      <input
        onClick={() => setOpen((open) => !open)}
        value={`${format(range[0].startDate, "yyyy-MM-dd")} to ${format(
          range[0].endDate,
          "yyyy-MM-dd"
        )}`}
        className="inputBox"
      />

      <div ref={refOne}>
        {open && (
          <DateRangePicker
          rangeColors={["#38B2AC"]}
            onChange={(item) => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={2}
            direction="vertical"
            className="calendarElement"
          />
        )}
      </div>
      <Button onClick={()=>setSelectedDateRange({startDate: new Date(format(range[0].startDate, "yyyy-MM-dd")), endDate: new Date(format(
          range[0].endDate,
          "yyyy-MM-dd"
        ))})}>HELLO</Button>
    </div>
  );
};

export default DateRangeSelector;
