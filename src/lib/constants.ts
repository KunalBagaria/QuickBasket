import { PublicKey } from "@solana/web3.js";
export const RPC_URL = 'https://solana-mainnet.g.alchemy.com/v2/22rQ_17IgqNqjh6L3zozhPBksczluake';
export const API_URL = 'https://api.quickbasket.app';

export interface Token {
  mintAdress: PublicKey;
  decimals: number;
}

export const USDC_TOKEN: Token = {
  mintAdress: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
  decimals: 6
}