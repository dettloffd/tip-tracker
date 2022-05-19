import { useState, useRef, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import format from "date-fns/format";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays, subDays } from "date-fns";
import { Box, Button, Flex, Input } from "@chakra-ui/react";

const DateRangeSelector = ({ setDateRange }) => {
  const [range, setRange] = useState([
    {
      startDate: subDays(new Date(), 365),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
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
    <Flex padding={3}  className="calendarWrap">
      <Input
      focusBorderColor="teal.400"
        width={"20rem"}
        textAlign="center"
        onClick={() => setOpen((open) => !open)}
        value={`${format(range[0].startDate, "yyyy-MM-dd")} to ${format(
          range[0].endDate,
          "yyyy-MM-dd"
        )}`}
        // className="inputBox"
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
            direction="horizontal"
            className="calendarElement"
          />
        )}
      </div>
      <Button
        variant="solid"
        colorScheme="teal"
        onClick={() =>
          setDateRange({
            startDate: format(range[0].startDate, "yyyy-MM-dd"),
            endDate: format(range[0].endDate, "yyyy-MM-dd"),
          })
        }
      >
        HELLO
      </Button>
    </Flex>
  );
};

export default DateRangeSelector;
