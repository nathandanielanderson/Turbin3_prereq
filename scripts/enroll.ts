import { Connection, Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor";
import { IDL, Turbin3Prereq } from "../programs/Turbin3_prereq";
import wallet from "../Turbin3-wallet.json";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Import keypair from wallet
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Create a Solana devnet connection
const connection = new Connection(process.env.HELIUS_RPC_URL || '');

// Github account
const github = Buffer.from("nathandanielanderson", "utf8");

// Create our anchor provider
const provider = new AnchorProvider(connection, new Wallet(keypair), { commitment: "confirmed" });

// Create our program
const program: Program<Turbin3Prereq> = new Program(IDL, provider);

//Create the PDA (Program Derived Address) for our enrollment account
const enrollment_seeds = [Buffer.from("prereq"), keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(enrollment_seeds, program.programId);

// Execute our enrollment transaction
(async () => {
    try {
        // 
        const txhash = await program.methods
            .complete(github)               // Calling the "complete" instruction in the program's IDL, passing the github argument (in bytes).
            .accounts({                     // Mapping the accounts required by the "complete" instruction
                signer: keypair.publicKey,
            })
            .signers([keypair])
            .rpc();
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();