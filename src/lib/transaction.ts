import {RPC_URL, Token} from './constants';
import {Connection, LAMPORTS_PER_SOL, PublicKey, Transaction, SystemProgram} from '@solana/web3.js';
import {
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
} from '@solana/spl-token';
import { Buffer } from 'buffer';

global.Buffer = Buffer;

async function getTransferTokenTransaction(
  amount: number,
  fromAddress: PublicKey,
  toAddress: PublicKey,
  mint: Token,
) {
  const connection = new Connection(RPC_URL, {
    commitment: 'processed',
  });
  const senderAccountAddress = getAssociatedTokenAddressSync(
    mint.mintAdress,
    fromAddress,
  );
  const senderAccount = await connection.getAccountInfo(senderAccountAddress);

  if (senderAccount === null) {
    console.log('Sender account does not exist');
    return null;
  }

  const receiverAccountAddress = getAssociatedTokenAddressSync(
    mint.mintAdress,
    toAddress,
  );
  const receiverAccount = await connection.getAccountInfo(
    receiverAccountAddress,
  );

  const transaction = new Transaction();

  if (receiverAccount === null) {
    console.log('Receiver account does not exist');
    transaction.add(
      createAssociatedTokenAccountInstruction(
        toAddress,
        receiverAccountAddress,
        toAddress,
        mint.mintAdress,
      ),
    );
  }

  transaction.add(
    createTransferInstruction(
      senderAccountAddress,
      receiverAccountAddress,
      fromAddress,
      Number(amount) * 10 ** mint.decimals,
    ),
  );

  const {blockhash} = await connection.getLatestBlockhash('finalized');
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = fromAddress;

  return transaction;
}

function getConnection() {
  const connection = new Connection(RPC_URL, {
    commitment: 'processed',
  });
  return connection;
}

async function getTransferSOLTransaction (
  amount: number,
  fromAddress: PublicKey,
  toAddress: PublicKey,
) {
  const connection = new Connection(RPC_URL, {
    commitment: 'processed',
  });
  const transaction = new Transaction();
  transaction.add(
    SystemProgram.transfer({
      fromPubkey: fromAddress,
      toPubkey: toAddress,
      lamports: amount * LAMPORTS_PER_SOL,
    })
  );
  const {blockhash} = await connection.getLatestBlockhash('finalized');
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = fromAddress;
  return transaction;
}

export {getTransferTokenTransaction, getTransferSOLTransaction, getConnection};
