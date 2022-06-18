import { createAlchemyWeb3 } from "@alch/alchemy-web3";

import {MAINNET_API_KEY, POLYGON_API_KEY, MAINNET_URL, POLYGON_URL} from "../helpers/constants";

const web3Mainnet = createAlchemyWeb3(
    `${MAINNET_URL}${MAINNET_API_KEY}`,
);

const web3Ploygon = createAlchemyWeb3(
    `${POLYGON_URL}${POLYGON_API_KEY}`,
);

exports.health_check = async (req, res, next) => {

    res.status(200).json({
        status: 'success',
        payload: [],
        message: 'Success'
    });
};

exports.fetch_nfts = async (req, res, next) => {
    try {
        let { address } = req.params;

        const mainnetNft = await web3Mainnet.alchemy.getNfts({
            owner: address
        })
    
        const polygonNft = await web3Ploygon.alchemy.getNfts({
            owner: address
        })
    
        let nftData = {};
        nftData.mainnetJson = !!mainnetNft ? mainnetNft.ownedNfts : [];
        nftData.polygonJson = !!polygonNft ? polygonNft.ownedNfts : [];
    
        res.status(200).json({
            status: 'success',
            payload: nftData,
            message: 'nft fatched successfully'
        });

    } catch (error) {
        console.log("Error at fetching nfts using alchemy- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: null,
            message: 'Error while fetching nfts'
        });
    }
};
