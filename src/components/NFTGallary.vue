<template>
  <div class="gallery">
    <h2>Your NFTs</h2>
    <div v-if="!isLoading">
      <div v-if="nfts.length" class="nft-list">
        <div v-for="(nft, index) in nfts" :key="index" class="nft-card">
          <img :src="nft.image" alt="NFT Image" class="nft-image" />
          <div class="nft-details">
            <p class="nft-name">{{ nft.name }}</p>
            <p class="nft-description">{{ nft.description }}</p>
            <p class="nft-description">Token ID: {{ nft.tokenId }}</p>
          </div>
        </div>
      </div>
      <p v-else>No NFTs found</p>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { getNFTs } from '@/services/nftService';

export default {
  props: ['provider', 'signer', 'address'],
  data() {
    return {
      nfts: [],
      isLoading: false,
    };
  },
  methods: {
    async fetchNFTs() {
      this.isLoading = true;
      try {
        const fetchedNFTs = await getNFTs(this.signer, this.address);
        this.nfts = fetchedNFTs;
      } catch (error) {
        alert("Error fetching NFTs");
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.fetchNFTs();
  },
  watch: {
    address(newAddress, oldAddress) {
      if (newAddress !== oldAddress) {
        this.fetchNFTs();
      }
    },
  },
};
</script>

<style scoped>
.gallery {
  padding: 20px;
}

.nft-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.nft-card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 200px;
  text-align: center;
}

.nft-image {
  width: 100%;
  height: 20rem;
  object-fit: contain;
  display: block;
}

.nft-details {
  padding: 10px;
}

.nft-name {
  font-weight: bold;
  font-size: 1.2em;
  margin: 5px 0;
}

.nft-description {
  color: #555;
  font-size: 0.9em;
}
</style>
