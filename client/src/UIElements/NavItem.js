import { Flex, Icon, Link, Menu, MenuButton, Text } from "@chakra-ui/react";
import React from "react";

export default function NavItem({
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
          p={3}
          borderRadius={8}
          backgroundColor={active && "#AEC8CA"}
          w={navSize == "large" && "100%"}
          _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? "AEC8CA" : "gray.500"}
              />
              <Text ml={5} display={navSize == "small" ? "none" : "flex"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}
