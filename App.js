import React, { useCallback } from "react";
import { useState } from "react";
import { Searchbar } from "react-native-paper";
import { debounce } from "lodash";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
  Button,
} from "react-native";

const App = () => {
  var searchQuery,
    setSearchQuery,
    searchClicked,
    setSearchClicked,
    searchQueryM,
    setSearchQueryM,
    searchClickedM,
    setSearchClickedM;
  const [loading, setLoading] = useState(0);
  const [home, setHome] = useState(1);
  const [searchPage, setSearchPage] = useState(0);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [relSer, setRelSer] = useState("");
  const [searchIndex, setSearchIndex] = useState(0);

  const backHandle = () => {
    setLoading(0);
    setSearchPage(0);
    setHome(1);
  };

  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return (
      <View
        style={{
          display: "flex",
          width: "80%",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        <Image
          source={require("./src/link.png")}
          onPress={handlePress}
          style={{
            width: 40,
            height: 40,
            marginLeft: "10%",
            marginTop: 4,
            padding: 2,
            backgroundColor: "#5EEAD4",
            borderRadius: 10,
          }}
        ></Image>
        <Text
          onPress={handlePress}
          style={{
            color: "#204B56",
            fontSize: 20,
            fontWeight: "bold",
            marginLeft: "10%",
            width: "80%",
          }}
        >
          Link
        </Text>
      </View>
    );
  };

  const OpenURLSearch = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`URL Error: ${url}`);
      }
    }, [url]);

    return (
      <View
        style={{
          display: "flex",
          width: "80%",
          flexDirection: "row",
          alignItems: "center",
          margin: 5,
          marginTop: 6,
          padding: 4,
          borderRadius: 5,
          marginLeft: "10%",
          backgroundColor: "#fff",
        }}
      >
        <Image
          onPress={handlePress}
          source={require("./src/search-svgrepo-com.png")}
          style={{
            width: 40,
            height: 40,
            marginLeft: "10%",
            marginTop: 4,
            padding: 2,
            borderRadius: 10,
          }}
        ></Image>
        <Text
          onPress={handlePress}
          style={{
            color: "#204B56",
            fontSize: 20,
            fontWeight: "bold",
            marginLeft: "10%",
            width: "80%",
          }}
        >
          {children}
        </Text>
      </View>
    );
  };

  const Loading = () => (
    <View
      style={{
        backgroundColor: "#44B5A1",
        borderRadius: 8,
        width: "80%",
        height: "80%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      {/* Loading Animation SVG */}
      {/* Replace with your own SVG or animation component */}
      {/* <BikeSvg /> */}
      <Image
        source={require("./assets/bike.gif")}
        style={{ width: "80%", height: "60%", resizeMode: "contain" }}
      ></Image>
    </View>
  );

  const Home = () => {
    return (
      <View
        style={{
          borderRadius: 8,
          width: "80%",
          height: "80%",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <View>
          <Text style={{ color: "white", fontSize: 35, fontWeight: "bold" }}>
            <Text style={{ color: "#17c0eb" }}>S</Text>earch
            <Text style={{ color: "#f56565" }}>AI</Text>
          </Text>
          <View style={{ display: "flex", margin: 4 }}>
            <SearchBar />
          </View>
        </View>
      </View>
    );
  };

  const SearchBar = () => {
    [searchClicked, setSearchClicked] = useState(false);
    [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
      setSearchClicked(true);
      setHome(0);
      setSearchPage(0);
      setLoading(1);

      const searchRes = () => {
        if (searchQuery !== "" || searchQuery.replaceAll(" ", "") !== "") {
          fetch(`http://searchai-7lx6.onrender.com/api.search?${searchQuery}`)
            .then((response) => response.json())
            .then((data) => {
              try {
                data = JSON.parse(data);
                setRelSer(data.related_search_on_google);
                setTitle(data.title);
                setText(data.text);
                setLink(data.link);
                setLoading(0);
                setSearchPage(1);
                setSearchIndex(0);
                setSearchQueryM(searchQuery);
              } catch (error) {
                setSearchIndex(0);
              }
            });
          setTimeout(() => {
            if (searchIndex !== 1) {
            } else {
              searchRes();
            }
          }, 8000);
        }
      };
      searchRes();
    };

    const handleChangeSearch = (query) => {
      setSearchQuery(query);
    };

    return (
      // <View>
      <Searchbar
        placeholder="Search"
        onChangeText={handleChangeSearch}
        value={searchQuery}
        onSubmitEditing={handleSearch}
        onIconPress={handleSearch}
        style={{ width: "140%" }}
      />
      // </View>
    );
  };

  const SearchBarMain = () => {
    [searchQueryM, setSearchQueryM] = useState("Sample");
    [searchClickedM, setSearchClickedM] = useState(false);
    const handleSearch = () => {
      // Perform search logic using the searchQuery state
      setSearchClickedM(true);
      setHome(0);
      setSearchPage(0);
      setLoading(1);
      const searchRes = () => {
        if ((searchQueryM != "") | (searchQueryM.replaceAll(" ") != "")) {
          fetch(`http://searchai-7lx6.onrender.com/api.search?${searchQueryM}`)
            .then((response) => response.json())
            .then((data) => {
              try {
                data = JSON.parse(data);
                setRelSer(data.related_search_on_google);
                setTitle(data.title);
                setText(data.text);
                setLink(data.link);
                setLoading(0);
                setSearchPage(1);
                setSearchIndex(0);
              } catch (error) {
                setSearchIndex(0);
              }
            });
          setTimeout(() => {
            if (searchIndex != 1) {
            } else {
              searchRes();
            }
          }, 8000);
        }
      };

      try {
        searchRes();
      } catch (error) {
        try {
          searchRes();
        } catch (error) {
          searchRes();
        }
      }
    };

    const handleChangeSearch = (query) => {
      setSearchQueryM(query);
    };

    return (
      <View>
        <Searchbar
          placeholder="Search"
          onChangeText={handleChangeSearch}
          value={searchQueryM}
          onSubmitEditing={handleSearch}
          onIconPress={handleSearch}
          style={{ width: "140%" }}
        />
      </View>
    );
  };

  const SearchPage = () => (
    <View
      style={{
        backgroundColor: "#2DD4BF",
        borderRadius: 8,
        width: "80%",
        height: "80%",
        padding: 10,
        display: "flex",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "#17c0eb",
            borderRadius: 4,
            width: 4,
            height: 4,
            marginRight: 6,
          }}
        ></View>
        <View
          style={{
            backgroundColor: "#17c0eb",
            borderRadius: 4,
            width: 4,
            height: 4,
            marginRight: 6,
          }}
        ></View>
        <View
          style={{
            backgroundColor: "#17c0eb",
            borderRadius: 4,
            width: 4,
            height: 4,
            marginRight: 6,
          }}
        ></View>
        <TouchableOpacity
          style={{
            backgroundColor: "#17c0eb",
            borderRadius: 4,
            paddingHorizontal: 10,
            paddingVertical: 6,
            marginRight: 6,
          }}
          onPress={() => {
            backHandle();
          }}
        >
          <Text style={{ color: "#212529", fontWeight: "bold" }}>Back</Text>
        </TouchableOpacity>

        {/* Search Input */}
        <View style={{ display: "flex", margin: 2 }}>
          <SearchBarMain />
        </View>
      </View>
      <ScrollView
        style={{
          width: "100%",
          height: "86%",
          marginTop: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Image
            source={require("./src/logo.png")}
            style={{ width: 40, height: 40, marginRight: 10 }}
          />
          <Text style={{ color: "#204B56", fontSize: 24, fontWeight: "bold" }}>
            SearchAI
          </Text>
        </View>
        <Text
          style={{
            color: "#204B56",
            fontSize: 24,
            fontWeight: "bold",
            marginLeft: "10%",
            width: "80%",
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: "#204B56",
            fontSize: 18,
            fontWeight: "bold",
            marginLeft: "10%",
            width: "80%",
          }}
        >
          {text}
        </Text>
        <OpenURLButton url={link}></OpenURLButton>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            marginTop: 10,
          }}
        >
          <Image
            source={require("./src/search-svgrepo-com.png")}
            style={{ width: 40, height: 40, marginRight: 10 }}
          />
          <Text style={{ color: "#204B56", fontSize: 24, fontWeight: "bold" }}>
            Releated Google Search
          </Text>
        </View>
        {(relSer[0] != null) | (relSer[0] != undefined) ? (
          <OpenURLSearch url={"https://google.com/search?q=" + relSer[0]}>
            {relSer[0]}
          </OpenURLSearch>
        ) : null}
        {(relSer[1] != null) | (relSer[1] != undefined) ? (
          <OpenURLSearch url={"https://google.com/search?q=" + relSer[1]}>
            {relSer[1]}
          </OpenURLSearch>
        ) : null}
        {(relSer[2] != null) | (relSer[2] != undefined) ? (
          <OpenURLSearch url={"https://google.com/search?q=" + relSer[2]}>
            {relSer[2]}
          </OpenURLSearch>
        ) : null}
        {(relSer[3] != null) | (relSer[3] != undefined) ? (
          <OpenURLSearch url={"https://google.com/search?q=" + relSer[3]}>
            {relSer[3]}
          </OpenURLSearch>
        ) : null}
        {(relSer[4] != null) | (relSer[4] != undefined) ? (
          <OpenURLSearch url={"https://google.com/search?q=" + relSer[4]}>
            {relSer[4]}
          </OpenURLSearch>
        ) : null}
        {(relSer[5] != null) | (relSer[5] != undefined) ? (
          <OpenURLSearch url={"https://google.com/search?q=" + relSer[5]}>
            {relSer[5]}
          </OpenURLSearch>
        ) : null}
      </ScrollView>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#212529", paddingTop: 15 }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        onPress={() => {
          backHandle();
        }}
      >
        <Image
          source={require("./src/logo.png")}
          onPress={() => {
            backHandle();
          }}
          style={{ width: 40, height: 40, marginRight: 10 }}
        />
        <Text
          style={{ color: "white", fontSize: 24, fontWeight: "bold" }}
          onPress={() => {
            backHandle();
          }}
        >
          <Text style={{ color: "#17c0eb" }}>S</Text>earch
          <Text style={{ color: "#f56565" }}>AI</Text>
        </Text>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        {/* Home View */}

        {home == 1 ? <Home /> : null}

        {/* Loading View */}
        {loading == 1 ? <Loading /> : null}

        {/* Search View */}
        {searchPage == 1 ? <SearchPage /> : null}

        {/* </View> */}
      </View>
    </View>
  );
};

export default App;
