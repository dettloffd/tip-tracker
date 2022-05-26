import { useState, useRef, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays, subDays } from "date-fns";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { MdCalendarToday } from "react-icons/md";

const DateRangeSelector = ({ setDateRange, dateRange }) => {
  // inputValueField : used for showing the user what selected date range is being used on charts below
  const [inputValueField, setInputValueField] = useState("");

  // controls the date range being used in the date picker
  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  // controls whether the datepicker is open or not
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
    <Flex
      bgColor={"white"}
      padding={3}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection="column"
      className="calendarWrap"
      w="80%"
    >
      <InputGroup size="md">
        <InputLeftElement
          pointerEvents="none"
          children={<MdCalendarToday />}
        ></InputLeftElement>
        <Input
          mb={1}
          focusBorderColor="teal.400"
          width={"100%"}
          textAlign="center"
          onClick={() => setOpen((open) => !open)}
          placeholder="Set Custom Date Range for Charts"
          // If there's a value selected by the user, display that value
          // otherwise, make an empty string so that the user sees the placeholder
          value={
            inputValueField.start && inputValueField.end
              ? `${inputValueField.start} - ${inputValueField.end}  `
              : ""
          }
          className="inputBox"
        />
      </InputGroup>

      <div ref={refOne}>
        {open && (
          <DateRangePicker
            rangeColors={["#38B2AC"]}
            onChange={(item) => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
            className="calendarElement"
          />
        )}
      </div>
      <Flex justifyContent={"center"} alignItems="center" width={"100%"}>
        <Button
          variant="solid"
          colorScheme="teal"
          size="sm"
          // Sets the date range in parent element to trickle down to charts
          // also sets the inputValueFields to display this date in the input for the user
          onClick={() => {
            setDateRange({
              startDate: format(range[0].startDate, "yyyy-MM-dd"),
              endDate: format(range[0].endDate, "yyyy-MM-dd"),
            });
            setInputValueField({
              start: format(range[0].startDate, "yy/MM/dd"),
              end: format(range[0].endDate, "yy/MM/dd"),
            });
          }}
        >
          Set Date Range
        </Button>
        {/* This resets the parent element (so charts will cover all time) and the input fields */}
        {/* Also resets the range in the datepicker */}
        <Button
          size="sm"
          onClick={() => {
            // reset input fields
            setInputValueField("");
            // reset daterange in parent element
            setDateRange({
              startDate: "",
              endDate: "",
            });
            // reset datepicker ranges previously selected
            setRange([{
              startDate: null,
              endDate: null,
              key: "selection",

            }])
          }}
        >
          Reset
        </Button>
      </Flex>
    </Flex>
  );
};

export default DateRangeSelector;
