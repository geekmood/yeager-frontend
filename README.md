# NFT Minting Platform - Frontend

This is the frontend repository for the NFT Minting Platform built using Vue.js.

## Features

- Connect wallet using Web3
- Mint new NFTs
- View NFT gallery
- Transfer NFTs

## Installation


### Prerequisites

- Node.js (v20 recommended)
- npm or yarn

### Clone the Repository

```bash
git clone https://github.com/your-username/nft-minting-frontend.git
cd nft-minting-frontend
```
Note: Clone the .env.example as .env and add your variables

### Install Dependencies
#### Using yarn:
```
yarn install
```

### Usage
#### Running the Development Server

```
yarn serve
```

## Project Structure
```
nft-minting-frontend/
├── public/                     
├── src/
│   ├── assets/                 
│   ├── components/             
│   │   ├── ConnectWallet.vue   
│   │   ├── NFTGallery.vue      
│   │   ├── MintNFT.vue         
│   │   └── TransferNFT.vue     
│   ├── services/               
│   │   └── nftService.js       
│   ├── utils/                  
│   │   └── constants.js        
│   ├── App.vue                 
│   ├── main.js                 
│   └── .env.example              
├── .gitignore                  
├── babel.config.js             
├── package.json                
└── vue.config.js   
```            

## Components
ConnectWallet: Allows users to connect their wallet.
NFTGallery: Displays NFTs owned by the connected wallet.
MintNFT: Form for minting new NFTs.
TransferNFT: Allows users to transfer NFTs to another wallet.