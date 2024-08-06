<template>
    <div id="app">
        <ConnectWallet @wallet-connected="walletConnected" />
        <div v-if="provider && signer && address">
            <NFTGallery ref="galleryRef" :provider="provider" :signer="signer" :address="address" />
            <MintNFT :provider="provider" :signer="signer" :address="address" @nft-minted="nftMinted" />
            <TransferNFT ref="transferRef" :provider="provider" :signer="signer" @nft-minted="fetchNFTs" />
        </div>
    </div>
</template>

<script>
import { shallowRef, ref } from 'vue';
import ConnectWallet from './components/ConnectWallet.vue';
import NFTGallery from './components/NFTGallary.vue';
import MintNFT from './components/MintNFT.vue';
import TransferNFT from './components/TransferNFT.vue';

export default {
    name: 'App',
    components: {
        ConnectWallet,
        NFTGallery,
        MintNFT,
        TransferNFT,
    },
    setup() {
        const provider = shallowRef(null);
        const signer = shallowRef(null);
        const address = shallowRef('');
        const galleryRef = ref(null);
        const transferRef = ref(null);

        const fetchNFTs = async () => {
            if (provider.value && signer.value && address.value) {
                const galleryComponent = galleryRef.value;
                if (galleryComponent) {
                    galleryComponent.fetchNFTs();
                }
            }
        };

        const nftMinted = () => {
            if (provider.value && signer.value && address.value && transferRef.value) {
                transferRef.value.fetchTokenIds(signer.value);
            }
            fetchNFTs();
        };

        const walletConnected = (newProvider, newSigner, newAddress) => {
            provider.value = newProvider;
            signer.value = newSigner;
            address.value = newAddress;
            fetchNFTs();
        };

        return {
            provider,
            signer,
            address,
            walletConnected,
            fetchNFTs,
            galleryRef,
            transferRef,
            nftMinted
        };
    },
};
</script>
