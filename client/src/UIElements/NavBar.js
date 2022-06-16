import { Button, Flex, Heading, Icon, Link, Text } from "@chakra-ui/react";
import { MdHome, MdDocumentScanner } from "react-icons/md";
import NavBarItem from "./NavBarItem";
import { AuthContext } from "../auth/AuthContext";
import { useContext } from "react";

export default function NavBar() {
  const auth = useContext(AuthContext);

  let navItems = [
    { icon: MdHome, title: "Dashboard", routerLink: "/" },
    { icon: MdDocumentScanner, title: "Entries", routerLink: "/entries" },
    { icon: MdHome, title: "Stats", routerLink: "/statspage" },
  ];

  let navItemsLogin = [{ icon: MdHome, title: "Dashboard", routerLink: "/" }];

  return (
    <Flex
      className="papapa"
      flexDir={["row", "row", "column", "column", "column"]}
      justifyContent={"space-between"}
      color="#fff"
    >
      <Flex flexDir={"column"} as="nav">
        <Heading
          mt={[5, 5, 50, 50, 50]}
          mb={[5, 5, 100, 100, 100]}
          // Space around logo/heading; need much more with long navbar
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
          {auth.isLoggedIn
            ? navItems.map((item) => (
                <NavBarItem
                  title={item.title}
                  icon={item.icon}
                  routerLink={item.routerLink}
                ></NavBarItem>
              ))
            : navItemsLogin.map((item) => (
                <NavBarItem
                  title={item.title}
                  icon={item.icon}
                  routerLink={item.routerLink}
                ></NavBarItem>
              ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
