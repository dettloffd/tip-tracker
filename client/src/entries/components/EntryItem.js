import React from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import {
  MdAttachMoney,
  MdReceipt,
  MdToday,
  MdModeEditOutline,
  MdDelete,
  MdOutlinePriceCheck,
} from "react-icons/md";
//
import useToggleStateHook from "../../hooks/useToggleStateHook";
import GeneralModal from "../../UIElements/GeneralModal";
import EditEntryInputForm from "./EditEntryForm";
import DeleteEntryForm from "./DeleteEntryForm";
//
import { format, parseISO } from "date-fns";

const entryIcons = [MdToday, MdReceipt, MdAttachMoney, MdOutlinePriceCheck];

const EntryItem = ({ numTransactions, date, tipsTotal, _id }) => {
  const [isEditing, toggleEditing] = useToggleStateHook(false);
  const [isDeleting, toggleDeleting] = useToggleStateHook(false);

  function mapEntryData(name, data) {
    return { name, data };
  }

  const dataRows = [
    mapEntryData("Number of Transactions", numTransactions),
    mapEntryData("Tips Total", tipsTotal),
    mapEntryData("Average Tip", (tipsTotal / numTransactions).toFixed(2)),
  ];

  const entryButtons = [
    { name: "Edit", functionality: toggleEditing, icon: <MdModeEditOutline /> },
    { name: "Delete", functionality: toggleDeleting, icon: <MdDelete /> },
  ];

  return (
    <>
      {isEditing && (
        <GeneralModal
          modalContent={
            <EditEntryInputForm
              date={date}
              numTransactions={numTransactions}
              tipsTotal={tipsTotal}
              _id={_id}
            />
          }
          toggleMutationState={toggleEditing}
        />
      )}

      {isDeleting && (
        <GeneralModal
          modalContent={<DeleteEntryForm _id={_id} />}
          toggleMutationState={toggleDeleting}
        />
      )}

      <Box
        boxShadow="lg"
        bg="white"
        p={3}
        borderRadius="lg"
        mb={5}
        _hover={{
          transition: "all .25s",
          transform: "auto",
          translateY: "-3px",
          boxShadow: "lg",
        }}
      >
        {dataRows.map((row, index) => (
          <ListItem _hover={{ bg: "gray.100" }}>
            <Flex justify="space-between" alignItems="center">
              <Box>
                {/* <ListIcon size="lg">{entryIcons[index]}</ListIcon> {row.name} */}
                {/* This flex keeps the icon and field name centered horizontally  */}
                <Flex alignItems="center">
                  <Icon
                    as={entryIcons[index]}
                    w={6}
                    h={6}
                    color="teal.500"
                    m={2}
                  />
                  <Text fontSize={["xs", "sm", "sm"]}>{row.name}</Text>
                </Flex>
              </Box>
              <Box>
                <Text fontSize={["xs", "sm", "sm"]}>{row.data}</Text>
              </Box>
            </Flex>
            <Divider mt={1} />
          </ListItem>
        ))}

        <ListItem>
          <Flex justify="space-between" align={"center"}>
            <Flex justifyContent={"center"} alignItems={"center"}>
              <Text color="gray.500" fontSize={["xs", "sm", "sm"]}>
                {format(parseISO(date), "EEEE, yyyy-MM-dd")}
              </Text>
            </Flex>
            <Box>
              <Button
                onClick={toggleEditing}
                variant="solid"
                colorScheme="teal"
                size={"xs"}
                ml={2}
                mt={3}
              >
                <Text display={['none', 'none', 'none', 'flex', 'flex']}>Edit</Text>
                <Icon as={MdModeEditOutline} display={[ "md","md", "md", "none", "none"]} />
              </Button>

              <Button
                onClick={toggleDeleting}
                variant="solid"
                colorScheme="teal"
                size={"xs"}
                ml={2}
                mt={3}
              >
                <Text display={['none', 'none', 'none', 'flex', 'flex']}>Delete</Text>
                <Icon as={MdDelete} display={[ "md","md", "md", "none", "none"]} />
              </Button>



              {/* {entryButtons.map((button) => (
                <Button
                  onClick={button.functionality}
                  variant="solid"
                  colorScheme="teal"
                  size={"xs"}
                  ml={2}
                  mt={3}
                >
                  
                  <Icon ></Icon>
                </Button>
              ))} */}
            </Box>
          </Flex>
        </ListItem>
      </Box>
      {/* <p>{_id}</p>
        <p>{(tipsTotal/numTransactions).toFixed(2)}</p> */}
    </>
  );
};

export default EntryItem;
