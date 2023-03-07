import { View, StyleSheet } from "react-native";
import { Post, Profile } from "@gumhq/react-native-components";
import { Text } from "native-base";

function TestPage() {
  const profile = {
    name: "Kunal Bagaria",
    username: "kunalbagaria",
    bio: "Software Engineer @ Gum",
    avatar: "https://i.imgur.com/uGv5Zca.jpg",
    followers: 800,
    following: 709
  }
  const postOne = {
    type: "text",
    content: {
      format: "markdown",
      content: "just setting up my gum profile."
    }
  }
  const postTwo = {
    type: "text",
    content: {
      format: "markdown",
      content: "wow, this does work well."
    }
  }
  const postThree = {
    type: "text",
    content: {
      format: "markdown",
      content: "chew more gum!"
    }
  }
  const postFour = {
    type: "text",
    content: {
      format: "markdown",
      content: "namaste"
    }
  }


  return (
    <View style={styles.container}>
      <Profile data={profile} />
      <Post data={postFour} profile={profile} />
      <Post data={postOne} profile={profile} />
      <Post data={postTwo} profile={profile} />
      {/* <Post data={postThree} profile={profile} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 14
  }
});

export { TestPage };