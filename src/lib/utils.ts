import { PublicKey } from "@solana/web3.js";

export function getTrimmedPublicKey(pkey: PublicKey) {
  const str = pkey.toString();
  return str.slice(0, 4) + '....' + str.slice(-4);
}