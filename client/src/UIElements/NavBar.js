import { Flex, Heading, Icon, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import { MdHome, MdDocumentScanner } from "react-icons/md";
import NavBarItem from "./NavBarItem";

export default function NavBar() {
  let navItems = [
    { icon: MdHome, title: "Dashboard", routerLink: "/" },
    { icon: MdDocumentScanner, title: "Entries", routerLink: "/entries" },
    { icon: MdHome, title: "Stats", routerLink: "/statspage" },
  ];

  return (
    <Flex
      className="papapa"
      flexDir={["row", "row", "column", "column", "column"]}
      justifyContent={"space-between"}
      color="#fff"
    >
      <Flex flexDir={"column"} as="nav">
        <Heading
          mt={50}
          mb={100}
          fontSize={"4xl"}
          alignSelf="center"
          letterSpacing={"tight"}
        >
          <Text color={"teal.500"}>$</Text>
        </Heading>
        <Flex
          className="navbar-items-container"
          // Puts nav items in a row when small size, column on large
          flexDir={["row", "row", "column", "column", "column"]}
          alignItems={[
            "flex-start",
            "flex-start",
            "center",
            "flex-start",
            "flex-start",
          ]}
          justifyContent={"center"}
        >
          {navItems.map((item) => (
            <NavBarItem
              // active={index === activeItem ? true : false}
              title={item.title}
              icon={item.icon}
              routerLink={item.routerLink}
            ></NavBarItem>
          ))}
        </Flex>
      </Flex>

      <Flex></Flex>
    </Flex>
  );
}
