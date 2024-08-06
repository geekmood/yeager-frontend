<template>
  <div id="app">
      <ConnectWallet @wallet-connected="walletConnected" />
      <div v-if="provider && signer && address">
          <NFTGallery ref="gallery" :provider="provider" :signer="signer" :address="address" />
          <MintNFT :provider="provider" :signer="signer" :address="address" @nft-minted="fetchNFTs" />
          <TransferNFT :provider="provider" :signer="signer" />
      </div>
  </div>
</template>

<script>
import { shallowRef, ref, onMounted } from 'vue';
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

      const fetchNFTs = async () => {
          if (provider.value && signer.value && address.value) {
              const galleryComponent = galleryRef.value;
              if (galleryComponent) {
                  galleryComponent.fetchNFTs();
              }
          }
      };

      const walletConnected = (newProvider, newSigner, newAddress) => {
          provider.value = newProvider;
          signer.value = newSigner;
          address.value = newAddress;
          fetchNFTs();
      };

      onMounted(() => {
          fetchNFTs();
      });

      return {
          provider,
          signer,
          address,
          walletConnected,
          fetchNFTs,
          galleryRef,
      };
  },
};
</script>
