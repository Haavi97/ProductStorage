# Product Storage smart contract
> Smart contract for storing products' information on chain

## Compile

```sh
yarn compile
```

## Deploy

The first 2 right now deploy on Sparta chain:

```sh
yarn deploy
```
```sh
yarn deploy-sparta
```
To deploy on Polygon testnet:
```sh
yarn deploy-mumbai
```

## Tests
```sh
yarn test
```

## Flatten (for verification)
This command will add the flatten contracts to the ```/flat``` folder. Just need to remove the dublicated license comments. In the verification is need to select optimization. 
```sh
yarn flat
```
