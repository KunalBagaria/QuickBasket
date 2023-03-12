import { ActivityIndicator } from "react-native";

function Loading({
  style
}: {
  style?: any;
}) {
  return <ActivityIndicator style={style} color="#FAAF40" size={99} />;
}

export { Loading };