/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides, Signer, utils } from "ethers";

import type { PromiseOrValue } from "../../../common";
import type {
  NewTelediskoTokenMock,
  NewTelediskoTokenMockInterface,
} from "../../../contracts/mocks/NewTelediskoTokenMock";

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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
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
    name: "VestingSet2",
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
  "0x60806040523480156200001157600080fd5b50600054610100900460ff1615808015620000335750600054600160ff909116105b8062000063575062000050306200013d60201b62000aa41760201c565b15801562000063575060005460ff166001145b620000cb5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840160405180910390fd5b6000805460ff191660011790558015620000ef576000805461ff0019166101001790555b801562000136576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b506200014c565b6001600160a01b03163b151590565b61203d806200015c6000396000f3fe608060405234801561001057600080fd5b50600436106101e55760003560e01c80635439ad861161010f578063a217fddf116100a2578063c4d0795111610071578063c4d079511461040f578063d547741f14610422578063dd62ed3e14610435578063fea76b2a1461044857600080fd5b8063a217fddf146103ce578063a260b102146103d6578063a457c2d7146103e9578063a9059cbb146103fc57600080fd5b806396c9ee62116100de57806396c9ee621461038d5780639711715a146103a0578063981b24d0146103a85780639dc29fac146103bb57600080fd5b80635439ad861461034157806370a082311461034957806391d148541461037257806395d89b411461038557600080fd5b8063313ce5671161018757806340c10f191161015657806340c10f19146102f557806344292600146103085780634cd88b761461031b5780634ee2cd7e1461032e57600080fd5b8063313ce5671461029757806336568abe146102a657806336ca0365146102b957806339509351146102e257600080fd5b806318160ddd116101c357806318160ddd1461023a57806323b872dd1461024c578063248a9ca31461025f5780632f2ff15d1461028257600080fd5b806301ffc9a7146101ea57806306fdde0314610212578063095ea7b314610227575b600080fd5b6101fd6101f8366004611a4b565b61045b565b60405190151581526020015b60405180910390f35b61021a610492565b6040516102099190611aa1565b6101fd610235366004611ae9565b610524565b6035545b604051908152602001610209565b6101fd61025a366004611b15565b61053c565b61023e61026d366004611b56565b6000908152609f602052604090206001015490565b610295610290366004611b6f565b610560565b005b60405160128152602001610209565b6102956102b4366004611b6f565b61058a565b61023e6102c7366004611b9f565b6001600160a01b031660009081526068602052604090205490565b6101fd6102f0366004611ae9565b61060d565b610295610303366004611ae9565b61062f565b610295610316366004611ae9565b610663565b610295610329366004611c5f565b6106b1565b61023e61033c366004611ae9565b6107d8565b60695461023e565b61023e610357366004611b9f565b6001600160a01b031660009081526033602052604090205490565b6101fd610380366004611b6f565b610831565b61021a61085c565b61029561039b366004611ae9565b61086b565b61023e61088d565b61023e6103b6366004611b56565b6108c7565b6102956103c9366004611ae9565b6108f2565b61023e600081565b6102956103e4366004611b9f565b610926565b6101fd6103f7366004611ae9565b61095d565b6101fd61040a366004611ae9565b6109d8565b61029561041d366004611b9f565b6109e6565b610295610430366004611b6f565b610a1d565b61023e610443366004611cc3565b610a42565b610295610456366004611b9f565b610a6d565b60006001600160e01b03198216637965db0b60e01b148061048c57506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060603680546104a190611cf1565b80601f01602080910402602001604051908101604052809291908181526020018280546104cd90611cf1565b801561051a5780601f106104ef5761010080835404028352916020019161051a565b820191906000526020600020905b8154815290600101906020018083116104fd57829003601f168201915b5050505050905090565b600033610532818585610ab3565b5060019392505050565b60003361054a858285610bd7565b610555858585610c51565b506001949350505050565b6000828152609f602052604090206001015461057b81610e0d565b6105858383610e1a565b505050565b6001600160a01b03811633146105ff5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b6106098282610ea0565b5050565b6000336105328185856106208383610a42565b61062a9190611d41565b610ab3565b7f7b97752341782019d21e7c1027eedcd270e56f5b672dcc28d53bf58a346002fc61065981610e0d565b6105858383610f07565b604080513381526001600160a01b03841660208201529081018290527f271a481a64d7d12f6e8b5b7e6dc43276c1c110e67b5848965dd821ac24087916906060015b60405180910390a15050565b600054610100900460ff16158080156106d15750600054600160ff909116105b806106eb5750303b1580156106eb575060005460ff166001145b61074e5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016105f6565b6000805460ff191660011790558015610771576000805461ff0019166101001790555b61077b8383610fdc565b610783610fe6565b61078e60003361100f565b8015610585576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a1505050565b6001600160a01b0382166000908152606a60205260408120819081906107ff908590611019565b9150915081610826576001600160a01b038516600090815260336020526040902054610828565b805b95945050505050565b6000918252609f602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6060603780546104a190611cf1565b600080516020611fe883398151915261088381610e0d565b610585838361105d565b60007f7b97752341782019d21e7c1027eedcd270e56f5b672dcc28d53bf58a346002fc6108b981610e0d565b6108c161112b565b91505090565b60008060006108d784606b611019565b91509150816108e8576035546108ea565b805b949350505050565b7f7b97752341782019d21e7c1027eedcd270e56f5b672dcc28d53bf58a346002fc61091c81610e0d565b610585838361116e565b600080516020611fe883398151915261093e81610e0d565b606780546001600160a01b0319166001600160a01b0384161790555050565b6000338161096b8286610a42565b9050838110156109cb5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016105f6565b6105558286868403610ab3565b600033610532818585610c51565b600080516020611fe88339815191526109fe81610e0d565b606580546001600160a01b0319166001600160a01b0384161790555050565b6000828152609f6020526040902060010154610a3881610e0d565b6105858383610ea0565b6001600160a01b03918216600090815260346020908152604080832093909416825291909152205490565b600080516020611fe8833981519152610a8581610e0d565b606680546001600160a01b0319166001600160a01b0384161790555050565b6001600160a01b03163b151590565b6001600160a01b038316610b155760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016105f6565b6001600160a01b038216610b765760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016105f6565b6001600160a01b0383811660008181526034602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6000610be38484610a42565b90506000198114610c4b5781811015610c3e5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016105f6565b610c4b8484848403610ab3565b50505050565b6001600160a01b038316610cb55760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016105f6565b6001600160a01b038216610d175760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016105f6565b610d228383836112b5565b6001600160a01b03831660009081526033602052604090205481811015610d9a5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016105f6565b6001600160a01b0380851660008181526033602052604080822086860390559286168082529083902080548601905591517fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610dfa9086815260200190565b60405180910390a3610c4b848484611308565b610e178133611401565b50565b610e248282610831565b610609576000828152609f602090815260408083206001600160a01b03851684529091529020805460ff19166001179055610e5c3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b610eaa8282610831565b15610609576000828152609f602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6001600160a01b038216610f5d5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016105f6565b610f69600083836112b5565b8060356000828254610f7b9190611d41565b90915550506001600160a01b0382166000818152603360209081526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a361060960008383611308565b610609828261145a565b600054610100900460ff1661100d5760405162461bcd60e51b81526004016105f690611d59565b565b6106098282610e1a565b60008080611027858561148b565b909350905082156110555783600101818154811061104757611047611da4565b906000526020600020015491505b509250929050565b6001600160a01b03821660009081526068602052604090205481106110da5760405162461bcd60e51b815260206004820152602d60248201527f54656c656469736b6f546f6b656e3a2076657374696e672063616e206f6e6c7960448201526c08189948191958dc99585cd959609a1b60648201526084016105f6565b6001600160a01b038216600081815260686020908152604091829020849055815192835282018390527f90782417eb6da69d0b671119cc8e9c2063c7b0987ef1378141a54770a8c91fb391016106a5565b4260698190556040519081526000907f8030e83b04d87bef53480e26263266d6ca66863aa8506aca6f2559d18aa1cb679060200160405180910390a15060695490565b6001600160a01b0382166111ce5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016105f6565b6111da826000836112b5565b6001600160a01b0382166000908152603360205260409020548181101561124e5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016105f6565b6001600160a01b03831660008181526033602090815260408083208686039055603580548790039055518581529192917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a361058583600084611308565b6112c0838383611559565b6001600160a01b0383166112df576112d7826116bd565b6105856116f0565b6001600160a01b0382166112f6576112d7836116bd565b6112ff836116bd565b610585826116bd565b606554604051636fb12c5f60e11b81526001600160a01b0385811660048301528481166024830152604482018490529091169063df6258be90606401600060405180830381600087803b15801561135e57600080fd5b505af1158015611372573d6000803e3d6000fd5b505050506001600160a01b03831660009081526068602090815260408083205460339092529091205410156105855760405162461bcd60e51b815260206004820152602f60248201527f54656c656469736b6f546f6b656e3a207472616e7366657220616d6f756e742060448201526e657863656564732076657374696e6760881b60648201526084016105f6565b61140b8282610831565b61060957611418816116fe565b611423836020611710565b604051602001611434929190611dba565b60408051601f198184030181529082905262461bcd60e51b82526105f691600401611aa1565b600054610100900460ff166114815760405162461bcd60e51b81526004016105f690611d59565b61060982826118b3565b600080600084116114d75760405162461bcd60e51b81526020600482015260166024820152750536e617073686f747461626c653a20696420697320360541b60448201526064016105f6565b6069548411156115295760405162461bcd60e51b815260206004820152601d60248201527f536e617073686f747461626c653a206e6f6e6578697374656e7420696400000060448201526064016105f6565b600061153584866118f3565b8454909150810361154b57600092509050611552565b6001925090505b9250929050565b6066546001600160a01b0316336001600160a01b0316148061165d575060675460408051633bef226f60e21b815290516001600160a01b0390921691630ea018f791839163efbc89bc916004808201926020929091908290030181865afa1580156115c8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115ec9190611e2f565b6040516001600160e01b031960e084901b16815260048101919091526001600160a01b0386166024820152604401602060405180830381865afa158015611637573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061165b9190611e48565b155b6105855760405162461bcd60e51b815260206004820152602b60248201527f54656c656469736b6f546f6b656e3a20636f6e7472696275746f722063616e6e60448201526a37ba103a3930b739b332b960a91b60648201526084016105f6565b6001600160a01b0381166000908152606a60209081526040808320603390925290912054610e1791906119a0565b6119a0565b61100d606b6116eb60355490565b606061048c6001600160a01b03831660145b6060600061171f836002611e6a565b61172a906002611d41565b67ffffffffffffffff81111561174257611742611bbc565b6040519080825280601f01601f19166020018201604052801561176c576020820181803683370190505b509050600360fc1b8160008151811061178757611787611da4565b60200101906001600160f81b031916908160001a905350600f60fb1b816001815181106117b6576117b6611da4565b60200101906001600160f81b031916908160001a90535060006117da846002611e6a565b6117e5906001611d41565b90505b600181111561185d576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061181957611819611da4565b1a60f81b82828151811061182f5761182f611da4565b60200101906001600160f81b031916908160001a90535060049490941c9361185681611e89565b90506117e8565b5083156118ac5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016105f6565b9392505050565b600054610100900460ff166118da5760405162461bcd60e51b81526004016105f690611d59565b60366118e68382611eee565b5060376105858282611eee565b815460009081036119065750600061048c565b82546000905b8082101561195357600061192083836119eb565b6000878152602090209091508590820154111561193f5780915061194d565b61194a816001611d41565b92505b5061190c565b60008211801561197f57508361197c8661196e600186611fae565b600091825260209091200190565b54145b156119985761198f600183611fae565b9250505061048c565b50905061048c565b60006119ab60695490565b9050806119b784611a06565b1015610585578254600180820185556000858152602080822090930193909355938401805494850181558252902090910155565b60006119fa6002848418611fc5565b6118ac90848416611d41565b80546000908103611a1957506000919050565b81548290611a2990600190611fae565b81548110611a3957611a39611da4565b90600052602060002001549050919050565b600060208284031215611a5d57600080fd5b81356001600160e01b0319811681146118ac57600080fd5b60005b83811015611a90578181015183820152602001611a78565b83811115610c4b5750506000910152565b6020815260008251806020840152611ac0816040850160208701611a75565b601f01601f19169190910160400192915050565b6001600160a01b0381168114610e1757600080fd5b60008060408385031215611afc57600080fd5b8235611b0781611ad4565b946020939093013593505050565b600080600060608486031215611b2a57600080fd5b8335611b3581611ad4565b92506020840135611b4581611ad4565b929592945050506040919091013590565b600060208284031215611b6857600080fd5b5035919050565b60008060408385031215611b8257600080fd5b823591506020830135611b9481611ad4565b809150509250929050565b600060208284031215611bb157600080fd5b81356118ac81611ad4565b634e487b7160e01b600052604160045260246000fd5b600082601f830112611be357600080fd5b813567ffffffffffffffff80821115611bfe57611bfe611bbc565b604051601f8301601f19908116603f01168101908282118183101715611c2657611c26611bbc565b81604052838152866020858801011115611c3f57600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060408385031215611c7257600080fd5b823567ffffffffffffffff80821115611c8a57600080fd5b611c9686838701611bd2565b93506020850135915080821115611cac57600080fd5b50611cb985828601611bd2565b9150509250929050565b60008060408385031215611cd657600080fd5b8235611ce181611ad4565b91506020830135611b9481611ad4565b600181811c90821680611d0557607f821691505b602082108103611d2557634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b60008219821115611d5457611d54611d2b565b500190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351611df2816017850160208801611a75565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351611e23816028840160208801611a75565b01602801949350505050565b600060208284031215611e4157600080fd5b5051919050565b600060208284031215611e5a57600080fd5b815180151581146118ac57600080fd5b6000816000190483118215151615611e8457611e84611d2b565b500290565b600081611e9857611e98611d2b565b506000190190565b601f82111561058557600081815260208120601f850160051c81016020861015611ec75750805b601f850160051c820191505b81811015611ee657828155600101611ed3565b505050505050565b815167ffffffffffffffff811115611f0857611f08611bbc565b611f1c81611f168454611cf1565b84611ea0565b602080601f831160018114611f515760008415611f395750858301515b600019600386901b1c1916600185901b178555611ee6565b600085815260208120601f198616915b82811015611f8057888601518255948401946001909101908401611f61565b5085821015611f9e5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b600082821015611fc057611fc0611d2b565b500390565b600082611fe257634e487b7160e01b600052601260045260246000fd5b50049056fe97667070c54ef182b0f5858b034beac1b6f3089aa2d3188bb1e8929f4fa9b929a2646970667358221220d16a4af8a2e4d9a8d572a48dc4a8162349f446a788f3f5d6903dd51a5213e2f064736f6c634300080f0033";

type NewTelediskoTokenMockConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (xs: NewTelediskoTokenMockConstructorParams): xs is ConstructorParameters<typeof ContractFactory> =>
  xs.length > 1;

export class NewTelediskoTokenMock__factory extends ContractFactory {
  constructor(...args: NewTelediskoTokenMockConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<NewTelediskoTokenMock> {
    return super.deploy(overrides || {}) as Promise<NewTelediskoTokenMock>;
  }
  override getDeployTransaction(overrides?: Overrides & { from?: PromiseOrValue<string> }): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): NewTelediskoTokenMock {
    return super.attach(address) as NewTelediskoTokenMock;
  }
  override connect(signer: Signer): NewTelediskoTokenMock__factory {
    return super.connect(signer) as NewTelediskoTokenMock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NewTelediskoTokenMockInterface {
    return new utils.Interface(_abi) as NewTelediskoTokenMockInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): NewTelediskoTokenMock {
    return new Contract(address, _abi, signerOrProvider) as NewTelediskoTokenMock;
  }
}
