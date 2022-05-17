import React from "react";
import EntryItem from './EntryItem'
// import { List, Divider } from "@material-ui/core";
import {
    List
  } from '@chakra-ui/react'

const EntryLog = (props) => {
    return (
        <>
          <List 
          width={"100%"}
        //   maxW=" 500px"
        //   maxW="36rem"
          >
            {props.entries.map((entry) => (
              <>
                <EntryItem
                  {...entry}
                  /////THIS ALLOWS FOR just this instead of below... basically just passing the whole entry object in
                  // date={entry.date}
                  // numDelivs={entry.numDelivs}
                  // tipsTotal={entry.tipsTotal}
                />
              </>
            ))}
          </List>
        </>
      );
};
  
    // if (props.entries.length === 0) {
    //   {
    //     return <p>work work</p>;
    //   }
    // }
    // else{
    //     return <p>something something</p>
    // }


export default EntryLog;