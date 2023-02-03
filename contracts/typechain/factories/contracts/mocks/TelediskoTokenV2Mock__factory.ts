/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides, Signer, utils } from "ethers";

import type { PromiseOrValue } from "../../../common";
import type {
  TelediskoTokenV2Mock,
  TelediskoTokenV2MockInterface,
} from "../../../contracts/mocks/TelediskoTokenV2Mock";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "Snapshot",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "VestingSet",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "snapshotId",
        type: "uint256",
      },
    ],
    name: "balanceOfAt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentSnapshotId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mintVesting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract InternalMarket",
        name: "internalMarket",
        type: "address",
      },
    ],
    name: "setInternalMarket",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IShareholderRegistry",
        name: "shareholderRegistry",
        type: "address",
      },
    ],
    name: "setShareholderRegistry",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "setVesting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IVoting",
        name: "voting",
        type: "address",
      },
    ],
    name: "setVoting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "snapshot",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "snapshotId",
        type: "uint256",
      },
    ],
    name: "totalSupplyAt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "vestingBalanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b50600054610100900460ff1615808015620000335750600054600160ff909116105b8062000063575062000050306200013d60201b62000a421760201c565b15801562000063575060005460ff166001145b620000cb5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840160405180910390fd5b6000805460ff191660011790558015620000ef576000805461ff0019166101001790555b801562000136576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b506200014c565b6001600160a01b03163b151590565b611e0e806200015c6000396000f3fe608060405234801561001057600080fd5b50600436106101e55760003560e01c80635439ad861161010f578063a217fddf116100a2578063c4d0795111610071578063c4d079511461040f578063d547741f14610422578063dd62ed3e14610435578063fea76b2a1461044857600080fd5b8063a217fddf146103ce578063a260b102146103d6578063a457c2d7146103e9578063a9059cbb146103fc57600080fd5b806396c9ee62116100de57806396c9ee621461038d5780639711715a146103a0578063981b24d0146103a85780639dc29fac146103bb57600080fd5b80635439ad861461034157806370a082311461034957806391d148541461037257806395d89b411461038557600080fd5b8063313ce5671161018757806340c10f191161015657806340c10f19146102f557806344292600146103085780634cd88b761461031b5780634ee2cd7e1461032e57600080fd5b8063313ce5671461029757806336568abe146102a657806336ca0365146102b957806339509351146102e257600080fd5b806318160ddd116101c357806318160ddd1461023a57806323b872dd1461024c578063248a9ca31461025f5780632f2ff15d1461028257600080fd5b806301ffc9a7146101ea57806306fdde0314610212578063095ea7b314610227575b600080fd5b6101fd6101f8366004611837565b61045b565b60405190151581526020015b60405180910390f35b61021a610492565b604051610209919061188d565b6101fd6102353660046118d5565b610524565b6035545b604051908152602001610209565b6101fd61025a366004611901565b61053c565b61023e61026d366004611942565b6000908152609f602052604090206001015490565b61029561029036600461195b565b610560565b005b60405160128152602001610209565b6102956102b436600461195b565b61058a565b61023e6102c736600461198b565b6001600160a01b031660009081526068602052604090205490565b6101fd6102f03660046118d5565b61060d565b6102956103033660046118d5565b61062f565b6102956103163660046118d5565b610651565b610295610329366004611a4b565b610673565b61023e61033c3660046118d5565b61079a565b60695461023e565b61023e61035736600461198b565b6001600160a01b031660009081526033602052604090205490565b6101fd61038036600461195b565b6107f3565b61021a61081e565b61029561039b3660046118d5565b61082d565b61023e61084f565b61023e6103b6366004611942565b610877565b6102956103c93660046118d5565b6108a2565b61023e600081565b6102956103e436600461198b565b6108c4565b6101fd6103f73660046118d5565b6108fb565b6101fd61040a3660046118d5565b610976565b61029561041d36600461198b565b610984565b61029561043036600461195b565b6109bb565b61023e610443366004611aaf565b6109e0565b61029561045636600461198b565b610a0b565b60006001600160e01b03198216637965db0b60e01b148061048c57506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060603680546104a190611add565b80601f01602080910402602001604051908101604052809291908181526020018280546104cd90611add565b801561051a5780601f106104ef5761010080835404028352916020019161051a565b820191906000526020600020905b8154815290600101906020018083116104fd57829003601f168201915b5050505050905090565b600033610532818585610a51565b5060019392505050565b60003361054a858285610b75565b610555858585610bef565b506001949350505050565b6000828152609f602052604090206001015461057b81610dab565b6105858383610db8565b505050565b6001600160a01b03811633146105ff5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b6106098282610e3e565b5050565b60003361053281858561062083836109e0565b61062a9190611b2d565b610a51565b600080516020611db983398151915261064781610dab565b6105858383610ea5565b600080516020611db983398151915261066981610dab565b6105858383610f7a565b600054610100900460ff16158080156106935750600054600160ff909116105b806106ad5750303b1580156106ad575060005460ff166001145b6107105760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016105f6565b6000805460ff191660011790558015610733576000805461ff0019166101001790555b61073d8383611008565b610745611012565b61075060003361103b565b8015610585576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a1505050565b6001600160a01b0382166000908152606a60205260408120819081906107c1908590611045565b91509150816107e8576001600160a01b0385166000908152603360205260409020546107ea565b805b95945050505050565b6000918252609f602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6060603780546104a190611add565b600080516020611d9983398151915261084581610dab565b6105858383611089565b6000600080516020611db983398151915261086981610dab565b610871611157565b91505090565b600080600061088784606b611045565b91509150816108985760355461089a565b805b949350505050565b600080516020611db98339815191526108ba81610dab565b610585838361119a565b600080516020611d998339815191526108dc81610dab565b606780546001600160a01b0319166001600160a01b0384161790555050565b6000338161090982866109e0565b9050838110156109695760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016105f6565b6105558286868403610a51565b600033610532818585610bef565b600080516020611d9983398151915261099c81610dab565b606580546001600160a01b0319166001600160a01b0384161790555050565b6000828152609f60205260409020600101546109d681610dab565b6105858383610e3e565b6001600160a01b03918216600090815260346020908152604080832093909416825291909152205490565b600080516020611d99833981519152610a2381610dab565b606680546001600160a01b0319166001600160a01b0384161790555050565b6001600160a01b03163b151590565b6001600160a01b038316610ab35760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016105f6565b6001600160a01b038216610b145760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016105f6565b6001600160a01b0383811660008181526034602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6000610b8184846109e0565b90506000198114610be95781811015610bdc5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016105f6565b610be98484848403610a51565b50505050565b6001600160a01b038316610c535760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016105f6565b6001600160a01b038216610cb55760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016105f6565b610cc08383836112e1565b6001600160a01b03831660009081526033602052604090205481811015610d385760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016105f6565b6001600160a01b0380851660008181526033602052604080822086860390559286168082529083902080548601905591517fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610d989086815260200190565b60405180910390a3610be9848484611329565b610db58133611422565b50565b610dc282826107f3565b610609576000828152609f602090815260408083206001600160a01b03851684529091529020805460ff19166001179055610dfa3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b610e4882826107f3565b15610609576000828152609f602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6001600160a01b038216610efb5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016105f6565b610f07600083836112e1565b8060356000828254610f199190611b2d565b90915550506001600160a01b0382166000818152603360209081526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a361060960008383611329565b6001600160a01b03821660009081526068602052604081208054839290610fa2908490611b2d565b90915550610fb290508282610ea5565b6001600160a01b038216600081815260686020908152604091829020548251938452908301527f90782417eb6da69d0b671119cc8e9c2063c7b0987ef1378141a54770a8c91fb391015b60405180910390a15050565b610609828261147b565b600054610100900460ff166110395760405162461bcd60e51b81526004016105f690611b45565b565b6106098282610db8565b6000808061105385856114ac565b909350905082156110815783600101818154811061107357611073611b90565b906000526020600020015491505b509250929050565b6001600160a01b03821660009081526068602052604090205481106111065760405162461bcd60e51b815260206004820152602d60248201527f54656c656469736b6f546f6b656e3a2076657374696e672063616e206f6e6c7960448201526c08189948191958dc99585cd959609a1b60648201526084016105f6565b6001600160a01b038216600081815260686020908152604091829020849055815192835282018390527f90782417eb6da69d0b671119cc8e9c2063c7b0987ef1378141a54770a8c91fb39101610ffc565b4260698190556040519081526000907f8030e83b04d87bef53480e26263266d6ca66863aa8506aca6f2559d18aa1cb679060200160405180910390a15060695490565b6001600160a01b0382166111fa5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016105f6565b611206826000836112e1565b6001600160a01b0382166000908152603360205260409020548181101561127a5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016105f6565b6001600160a01b03831660008181526033602090815260408083208686039055603580548790039055518581529192917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a361058583600084611329565b60405162461bcd60e51b815260206004820152601d60248201527f54656c656469736b6f546f6b656e56323a206e6f70657479206e6f706500000060448201526064016105f6565b606554604051636fb12c5f60e11b81526001600160a01b0385811660048301528481166024830152604482018490529091169063df6258be90606401600060405180830381600087803b15801561137f57600080fd5b505af1158015611393573d6000803e3d6000fd5b505050506001600160a01b03831660009081526068602090815260408083205460339092529091205410156105855760405162461bcd60e51b815260206004820152602f60248201527f54656c656469736b6f546f6b656e3a207472616e7366657220616d6f756e742060448201526e657863656564732076657374696e6760881b60648201526084016105f6565b61142c82826107f3565b610609576114398161157a565b61144483602061158c565b604051602001611455929190611ba6565b60408051601f198184030181529082905262461bcd60e51b82526105f69160040161188d565b600054610100900460ff166114a25760405162461bcd60e51b81526004016105f690611b45565b610609828261172f565b600080600084116114f85760405162461bcd60e51b81526020600482015260166024820152750536e617073686f747461626c653a20696420697320360541b60448201526064016105f6565b60695484111561154a5760405162461bcd60e51b815260206004820152601d60248201527f536e617073686f747461626c653a206e6f6e6578697374656e7420696400000060448201526064016105f6565b6000611556848661176f565b8454909150810361156c57600092509050611573565b6001925090505b9250929050565b606061048c6001600160a01b03831660145b6060600061159b836002611c1b565b6115a6906002611b2d565b67ffffffffffffffff8111156115be576115be6119a8565b6040519080825280601f01601f1916602001820160405280156115e8576020820181803683370190505b509050600360fc1b8160008151811061160357611603611b90565b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061163257611632611b90565b60200101906001600160f81b031916908160001a9053506000611656846002611c1b565b611661906001611b2d565b90505b60018111156116d9576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061169557611695611b90565b1a60f81b8282815181106116ab576116ab611b90565b60200101906001600160f81b031916908160001a90535060049490941c936116d281611c3a565b9050611664565b5083156117285760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016105f6565b9392505050565b600054610100900460ff166117565760405162461bcd60e51b81526004016105f690611b45565b60366117628382611c9f565b5060376105858282611c9f565b815460009081036117825750600061048c565b82546000905b808210156117cf57600061179c838361181c565b600087815260209020909150859082015411156117bb578091506117c9565b6117c6816001611b2d565b92505b50611788565b6000821180156117fb5750836117f8866117ea600186611d5f565b600091825260209091200190565b54145b156118145761180b600183611d5f565b9250505061048c565b50905061048c565b600061182b6002848418611d76565b61172890848416611b2d565b60006020828403121561184957600080fd5b81356001600160e01b03198116811461172857600080fd5b60005b8381101561187c578181015183820152602001611864565b83811115610be95750506000910152565b60208152600082518060208401526118ac816040850160208701611861565b601f01601f19169190910160400192915050565b6001600160a01b0381168114610db557600080fd5b600080604083850312156118e857600080fd5b82356118f3816118c0565b946020939093013593505050565b60008060006060848603121561191657600080fd5b8335611921816118c0565b92506020840135611931816118c0565b929592945050506040919091013590565b60006020828403121561195457600080fd5b5035919050565b6000806040838503121561196e57600080fd5b823591506020830135611980816118c0565b809150509250929050565b60006020828403121561199d57600080fd5b8135611728816118c0565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126119cf57600080fd5b813567ffffffffffffffff808211156119ea576119ea6119a8565b604051601f8301601f19908116603f01168101908282118183101715611a1257611a126119a8565b81604052838152866020858801011115611a2b57600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060408385031215611a5e57600080fd5b823567ffffffffffffffff80821115611a7657600080fd5b611a82868387016119be565b93506020850135915080821115611a9857600080fd5b50611aa5858286016119be565b9150509250929050565b60008060408385031215611ac257600080fd5b8235611acd816118c0565b91506020830135611980816118c0565b600181811c90821680611af157607f821691505b602082108103611b1157634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b60008219821115611b4057611b40611b17565b500190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351611bde816017850160208801611861565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351611c0f816028840160208801611861565b01602801949350505050565b6000816000190483118215151615611c3557611c35611b17565b500290565b600081611c4957611c49611b17565b506000190190565b601f82111561058557600081815260208120601f850160051c81016020861015611c785750805b601f850160051c820191505b81811015611c9757828155600101611c84565b505050505050565b815167ffffffffffffffff811115611cb957611cb96119a8565b611ccd81611cc78454611add565b84611c51565b602080601f831160018114611d025760008415611cea5750858301515b600019600386901b1c1916600185901b178555611c97565b600085815260208120601f198616915b82811015611d3157888601518255948401946001909101908401611d12565b5085821015611d4f5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b600082821015611d7157611d71611b17565b500390565b600082611d9357634e487b7160e01b600052601260045260246000fd5b50049056fe97667070c54ef182b0f5858b034beac1b6f3089aa2d3188bb1e8929f4fa9b9297b97752341782019d21e7c1027eedcd270e56f5b672dcc28d53bf58a346002fca264697066735822122067d8e72251302b96d576ec567d43e52ddb86be695dfae4dec354c77868fd5b8b64736f6c634300080f0033";

type TelediskoTokenV2MockConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (xs: TelediskoTokenV2MockConstructorParams): xs is ConstructorParameters<typeof ContractFactory> =>
  xs.length > 1;

export class TelediskoTokenV2Mock__factory extends ContractFactory {
  constructor(...args: TelediskoTokenV2MockConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<TelediskoTokenV2Mock> {
    return super.deploy(overrides || {}) as Promise<TelediskoTokenV2Mock>;
  }
  override getDeployTransaction(overrides?: Overrides & { from?: PromiseOrValue<string> }): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TelediskoTokenV2Mock {
    return super.attach(address) as TelediskoTokenV2Mock;
  }
  override connect(signer: Signer): TelediskoTokenV2Mock__factory {
    return super.connect(signer) as TelediskoTokenV2Mock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TelediskoTokenV2MockInterface {
    return new utils.Interface(_abi) as TelediskoTokenV2MockInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): TelediskoTokenV2Mock {
    return new Contract(address, _abi, signerOrProvider) as TelediskoTokenV2Mock;
  }
}
