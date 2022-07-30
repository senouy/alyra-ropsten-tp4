const PlatformOpenSky = artifacts.require("PlatformOpenSky");

module.exports = function (deployer) {
  deployer.deploy(PlatformOpenSky);
};