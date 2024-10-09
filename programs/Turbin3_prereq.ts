
export type Turbin3Prereq = {
    version: string;
    name: string;
    instructions: Array<{
        name: string;
        accounts: Array<{
            name: string;
            writable: boolean;
            signer: boolean;
        } | {
            name: string;
            address: string;
        }>;
        args: Array<{
            name: string;
            type: string;
        }>;
    }>;
};
export const IDL: Turbin3Prereq = {
    version: "0.1.0",
    name: "Turbin3_prereq",
    instructions: [
        {
            name: "complete",
            accounts: [
                {
                    name: "signer",  // Public key of the user signing the transaction
                    writable: true,
                    signer: true,
                },
                {
                    name: "prereq",  // PDA account created by the program
                    writable: true,
                    signer: false,
                },
                {
                    name: "system_program",  // Solana system program
                    address: "11111111111111111111111111111111",
                },
            ],
            args: [
                {
                    name: "github",  // GitHub account in bytes
                    type: "bytes",
                },
            ],
        },
    ],
};