import sdk from './initialize-sdk.js';
import { AddressZero } from '@ethersproject/constants';

(async () => {
    try {
        const tokenAddress = await sdk.deployer.deployToken({
            name: "Code Governence Token",
            description: "Token for Code Governence",
            primary_sale_recipient: AddressZero,
        });

        console.log(`✅👍Token deployed successfully at the address: ${tokenAddress}`);
    } catch (error) {
        console.error("Could not deploy the ERC token", error);
    }


})();