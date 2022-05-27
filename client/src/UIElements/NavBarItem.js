import { Flex, Icon, Link, Menu, MenuButton, Text } from "@chakra-ui/react";
import React from "react";



export default function NavBarItem({
  active,
  navSize,
  title,
  icon,
  index,
  handleClick,
}) {
  return (
    <Flex
      width={"100%"}
      flexDir={"column"}
      alignItems={navSize == "small" ? "center" : "flex-start"}
      mt={30}
      onClick={() =>{handleClick(index)}}
    >
      <Menu placement="right">
        <Link
          p={2}
          borderRadius={8}
          backgroundColor={active && "#38B2AC"}
          w={navSize == "large" && "100%"}
          _hover={{ textDecor: "none", backgroundColor: "#38B2AC" }}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? "AEC8CA" : "gray.500"}
              />
              <Text fontSize={"large"} ml={5} display={navSize == "small" ? "none" : "flex"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}