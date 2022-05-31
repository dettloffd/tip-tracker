import { Flex, Icon, Link, Menu, MenuButton, Text } from "@chakra-ui/react";
import React from "react";
import { MdHome } from "react-icons/md";

export default function NavBarItem({
  active,
  navSize,
  title,
  icon,
  index,
  handleClick,
}) {
  return (
    //   Set some hover CSS in css file for ease of use
    <Flex fontSize="lg" className="navbar-item" onClick={() =>{handleClick(index)}} color="gray.400" justifyContent="center" alignItems={"center"} mb={6} >
      <Link display={"center"}>
        <Icon display={["none", "none", "flex", "flex", "flex" ]}  className="navbar-item__icon" as={icon}  color={active ? "#38B2AC" : "inherit"}    />
      </Link>

      <Link display={["flex", "flex", "none", "flex", "flex" ]} _hover={{ textDecor: "none" }} ml={3} >
        <Text fontSize={["md", "md", "xs", "xs", "md"]} color={active ? "#fff" : "grey.400" }>{title}</Text>
      </Link>
    </Flex>
  );
}
