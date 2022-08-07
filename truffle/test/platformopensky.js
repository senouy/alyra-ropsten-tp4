const PlatformOpenSky = artifacts.require("PlatformOpenSky");

const { BN, expectRevert, expectEvent } = require("@openzeppelin/test-helpers");

const { expect } = require("chai");

contract("PlatformOpenSky", (accounts) => {
  const contract_owner = accounts[0];
  const creator = accounts[1];
  const nft_owner = accounts[2];
  const visitor = accounts[3];

  let platformOpenSkyInstance;

  let collectionName = "BestCollection";
  let collectionSymbol = "BC";
  let collectionCID = "CID to modify";
  let collectionPrice = new BN(1);

  describe("Collection", function () {
    beforeEach(async function () {
      //create a new contract instance
      platformOpenSkyInstance = await PlatformOpenSky.new({
        from: contract_owner,
      });
    });

    it("should create a collection named BestCollection", async () => {
      //add a collection
      await platformOpenSkyInstance.createCollection(
        collectionName,
        collectionSymbol,
        collectionCID,
        collectionPrice,
        { from: creator }
      );

      const collectionData = await platformOpenSkyInstance.getCollectionById(
        0,
        { from: creator }
      );

      expect(collectionData.name).to.equal(collectionName);
    });

    it("should create a collection with a price set to 1 ETH", async () => {
      let collectionName = "BestCollection";
      //add a collection
      await platformOpenSkyInstance.createCollection(
        collectionName,
        collectionSymbol,
        collectionCID,
        collectionPrice,
        { from: creator }
      );

      const collectionData = await platformOpenSkyInstance.getCollectionById(
        0,
        { from: creator }
      );

      expect(collectionData.nftPrice).to.be.bignumber.equal(collectionPrice);
    });
  });

  describe("NFT", function () {
    beforeEach(async function () {
      //create a new contract instance
      platformOpenSkyInstance = await PlatformOpenSky.new({
        from: contract_owner,
      });
      //add a collection
      await platformOpenSkyInstance.createCollection(
        collectionName,
        collectionSymbol,
        collectionCID,
        collectionPrice,
        { from: creator }
      );
    });

    it("should get NFT metadata", async () => {
      const NFTData = await platformOpenSkyInstance.getCollectionItem(0, 1, {
        from: visitor,
      });
    });

    it("should mint NFT", async () => {
      await platformOpenSkyInstance.mintCollectionItem(0, 1, {
        from: nft_owner,
        value: collectionPrice,
      });
      const NFTData = await platformOpenSkyInstance.isNFTMinted(0, 1, {
        from: visitor,
      });

      expect(NFTData).to.be.true;
    });

    it("should attribute NFT to minter after mint NFT", async () => {
      await platformOpenSkyInstance.mintCollectionItem(0, 1, {
        from: nft_owner,
        value: collectionPrice,
      });
      const NFTOwner = await platformOpenSkyInstance.getNFTOwner(0, 1, {
        from: visitor,
      });

      expect(nft_owner).to.equal(NFTOwner);
    });
  });
});
