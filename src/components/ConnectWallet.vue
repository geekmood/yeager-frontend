<template>
    <div>
        <button @click="connectWallet" :disabled="isLoading">
            {{ isLoading ? 'Connecting...' : 'Connect Wallet' }}
        </button>
    </div>
</template>

<script>
import { ethers } from 'ethers';

export default {
    name: 'ConnectWallet',
    data() {
        return {
            isLoading: false
        }
    },
    methods: {
        async connectWallet() {
            if (window.ethereum) {
                this.isLoading = true;
                try {
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    await provider.send('eth_requestAccounts', []);
                    const signer = provider.getSigner();
                    const address = await signer.getAddress();
                    this.$emit('wallet-connected', provider, signer, address);
                } catch (error) {
                    console.error('Error connecting wallet:', error);
                }finally {
                    this.isLoading = false;
                }
            } else {
                alert('Please install MetaMask!');
            }
        },
    },
};
</script>
