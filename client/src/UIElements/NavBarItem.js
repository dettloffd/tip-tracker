import {Link as RouterLink} from 'react-router-dom';
import { Flex, Icon, Link, Menu, MenuButton, Text } from "@chakra-ui/react";
import React from "react";


export default function NavBarItem({
  active,
  handleClick,
  navSize,
  icon,
  index,
  title,
  routerLink

  
}


)

{
  console.log(routerLink);
  return (
    
    //   Set some hover CSS in css file for ease of use
    <RouterLink to={routerLink}>
    <Flex fontSize="lg" className="navbar-item" onClick={() =>{handleClick(index)}} color="gray.400" justifyContent="center" alignItems={"center"} mb={6} >
      
      <Link display={"center"}>
        <Icon display={["none", "none", "flex", "flex", "flex" ]}  className="navbar-item__icon" as={icon}  color={active ? "#38B2AC" : "inherit"}    />
      </Link>

      <Link display={["flex", "flex", "none", "flex", "flex" ]} _hover={{ textDecor: "none" }} ml={3} >
        <Text fontSize={["md", "md", "xs", "xs", "md"]} color={active ? "#fff" : "grey.400" }>{title}</Text>
      </Link>
      
    </Flex>
    </RouterLink>
  );
}
