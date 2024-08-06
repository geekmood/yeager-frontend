// src/services/nftService.js
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, ABI } from '@/utils/constants';

const getContract = (signer) => {
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
};

export const getNFTs = async (signer, address) => {
    const contract = getContract(signer);
    const balance = await contract.balanceOf(address);
    const nfts = [];

    for (let i = 0; i < balance.toNumber(); i++) {
      const tokenURI = await contract.tokenURI(i);

      if (tokenURI.startsWith("ipfs://")) {
        continue;
      }
      const res = await fetch(tokenURI);
      const json = await res.json();
      nfts.push(json);
    }

    return nfts;
};

export const mintNFT = async (signer, uri) => {
    const contract = getContract(signer);
    const tx = await contract.safeMint(await signer.getAddress(), uri);
    await tx.wait();
};

export const transferNFT = async (signer, recipient, tokenId) => {
  const contract = getContract(signer);
  const tx = await contract.transferFrom(await signer.getAddress(), recipient, tokenId);
  await tx.wait();
};
