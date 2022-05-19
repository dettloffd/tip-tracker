import {
  Avatar,
  Divider,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  MdAttachMoney,
  MdReceipt,
  MdToday,
  MdModeEditOutline,
  MdDelete,
  MdOutlinePriceCheck,
} from "react-icons/md";
import NavItem from "./NavItem";

export default function SideBar() {
  const [navSize, setNavSize] = useState("large");
  const [activeItem, setActiveItem] = useState(0);


  const handleClick = (index) => {
      setActiveItem(index);
  }

  let navItems = [
    { navSize: navSize, icon: MdAttachMoney, title: "Dashboard" },
    { navSize: navSize, icon: MdAttachMoney, title: "Stats" },
    { navSize: navSize, icon: MdAttachMoney, title: "Otherstuff" },
  ];

  return (
      
    <>
      <Flex
        pos="fixed"
        left="3"
        height="95vh"
        marginTop="2.5vh"
        boxShadow="0 4px 0 rgba(0,0,0,0.05)"
        borderRadius={navSize == "small" ? "15px" : "30px"}
        w={navSize == "small" ? "75px" : "200px"}
        flexDir="column"
        justifyContent="space-between"
        backgroundColor="white"
      >
        <Flex
          p={"5%"}
          flexDir={"column"}
          w="100%"
          alignItems={navSize == "small" ? "center" : "flex-start"}
          as="nav"
        >
          <IconButton
            background="none"
            mt="5"
            _hover={{ background: "none" }}
            icon={<MdAttachMoney />}
            onClick={() => {
              if (navSize == "small") {
                setNavSize("large");
              } else {
                setNavSize("small");
              }
            }}
          />
          

          {navItems.map((item, index) => (
            <NavItem
              navSize={item.navSize}
              icon={item.icon}
              title={item.title}
              active={index == activeItem ? true : false}
              handleClick={handleClick}
              index={index}
            //   onClick={(e) => {
            //     //   setActiveItem(e.target.value);
            //       console.log(e.target.value);
            // }}
            />
          ))}

        </Flex>
        <Flex
          p="5%"
          flexDir={"column"}
          width="100%"
          alignItems={"flex-start"}
          mb={4}
        >
          <Divider display={navSize == "small" ? "none" : "flex"} />
          <Flex mt={4} align="center">
            <Avatar size={"sm"} />
            <Flex
              flexDir={"column"}
              ml="4"
              display={navSize == "small" ? "none" : "flex"}
            >
              <Heading as="h3" size="sm">
                Something something
              </Heading>
              <Text color="gray">Testingggg</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
