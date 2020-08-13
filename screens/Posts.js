import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import ListItem from "../components/ListItem";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  list: {
    alignSelf: "stretch",
  },
});

export default ({ navigation }) => {
  const userId = navigation.getParam("user_id");
  const userName = navigation.getParam("name");
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  console.log(posts);

  const fetchPosts = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={posts.filter((post) => post.userId === userId)}
          keyExtractor={(x) => String(x.id)}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              onPress={() =>
                navigation.navigate("Detail", {
                  title: item.title,
                  body: item.body,
                  name: userName,
                })
              }
            />
          )}
        ></FlatList>
      )}
    </View>
  );
};
