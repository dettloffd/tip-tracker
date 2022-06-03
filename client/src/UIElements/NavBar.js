import { Flex, Heading, Icon, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import { MdHome, MdDocumentScanner } from "react-icons/md";
import NavBarItem from "./NavBarItem";

export default function NavBar() {
  const [navSize, setNavSize] = useState("large");
  const [activeItem, setActiveItem] = useState(0);

  const handleClick = (index) => {
    setActiveItem(index);
  };

  let navItems = [
    { navSize: navSize, icon: MdHome, title: "Dashboard", routerLink: "/" },
    { navSize: navSize, icon: MdDocumentScanner, title: "Entries", routerLink: "/entries" },
    { navSize: navSize, icon: MdHome, title: "Otherstuff", routerLink: "/" },
  ];
  return (
    <Flex
    className="papapa"
    //   pos="sticky"
      flexDir={["row", "row", "column", "column",  "column"]}
      justifyContent={"space-between"}
      color="#fff"
    >
      <Flex
        flexDir={"column"}
        // w="100%"
        as="nav"
        // alignItems={navSize === "small" ? "center" : "flex-start"}
      >
        <Heading
          mt={50}
          mb={100}
          fontSize={"4xl"}
          alignSelf="center"
          letterSpacing={"tight"}
        >
          <Text color={"teal.500"}>$</Text>
        </Heading>
        <Flex className="navbar-items-container"
        // Puts nav items in a row when small size, column on large
          flexDir={["row", "row", "column", "column",  "column"]} 
          alignItems={["flex-start", "flex-start", "center", "flex-start", "flex-start"]}
          justifyContent={"center"}
        >
          {/* {navItems.map((item, index) => (
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
          ))} */}

          {navItems.map((item, index) => (
            <NavBarItem
              active={index === activeItem ? true : false}
              title={item.title}
              icon={item.icon}
              handleClick={handleClick}
              index={index}
              routerLink={item.routerLink}
            >

            </NavBarItem>
          ))}

          {/* <Flex active={index === activeItem ? true : false} className="sidebar-item">
            <Link>
              <Icon as={MdHome} fontSize="xl"></Icon>
            </Link>

            <Link _hover={{ textDecor: "none" }}>
              <Text className="active">Home</Text>
            </Link>
          </Flex> */}

          {/* <Flex className="sidebar-item">
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
