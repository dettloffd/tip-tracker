import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import React, { useState, useCallback, useEffect } from "react";
import { AuthContext } from "./auth/AuthContext";
import EntryInputForm from "./entries/components/EntryInputForm";
import EntryLog from "./entries/components/EntryLog";
import HeatMap from "./entries/components/HeatMap";
import EntryPage from "./entries/pages/EntryPage";
import StatsDisplay from "./stats/pages/StatsDisplay";
import StatsPage from "./stats/pages/StatsPage";
import NavBar from "./UIElements/NavBar";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";

import DateRangeSelector from "./util/DateRangeSelector";
import Auth from "./auth/Auth";

let autoLogoutTimer;

const AppHome = () => {
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [token, setToken] = useState(null);
  // const [userId, setUserId] = useState("62a27d91edd5427ca690330c");
  const [userId, setUserId] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();


  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    // this based on 1hr expiration date set in users-controllers (1000ms * 60seconds * 60 = 1hr)
    // ** If already logged in and token has already begun to expire, expirationDate already exists...
    // if not, create it
    setTokenExpirationDate(tokenExpirationDate);
    // ** The "state" tokenExpirationDate different than the one used in this useEffect
    // the state tokenExpirationDate used to setup logout timer
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
    // only text can be stored in localStorage - use stringify to do so
    // toISOstring so no data is lost when date is stringified
  }, []);

  // 62a02323161e5509490875a4
  // 5f0aa38f2a9f992d74ff4533

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    // If there is a token and a tokenExpirationDate, determine the amount of time until that 1hr is complete
    // otherwise, clear the timeout
    if (token && tokenExpirationDate){
      const remaininingTokenTime = tokenExpirationDate.getTime() - new Date().getTime();
      // getTime() - put into milliseconds
      autoLogoutTimer = setTimeout(logout, remaininingTokenTime);
    } else {
      clearTimeout(autoLogoutTimer);
      // might have manually clicked logout
    }

  }, [token, logout, tokenExpirationDate]);
  // if token changes.. changes take place to due login or logout
  // can use logout here due to useCallback not recreating the function - no infinite loop
  



  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    // text extracted in JSON format
    //use parse to convert JSON string to javascript object
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
      // if storedData.expiration is in the future.. (therefore token is still valid)..
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
      // keep expirationDate the same if one already exists in the future
    }
  }, [login]);
  // can set login as dependency since useCallback on login ensures it's only run once

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Flex
                w={["80%", "80%", "35%", "35%", "35%"]}
                p="1.25%"
                flexDir="column"
                bg="gray.100"
                mt={"5rem"}
                alignSelf={["center", "center", "flex-start"]}
              >
                <EntryInputForm />

                <Box
                  bg={"white"}
                  m={3}
                  boxShadow="lg"
                  p={4}
                  borderRadius="lg"
                  fontSize={["md", "md", "xl"]}
                >
                  <Flex
                    justifyContent={"space-between"}
                    p={3}
                    mt={3}
                    mb={1}
                    bg="white"
                  >
                    <Text fontSize={["md", "md", "xl"]}>Recent Entries</Text>{" "}
                    <Link to="/entries">
                      <Text
                        fontSize={["md", "md", "lg"]}
                        fontWeight={"bold"}
                        color="teal.500"
                      >
                        See All
                      </Text>
                    </Link>
                  </Flex>
                  <Divider mb={5} />
                  <EntryLog
                    numResults={10}
                    dateRange={{ startDate: "", endDate: "" }}
                  />
                </Box>
              </Flex>

              <Flex
                flexDir="column"
                minH="100vh"
                p="1% 2% 1% 1%"
                w={["90%", "90%", "55%", "55%", "55%"]}
                bg="gray.100"
                mt={"5rem"}
                alignSelf={["center", "center", "flex-start"]}
              >
                <Flex
                  p={5}
                  justifyContent={"center"}
                  alignItems="center"
                  bgColor={"white"}
                  flexDir="column"
                  boxShadow="md"
                  borderRadius={"lg"}
                >
                  <HeatMap
                    mapwidth="82%"
                    mapheight="20rem"
                    numDays={100}
                  ></HeatMap>
                </Flex>

                <Flex
                  bg="white"
                  boxShadow="lg"
                  borderRadius={"lg"}
                  direction={"column"}
                  alignItems="center"
                  m={2}
                >
                  <DateRangeSelector
                    setDateRange={setDateRange}
                    dateRange={dateRange}
                  />
                </Flex>

                <StatsDisplay dateRange={dateRange} />
              </Flex>
            </>
          }
        />

        <Route
          path="/entries"
          element={
            <Flex w={["100%", "100%", "90%"]}>
              {/* If page is in vertical mode, take up 100% of width */}
              <EntryPage
                numResults={30}
                // dateRange={dateRange}
                // setDateRange={setDateRange}
              />
            </Flex>
          }
        />

        <Route
          path="/statspage"
          element={
            <Flex w={["100%", "100%", "90%"]}>
              {/* If page is in vertical mode, take up 100% of width */}
              <StatsPage />
            </Flex>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route
          path="/auth"
          element={
            <Flex w={["100%", "100%", "90%"]}>
              {/* If page is in vertical mode, take up 100% of width */}
              <Auth />
            </Flex>
          }
        />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
        userId: userId,
      }}
    >
      <BrowserRouter>
        <Flex
          flexDir={["column", "column", "row"]}
          maxWidth={"155rem"}
          minH="100vh"
        >
          {/* col1 */}
          <Flex
            backgroundColor="#252627"
            w={["100%", "100%", "10%", "10%", "10%"]}
            pos="relative"
            justifyContent={"center"}
            className="navbar-container"
          >
            <Flex
              pos={[null, null, "fixed", "fixed", "fixed"]}
              justifyContent={"space-between"}
              flexDir={["column", "column", "column"]}
              alignItems="center"
              className="sticky-navbar-component"
              w={["100%", "100%", "10%", "10%", "10%"]}
              h={"80%"}
              // Height controls how far down the page the logout button goes
            >
              <NavBar />
              <Button onClick={logout} mb={2} size={"xs"}>
                Logout
              </Button>
            </Flex>
          </Flex>
          {routes}
        </Flex>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default AppHome;
