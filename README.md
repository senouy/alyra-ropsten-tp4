# TP4 - OpenSky

## _Concurrent de OpenSea_

[![N|Solid](https://alyra.fr/wp-content/uploads/2019/06/logo-titre-alyra-bleu-transparent-64px_v3.png)](https://github.com/senouy/alyra-ropsten-tp4)

## Démo de la Dapp

https://www.loom.com/share/

## Dapp déployée sur le cloud

Le front est déployé sur github à l'adresse : https://senouy.github.io/alyra-ropsten-tp4

Le back est déployé sur le réseau ropsten via la commande :

```sh
truffle migrate --network ropsten
```

## Installation

Cloner le projet depuis le repository public https://github.com/senouy/alyra-ropsten-tp4

### Installation React

Installer et lancer le projet react en local

```sh
cd alyra-ropsten-tp4/clients
npm install
npm run start
```

### Installation Truffle

Lancer ganache depuis un autre terminal

```sh
ganache
```

Déployer le smart contract en local

```sh
cd ../truflle
truffle migrate
```

## Couverture de test

### 1. Tests sur les collections

- Scénarios testés
  - Création d'une collection et vérification que les infos saisies sont bien celles enregistrées dans la blockchain

### 2. Tests sur les NFT

- Scénarios testés
  - Récupération des metadatas d'un NFT
  - Mint d'un NFT
  - Vérification qu'un NFT minté appartient bien au minter
