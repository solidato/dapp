/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { EventFragment, FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";

import type { OnEvent, PromiseOrValue, TypedEvent, TypedEventFilter, TypedListener } from "../../common";

export interface ShareholderRegistrySnapshotInterface extends utils.Interface {
  functions: {
    "CONTRIBUTOR_STATUS()": FunctionFragment;
    "INVESTOR_STATUS()": FunctionFragment;
    "MANAGING_BOARD_STATUS()": FunctionFragment;
    "SHAREHOLDER_STATUS()": FunctionFragment;
    "allowance(address,address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "balanceOfAt(address,uint256)": FunctionFragment;
    "decimals()": FunctionFragment;
    "decreaseAllowance(address,uint256)": FunctionFragment;
    "getBalanceAndStatusAt(address,uint256)": FunctionFragment;
    "getCurrentSnapshotId()": FunctionFragment;
    "getStatus(address)": FunctionFragment;
    "getStatusAt(address,uint256)": FunctionFragment;
    "increaseAllowance(address,uint256)": FunctionFragment;
    "isAtLeast(bytes32,address)": FunctionFragment;
    "isAtLeastAt(bytes32,address,uint256)": FunctionFragment;
    "name()": FunctionFragment;
    "snapshot()": FunctionFragment;
    "symbol()": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "totalSupplyAt(uint256)": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "CONTRIBUTOR_STATUS"
      | "INVESTOR_STATUS"
      | "MANAGING_BOARD_STATUS"
      | "SHAREHOLDER_STATUS"
      | "allowance"
      | "approve"
      | "balanceOf"
      | "balanceOfAt"
      | "decimals"
      | "decreaseAllowance"
      | "getBalanceAndStatusAt"
      | "getCurrentSnapshotId"
      | "getStatus"
      | "getStatusAt"
      | "increaseAllowance"
      | "isAtLeast"
      | "isAtLeastAt"
      | "name"
      | "snapshot"
      | "symbol"
      | "totalSupply"
      | "totalSupplyAt"
      | "transfer"
      | "transferFrom",
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "CONTRIBUTOR_STATUS", values?: undefined): string;
  encodeFunctionData(functionFragment: "INVESTOR_STATUS", values?: undefined): string;
  encodeFunctionData(functionFragment: "MANAGING_BOARD_STATUS", values?: undefined): string;
  encodeFunctionData(functionFragment: "SHAREHOLDER_STATUS", values?: undefined): string;
  encodeFunctionData(functionFragment: "allowance", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: "balanceOfAt",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "decreaseAllowance",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(
    functionFragment: "getBalanceAndStatusAt",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(functionFragment: "getCurrentSnapshotId", values?: undefined): string;
  encodeFunctionData(functionFragment: "getStatus", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: "getStatusAt",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(
    functionFragment: "increaseAllowance",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(
    functionFragment: "isAtLeast",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>],
  ): string;
  encodeFunctionData(
    functionFragment: "isAtLeastAt",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>, PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "snapshot", values?: undefined): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(functionFragment: "totalSupply", values?: undefined): string;
  encodeFunctionData(functionFragment: "totalSupplyAt", values: [PromiseOrValue<BigNumberish>]): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [PromiseOrValue<string>, PromiseOrValue<string>, PromiseOrValue<BigNumberish>],
  ): string;

  decodeFunctionResult(functionFragment: "CONTRIBUTOR_STATUS", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "INVESTOR_STATUS", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "MANAGING_BOARD_STATUS", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "SHAREHOLDER_STATUS", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOfAt", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "decreaseAllowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getBalanceAndStatusAt", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getCurrentSnapshotId", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getStatus", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getStatusAt", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "increaseAllowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isAtLeast", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isAtLeastAt", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "snapshot", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "totalSupplyAt", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;

  events: {
    "Approval(address,address,uint256)": EventFragment;
    "Initialized(uint8)": EventFragment;
    "Snapshot(uint256)": EventFragment;
    "StatusChanged(address,bytes32,bytes32)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Snapshot"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "StatusChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export interface ApprovalEventObject {
  owner: string;
  spender: string;
  value: BigNumber;
}
export type ApprovalEvent = TypedEvent<[string, string, BigNumber], ApprovalEventObject>;

export type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface SnapshotEventObject {
  id: BigNumber;
}
export type SnapshotEvent = TypedEvent<[BigNumber], SnapshotEventObject>;

export type SnapshotEventFilter = TypedEventFilter<SnapshotEvent>;

export interface StatusChangedEventObject {
  account: string;
  previous: string;
  current: string;
}
export type StatusChangedEvent = TypedEvent<[string, string, string], StatusChangedEventObject>;

export type StatusChangedEventFilter = TypedEventFilter<StatusChangedEvent>;

export interface TransferEventObject {
  from: string;
  to: string;
  value: BigNumber;
}
export type TransferEvent = TypedEvent<[string, string, BigNumber], TransferEventObject>;

export type TransferEventFilter = TypedEventFilter<TransferEvent>;

export interface ShareholderRegistrySnapshot extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ShareholderRegistrySnapshotInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    CONTRIBUTOR_STATUS(overrides?: CallOverrides): Promise<[string]>;

    INVESTOR_STATUS(overrides?: CallOverrides): Promise<[string]>;

    MANAGING_BOARD_STATUS(overrides?: CallOverrides): Promise<[string]>;

    SHAREHOLDER_STATUS(overrides?: CallOverrides): Promise<[string]>;

    allowance(
      owner: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;

    approve(
      spender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;

    balanceOfAt(
      account: PromiseOrValue<string>,
      snapshotId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<[BigNumber] & { balance: BigNumber }>;

    decimals(overrides?: CallOverrides): Promise<[number]>;

    decreaseAllowance(
      spender: PromiseOrValue<string>,
      subtractedValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    getBalanceAndStatusAt(
      account: PromiseOrValue<string>,
      snapshotId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<[BigNumber, string]>;

    getCurrentSnapshotId(overrides?: CallOverrides): Promise<[BigNumber]>;

    getStatus(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[string]>;

    getStatusAt(
      account: PromiseOrValue<string>,
      snapshotId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<[string] & { status: string }>;

    increaseAllowance(
      spender: PromiseOrValue<string>,
      addedValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    isAtLeast(
      status: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<[boolean]>;

    isAtLeastAt(
      status: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      snapshotId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<[boolean]>;

    name(overrides?: CallOverrides): Promise<[string]>;

    snapshot(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<ContractTransaction>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    totalSupplyAt(snapshotId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;

    transfer(
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    transferFrom(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;
  };

  CONTRIBUTOR_STATUS(overrides?: CallOverrides): Promise<string>;

  INVESTOR_STATUS(overrides?: CallOverrides): Promise<string>;

  MANAGING_BOARD_STATUS(overrides?: CallOverrides): Promise<string>;

  SHAREHOLDER_STATUS(overrides?: CallOverrides): Promise<string>;

  allowance(
    owner: PromiseOrValue<string>,
    spender: PromiseOrValue<string>,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;

  approve(
    spender: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

  balanceOfAt(
    account: PromiseOrValue<string>,
    snapshotId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;

  decimals(overrides?: CallOverrides): Promise<number>;

  decreaseAllowance(
    spender: PromiseOrValue<string>,
    subtractedValue: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  getBalanceAndStatusAt(
    account: PromiseOrValue<string>,
    snapshotId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides,
  ): Promise<[BigNumber, string]>;

  getCurrentSnapshotId(overrides?: CallOverrides): Promise<BigNumber>;

  getStatus(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;

  getStatusAt(
    account: PromiseOrValue<string>,
    snapshotId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides,
  ): Promise<string>;

  increaseAllowance(
    spender: PromiseOrValue<string>,
    addedValue: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  isAtLeast(
    status: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: CallOverrides,
  ): Promise<boolean>;

  isAtLeastAt(
    status: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    snapshotId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides,
  ): Promise<boolean>;

  name(overrides?: CallOverrides): Promise<string>;

  snapshot(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<ContractTransaction>;

  symbol(overrides?: CallOverrides): Promise<string>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  totalSupplyAt(snapshotId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;

  transfer(
    to: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  transferFrom(
    from: PromiseOrValue<string>,
    to: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  callStatic: {
    CONTRIBUTOR_STATUS(overrides?: CallOverrides): Promise<string>;

    INVESTOR_STATUS(overrides?: CallOverrides): Promise<string>;

    MANAGING_BOARD_STATUS(overrides?: CallOverrides): Promise<string>;

    SHAREHOLDER_STATUS(overrides?: CallOverrides): Promise<string>;

    allowance(
      owner: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    approve(
      spender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<boolean>;

    balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    balanceOfAt(
      account: PromiseOrValue<string>,
      snapshotId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<number>;

    decreaseAllowance(
      spender: PromiseOrValue<string>,
      subtractedValue: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<boolean>;

    getBalanceAndStatusAt(
      account: PromiseOrValue<string>,
      snapshotId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<[BigNumber, string]>;

    getCurrentSnapshotId(overrides?: CallOverrides): Promise<BigNumber>;

    getStatus(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;

    getStatusAt(
      account: PromiseOrValue<string>,
      snapshotId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<string>;

    increaseAllowance(
      spender: PromiseOrValue<string>,
      addedValue: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<boolean>;

    isAtLeast(
      status: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<boolean>;

    isAtLeastAt(
      status: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      snapshotId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<boolean>;

    name(overrides?: CallOverrides): Promise<string>;

    snapshot(overrides?: CallOverrides): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<string>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    totalSupplyAt(snapshotId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<boolean>;

    transferFrom(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<boolean>;
  };

  filters: {
    "Approval(address,address,uint256)"(
      owner?: PromiseOrValue<string> | null,
      spender?: PromiseOrValue<string> | null,
      value?: null,
    ): ApprovalEventFilter;
    Approval(
      owner?: PromiseOrValue<string> | null,
      spender?: PromiseOrValue<string> | null,
      value?: null,
    ): ApprovalEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "Snapshot(uint256)"(id?: null): SnapshotEventFilter;
    Snapshot(id?: null): SnapshotEventFilter;

    "StatusChanged(address,bytes32,bytes32)"(
      account?: PromiseOrValue<string> | null,
      previous?: null,
      current?: null,
    ): StatusChangedEventFilter;
    StatusChanged(account?: PromiseOrValue<string> | null, previous?: null, current?: null): StatusChangedEventFilter;

    "Transfer(address,address,uint256)"(
      from?: PromiseOrValue<string> | null,
      to?: PromiseOrValue<string> | null,
      value?: null,
    ): TransferEventFilter;
    Transfer(
      from?: PromiseOrValue<string> | null,
      to?: PromiseOrValue<string> | null,
      value?: null,
    ): TransferEventFilter;
  };

  estimateGas: {
    CONTRIBUTOR_STATUS(overrides?: CallOverrides): Promise<BigNumber>;

    INVESTOR_STATUS(overrides?: CallOverrides): Promise<BigNumber>;

    MANAGING_BOARD_STATUS(overrides?: CallOverrides): Promise<BigNumber>;

    SHAREHOLDER_STATUS(overrides?: CallOverrides): Promise<BigNumber>;

    allowance(
      owner: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    approve(
      spender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    balanceOfAt(
      account: PromiseOrValue<string>,
      snapshotId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<BigNumber>;

    decreaseAllowance(
      spender: PromiseOrValue<string>,
      subtractedValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    getBalanceAndStatusAt(
      account: PromiseOrValue<string>,
      snapshotId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    getCurrentSnapshotId(overrides?: CallOverrides): Promise<BigNumber>;

    getStatus(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    getStatusAt(
      account: PromiseOrValue<string>,
      snapshotId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    increaseAllowance(
      spender: PromiseOrValue<string>,
      addedValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    isAtLeast(
      status: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    isAtLeastAt(
      status: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      snapshotId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    snapshot(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    totalSupplyAt(snapshotId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    transferFrom(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    CONTRIBUTOR_STATUS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    INVESTOR_STATUS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    MANAGING_BOARD_STATUS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    SHAREHOLDER_STATUS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    allowance(
      owner: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    approve(
      spender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    balanceOfAt(
      account: PromiseOrValue<string>,
      snapshotId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    decreaseAllowance(
      spender: PromiseOrValue<string>,
      subtractedValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    getBalanceAndStatusAt(
      account: PromiseOrValue<string>,
      snapshotId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    getCurrentSnapshotId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getStatus(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getStatusAt(
      account: PromiseOrValue<string>,
      snapshotId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    increaseAllowance(
      spender: PromiseOrValue<string>,
      addedValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    isAtLeast(
      status: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    isAtLeastAt(
      status: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      snapshotId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    snapshot(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalSupplyAt(snapshotId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transfer(
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    transferFrom(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;
  };
}
