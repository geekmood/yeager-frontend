<template>
    <div>
        <h2>Transfer NFT</h2>
        <input v-model="recipient" placeholder="Recipient Address" />
        <select v-model="selectedTokenId">
            <option disabled value="">Select token ID</option>
            <option v-for="val in tokenIds" :key="val" :value="val">
                {{ val }}
            </option>
        </select>
        <button @click="transferNFT" :disabled="isLoading">
            {{ isLoading ? 'Transferring...' : 'Transfer NFT' }}
        </button>
    </div>
</template>

<script>
import { ethers } from "ethers";

import { transferNFT } from '@/services/nftService';
import { CONTRACT_ADDRESS, ABI } from '@/utils/constants';

export default {
    props: ['provider', 'signer'],
    data() {
        return {
            recipient: '',
            selectedTokenId: '',
            contract: null,
            tokenIds: 0,
            isLoading: false
        };
    },
    mounted() {
        if (this.provider && this.signer) {
            this.contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, this.signer);
            this.fetchTokenIds(this.signer);
        }
    },
    methods: {
        async fetchTokenIds(signer) {
            const balance = await this.contract.balanceOf(await signer.getAddress());
            const tokenIds = []

            try {
                for (let i = 0; i < balance.toNumber(); i++) {
                    const tokenOwner = await this.contract.ownerOf(i);
                    if (tokenOwner === await signer.getAddress()) {
                        tokenIds.push(i);
                    }
                }
            } catch (error) {
                console.log("Error", error)
            }

            this.tokenIds = tokenIds
        },
        async transferNFT() {
            this.isLoading = true;
            try {
                if (this.selectedTokenId !== '' && this.recipient) {
                    await transferNFT(this.signer, this.recipient, this.selectedTokenId);

                    alert('NFT transferred successfully!');
                    this.recipient = '';
                    this.selectedTokenId = '';
                    this.$emit('nft-minted');
                } else {
                    alert('Recipient and Token ID is mandatory to transfer');
                }
            } catch (error) {
                console.error("Error transferring NFT:", error);
            } finally {
                this.isLoading = false;
            }
        },
    },
};
</script>
