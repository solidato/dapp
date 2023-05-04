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

export interface RedemptionControllerInterface extends utils.Interface {
  functions: {
    "activityWindow()": FunctionFragment;
    "afterMint(address,uint256)": FunctionFragment;
    "afterOffer(address,uint256)": FunctionFragment;
    "afterRedeem(address,uint256)": FunctionFragment;
    "getRoles()": FunctionFragment;
    "initialize(address)": FunctionFragment;
    "maxDaysInThePast()": FunctionFragment;
    "redeemableBalance(address)": FunctionFragment;
    "redemptionStart()": FunctionFragment;
    "redemptionWindow()": FunctionFragment;
    "setRoles(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "activityWindow"
      | "afterMint"
      | "afterOffer"
      | "afterRedeem"
      | "getRoles"
      | "initialize"
      | "maxDaysInThePast"
      | "redeemableBalance"
      | "redemptionStart"
      | "redemptionWindow"
      | "setRoles",
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "activityWindow", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "afterMint",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(
    functionFragment: "afterOffer",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(
    functionFragment: "afterRedeem",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(functionFragment: "getRoles", values?: undefined): string;
  encodeFunctionData(functionFragment: "initialize", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "maxDaysInThePast", values?: undefined): string;
  encodeFunctionData(functionFragment: "redeemableBalance", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "redemptionStart", values?: undefined): string;
  encodeFunctionData(functionFragment: "redemptionWindow", values?: undefined): string;
  encodeFunctionData(functionFragment: "setRoles", values: [PromiseOrValue<string>]): string;

  decodeFunctionResult(functionFragment: "activityWindow", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "afterMint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "afterOffer", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "afterRedeem", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getRoles", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "maxDaysInThePast", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "redeemableBalance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "redemptionStart", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "redemptionWindow", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setRoles", data: BytesLike): Result;

  events: {
    "Initialized(uint8)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
}

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface RedemptionController extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: RedemptionControllerInterface;

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
    activityWindow(overrides?: CallOverrides): Promise<[BigNumber]>;

    afterMint(
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    afterOffer(
      account: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    afterRedeem(
      account: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    getRoles(overrides?: CallOverrides): Promise<[string]>;

    initialize(
      roles: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    maxDaysInThePast(overrides?: CallOverrides): Promise<[BigNumber]>;

    redeemableBalance(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<[BigNumber] & { redeemableAmount: BigNumber }>;

    redemptionStart(overrides?: CallOverrides): Promise<[BigNumber]>;

    redemptionWindow(overrides?: CallOverrides): Promise<[BigNumber]>;

    setRoles(
      roles: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;
  };

  activityWindow(overrides?: CallOverrides): Promise<BigNumber>;

  afterMint(
    to: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  afterOffer(
    account: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  afterRedeem(
    account: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  getRoles(overrides?: CallOverrides): Promise<string>;

  initialize(
    roles: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  maxDaysInThePast(overrides?: CallOverrides): Promise<BigNumber>;

  redeemableBalance(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

  redemptionStart(overrides?: CallOverrides): Promise<BigNumber>;

  redemptionWindow(overrides?: CallOverrides): Promise<BigNumber>;

  setRoles(
    roles: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  callStatic: {
    activityWindow(overrides?: CallOverrides): Promise<BigNumber>;

    afterMint(
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<void>;

    afterOffer(
      account: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<void>;

    afterRedeem(
      account: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<void>;

    getRoles(overrides?: CallOverrides): Promise<string>;

    initialize(roles: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    maxDaysInThePast(overrides?: CallOverrides): Promise<BigNumber>;

    redeemableBalance(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    redemptionStart(overrides?: CallOverrides): Promise<BigNumber>;

    redemptionWindow(overrides?: CallOverrides): Promise<BigNumber>;

    setRoles(roles: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;
  };

  estimateGas: {
    activityWindow(overrides?: CallOverrides): Promise<BigNumber>;

    afterMint(
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    afterOffer(
      account: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    afterRedeem(
      account: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    getRoles(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      roles: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    maxDaysInThePast(overrides?: CallOverrides): Promise<BigNumber>;

    redeemableBalance(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    redemptionStart(overrides?: CallOverrides): Promise<BigNumber>;

    redemptionWindow(overrides?: CallOverrides): Promise<BigNumber>;

    setRoles(
      roles: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    activityWindow(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    afterMint(
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    afterOffer(
      account: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    afterRedeem(
      account: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    getRoles(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initialize(
      roles: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    maxDaysInThePast(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    redeemableBalance(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    redemptionStart(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    redemptionWindow(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setRoles(
      roles: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;
  };
}