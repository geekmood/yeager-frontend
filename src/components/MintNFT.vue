<template>
    <div>
        <h2>Mint New NFT</h2>
        <input v-model="metadata.name" placeholder="Name" />
        
        <input v-model="metadata.description" placeholder="Description" />
        <input type="file" @change="onFileChange" />
        <button @click="handleMintNFT" :disabled="isLoading">
            {{ isLoading ? 'Minting...' : 'Mint NFT' }}
        </button>
    </div>
</template>

<script>
import axios from 'axios';
import { mintNFT } from '@/services/nftService';
import { BACKEND_URL } from '@/utils/constants';

export default {
    props: ['provider', 'signer', 'address'],
    data() {
        return {
            isLoading: false,
            metadata: {
                name: '',
                description: '',
                image: '',
            },
            selectedFile: null,
        };
    },
    methods: {
        onFileChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                this.selectedFile = {
                    filename: file.name,
                    content: reader.result.split(',')[1],
                };
            };
            reader.readAsDataURL(file);
        },
        async uploadToPinata() {
            const formData = {
                file: this.selectedFile.content,
                filename: this.selectedFile.filename,
            };

            try {
                const response = await axios.post(`${BACKEND_URL}/uploadFile`, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
            } catch (error) {
                console.error('Error uploading file to Pinata:', error);
                throw error;
            }
        },
        async handleMintNFT() {
            this.isLoading = true;
            try {
                const imageURI = await this.uploadToPinata();

                const nftMetadata = {
                    ...this.metadata,
                    image: imageURI,
                };

                const response = await axios.post(`${BACKEND_URL}/uploadMetadata`, nftMetadata);
                const tokenURI = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

                await mintNFT(this.signer, tokenURI);

                alert('NFT minted successfully!');
                this.metadata = { name: '', description: '', image: '' };
                this.selectedFile = null;
                console.log("this", this.isLoading)
                this.$emit('nft-minted');
            } catch (error) {
                console.error('Error minting NFT:', error);
                alert("Error minting NFT");
            } finally {
                this.isLoading = false;
            }
        },
    },
};
</script>
