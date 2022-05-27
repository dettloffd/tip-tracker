import { Flex, Heading, Icon, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import { MdHome } from "react-icons/md";
import NavBarItem from "./NavBarItem";



export default function NavBar() {
    const [navSize, setNavSize] = useState("large");
    const [activeItem, setActiveItem] = useState(0);

    const handleClick = (index) => {
        setActiveItem(index);
    }

  let navItems = [
    { navSize: navSize, icon: MdHome, title: "Dashboard" },
    { navSize: navSize, icon: MdHome, title: "Stats" },
    { navSize: navSize, icon: MdHome, title: "Otherstuff" },
  ];
  return (


    
    <Flex
      pos="sticky"
      flexDir="column"
      justifyContent={"space-between"}
      color="#fff"
    >
      <Flex flexDir={"column"} w="100%" as="nav" alignItems={navSize === "small" ? "center" : "flex-start"}>
        <Heading
          mt={50}
          mb={100}
          fontSize={"4xl"}
          alignSelf="center"
          letterSpacing={"tight"}
        >
          Yo
        </Heading>
        <Flex
          flexDir={"column"}
          alignItems="flex-start"
          justifyContent={"center"}
        >
          {navItems.map((item, index) => (
            <NavBarItem
              navSize={item.navSize}
              icon={item.icon}
              title={item.title}
              active={index === activeItem ? true : false}
              handleClick={handleClick}
              index={index}
              //   onClick={(e) => {
              //     //   setActiveItem(e.target.value);
              //       console.log(e.target.value);
              // }}
            />
          ))}




          {/* <Flex className="sidebar-item">
            <Link>
              <Icon as={MdHome} fontSize="xl" className="active-icon"></Icon>
            </Link>

            <Link _hover={{ textDecor: "none" }}>
              <Text className="active">Home</Text>
            </Link>
          </Flex>


          <Flex className="sidebar-item">
            <Link>
              <Icon as={MdHome} fontSize="xl" ></Icon>
            </Link>

            <Link _hover={{ textDecor: "none" }}>
              <Text >Home</Text>
            </Link>
          </Flex>


          <Flex className="sidebar-item">
            <Link>
              <Icon as={MdHome} fontSize="xl" ></Icon>
            </Link>

            <Link _hover={{ textDecor: "none" }}>
              <Text >Home</Text>
            </Link>
          </Flex> */}
        </Flex>
      </Flex>

      <Flex></Flex>
    </Flex>
  );
}
