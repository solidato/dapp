/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";

import type { OnEvent, PromiseOrValue, TypedEvent, TypedEventFilter, TypedListener } from "../../common";

export interface RolesInterface extends utils.Interface {
  functions: {
    "ESCROW_ROLE()": FunctionFragment;
    "MARKET_ROLE()": FunctionFragment;
    "MINTER_ROLE()": FunctionFragment;
    "OPERATOR_ROLE()": FunctionFragment;
    "RESOLUTION_ROLE()": FunctionFragment;
    "SHAREHOLDER_REGISTRY_ROLE()": FunctionFragment;
    "TOKEN_MANAGER_ROLE()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "ESCROW_ROLE"
      | "MARKET_ROLE"
      | "MINTER_ROLE"
      | "OPERATOR_ROLE"
      | "RESOLUTION_ROLE"
      | "SHAREHOLDER_REGISTRY_ROLE"
      | "TOKEN_MANAGER_ROLE",
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "ESCROW_ROLE", values?: undefined): string;
  encodeFunctionData(functionFragment: "MARKET_ROLE", values?: undefined): string;
  encodeFunctionData(functionFragment: "MINTER_ROLE", values?: undefined): string;
  encodeFunctionData(functionFragment: "OPERATOR_ROLE", values?: undefined): string;
  encodeFunctionData(functionFragment: "RESOLUTION_ROLE", values?: undefined): string;
  encodeFunctionData(functionFragment: "SHAREHOLDER_REGISTRY_ROLE", values?: undefined): string;
  encodeFunctionData(functionFragment: "TOKEN_MANAGER_ROLE", values?: undefined): string;

  decodeFunctionResult(functionFragment: "ESCROW_ROLE", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "MARKET_ROLE", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "MINTER_ROLE", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "OPERATOR_ROLE", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "RESOLUTION_ROLE", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "SHAREHOLDER_REGISTRY_ROLE", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "TOKEN_MANAGER_ROLE", data: BytesLike): Result;

  events: {};
}

export interface Roles extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: RolesInterface;

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
    ESCROW_ROLE(overrides?: CallOverrides): Promise<[string]>;

    MARKET_ROLE(overrides?: CallOverrides): Promise<[string]>;

    MINTER_ROLE(overrides?: CallOverrides): Promise<[string]>;

    OPERATOR_ROLE(overrides?: CallOverrides): Promise<[string]>;

    RESOLUTION_ROLE(overrides?: CallOverrides): Promise<[string]>;

    SHAREHOLDER_REGISTRY_ROLE(overrides?: CallOverrides): Promise<[string]>;

    TOKEN_MANAGER_ROLE(overrides?: CallOverrides): Promise<[string]>;
  };

  ESCROW_ROLE(overrides?: CallOverrides): Promise<string>;

  MARKET_ROLE(overrides?: CallOverrides): Promise<string>;

  MINTER_ROLE(overrides?: CallOverrides): Promise<string>;

  OPERATOR_ROLE(overrides?: CallOverrides): Promise<string>;

  RESOLUTION_ROLE(overrides?: CallOverrides): Promise<string>;

  SHAREHOLDER_REGISTRY_ROLE(overrides?: CallOverrides): Promise<string>;

  TOKEN_MANAGER_ROLE(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    ESCROW_ROLE(overrides?: CallOverrides): Promise<string>;

    MARKET_ROLE(overrides?: CallOverrides): Promise<string>;

    MINTER_ROLE(overrides?: CallOverrides): Promise<string>;

    OPERATOR_ROLE(overrides?: CallOverrides): Promise<string>;

    RESOLUTION_ROLE(overrides?: CallOverrides): Promise<string>;

    SHAREHOLDER_REGISTRY_ROLE(overrides?: CallOverrides): Promise<string>;

    TOKEN_MANAGER_ROLE(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    ESCROW_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    MARKET_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    MINTER_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    OPERATOR_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    RESOLUTION_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    SHAREHOLDER_REGISTRY_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    TOKEN_MANAGER_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    ESCROW_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    MARKET_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    MINTER_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    OPERATOR_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    RESOLUTION_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    SHAREHOLDER_REGISTRY_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TOKEN_MANAGER_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
