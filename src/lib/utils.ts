import { PublicKey } from "@solana/web3.js";
import { ToastAndroid } from "react-native";

export function getTrimmedPublicKey(pkey: PublicKey) {
  const str = pkey.toString();
  return str.slice(0, 4) + '....' + str.slice(-4);
}

export const showToast = (msg: string) => {
  ToastAndroid.showWithGravity(
    msg,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,
  );
};