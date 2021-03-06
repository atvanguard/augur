---
id: api-interfaces-state-logs-types-completesetssoldlog
title: CompleteSetsSoldLog
sidebar_label: CompleteSetsSoldLog
---

[@augurproject/sdk](api-readme.md) > [[state/logs/types Module]](api-modules-state-logs-types-module.md) > [CompleteSetsSoldLog](api-interfaces-state-logs-types-completesetssoldlog.md)

## Interface

## Hierarchy

 [Log](api-interfaces-state-logs-types-log.md)

 [Doc](api-interfaces-state-logs-types-doc.md)

 [Timestamped](api-interfaces-state-logs-types-timestamped.md)

**↳ CompleteSetsSoldLog**

### Properties

* [_id](api-interfaces-state-logs-types-completesetssoldlog.md#_id)
* [_rev](api-interfaces-state-logs-types-completesetssoldlog.md#_rev)
* [account](api-interfaces-state-logs-types-completesetssoldlog.md#account)
* [blockHash](api-interfaces-state-logs-types-completesetssoldlog.md#blockhash)
* [blockNumber](api-interfaces-state-logs-types-completesetssoldlog.md#blocknumber)
* [logIndex](api-interfaces-state-logs-types-completesetssoldlog.md#logindex)
* [market](api-interfaces-state-logs-types-completesetssoldlog.md#market)
* [marketCreatorFees](api-interfaces-state-logs-types-completesetssoldlog.md#marketcreatorfees)
* [marketOI](api-interfaces-state-logs-types-completesetssoldlog.md#marketoi)
* [numCompleteSets](api-interfaces-state-logs-types-completesetssoldlog.md#numcompletesets)
* [reporterFees](api-interfaces-state-logs-types-completesetssoldlog.md#reporterfees)
* [timestamp](api-interfaces-state-logs-types-completesetssoldlog.md#timestamp)
* [transactionHash](api-interfaces-state-logs-types-completesetssoldlog.md#transactionhash)
* [transactionIndex](api-interfaces-state-logs-types-completesetssoldlog.md#transactionindex)
* [universe](api-interfaces-state-logs-types-completesetssoldlog.md#universe)

---

## Properties

<a id="_id"></a>

###  _id

**● _id**: *`string`*

*Inherited from [Doc](api-interfaces-state-logs-types-doc.md).[_id](api-interfaces-state-logs-types-doc.md#_id)*

*Defined in [state/logs/types.ts:7](https://github.com/AugurProject/augur/blob/06e47ad207/packages/augur-sdk/src/state/logs/types.ts#L7)*

___
<a id="_rev"></a>

###  _rev

**● _rev**: *`string`*

*Inherited from [Doc](api-interfaces-state-logs-types-doc.md).[_rev](api-interfaces-state-logs-types-doc.md#_rev)*

*Defined in [state/logs/types.ts:8](https://github.com/AugurProject/augur/blob/06e47ad207/packages/augur-sdk/src/state/logs/types.ts#L8)*

___
<a id="account"></a>

###  account

**● account**: *[Address](api-modules-state-logs-types-module.md#address)*

*Defined in [state/logs/types.ts:34](https://github.com/AugurProject/augur/blob/06e47ad207/packages/augur-sdk/src/state/logs/types.ts#L34)*

___
<a id="blockhash"></a>

###  blockHash

**● blockHash**: *[Bytes32](api-modules-state-logs-types-module.md#bytes32)*

*Inherited from [Log](api-interfaces-state-logs-types-log.md).[blockHash](api-interfaces-state-logs-types-log.md#blockhash)*

*Defined in [state/logs/types.ts:17](https://github.com/AugurProject/augur/blob/06e47ad207/packages/augur-sdk/src/state/logs/types.ts#L17)*

___
<a id="blocknumber"></a>

###  blockNumber

**● blockNumber**: *`number`*

*Inherited from [Log](api-interfaces-state-logs-types-log.md).[blockNumber](api-interfaces-state-logs-types-log.md#blocknumber)*

*Defined in [state/logs/types.ts:16](https://github.com/AugurProject/augur/blob/06e47ad207/packages/augur-sdk/src/state/logs/types.ts#L16)*

___
<a id="logindex"></a>

###  logIndex

**● logIndex**: *`number`*

*Inherited from [Log](api-interfaces-state-logs-types-log.md).[logIndex](api-interfaces-state-logs-types-log.md#logindex)*

*Defined in [state/logs/types.ts:20](https://github.com/AugurProject/augur/blob/06e47ad207/packages/augur-sdk/src/state/logs/types.ts#L20)*

___
<a id="market"></a>

###  market

**● market**: *[Address](api-modules-state-logs-types-module.md#address)*

*Defined in [state/logs/types.ts:33](https://github.com/AugurProject/augur/blob/06e47ad207/packages/augur-sdk/src/state/logs/types.ts#L33)*

___
<a id="marketcreatorfees"></a>

###  marketCreatorFees

**● marketCreatorFees**: *`string`*

*Defined in [state/logs/types.ts:37](https://github.com/AugurProject/augur/blob/06e47ad207/packages/augur-sdk/src/state/logs/types.ts#L37)*

___
<a id="marketoi"></a>

###  marketOI

**● marketOI**: *`string`*

*Defined in [state/logs/types.ts:36](https://github.com/AugurProject/augur/blob/06e47ad207/packages/augur-sdk/src/state/logs/types.ts#L36)*

___
<a id="numcompletesets"></a>

###  numCompleteSets

**● numCompleteSets**: *`string`*

*Defined in [state/logs/types.ts:35](https://github.com/AugurProject/augur/blob/06e47ad207/packages/augur-sdk/src/state/logs/types.ts#L35)*

___
<a id="reporterfees"></a>

###  reporterFees

**● reporterFees**: *`string`*

*Defined in [state/logs/types.ts:38](https://github.com/AugurProject/augur/blob/06e47ad207/packages/augur-sdk/src/state/logs/types.ts#L38)*

___
<a id="timestamp"></a>

###  timestamp

**● timestamp**: *[Timestamp](api-modules-state-logs-types-module.md#timestamp)*

*Inherited from [Timestamped](api-interfaces-state-logs-types-timestamped.md).[timestamp](api-interfaces-state-logs-types-timestamped.md#timestamp)*

*Defined in [state/logs/types.ts:12](https://github.com/AugurProject/augur/blob/06e47ad207/packages/augur-sdk/src/state/logs/types.ts#L12)*

___
<a id="transactionhash"></a>

###  transactionHash

**● transactionHash**: *[Bytes32](api-modules-state-logs-types-module.md#bytes32)*

*Inherited from [Log](api-interfaces-state-logs-types-log.md).[transactionHash](api-interfaces-state-logs-types-log.md#transactionhash)*

*Defined in [state/logs/types.ts:19](https://github.com/AugurProject/augur/blob/06e47ad207/packages/augur-sdk/src/state/logs/types.ts#L19)*

___
<a id="transactionindex"></a>

###  transactionIndex

**● transactionIndex**: *`number`*

*Inherited from [Log](api-interfaces-state-logs-types-log.md).[transactionIndex](api-interfaces-state-logs-types-log.md#transactionindex)*

*Defined in [state/logs/types.ts:18](https://github.com/AugurProject/augur/blob/06e47ad207/packages/augur-sdk/src/state/logs/types.ts#L18)*

___
<a id="universe"></a>

###  universe

**● universe**: *[Address](api-modules-state-logs-types-module.md#address)*

*Defined in [state/logs/types.ts:32](https://github.com/AugurProject/augur/blob/06e47ad207/packages/augur-sdk/src/state/logs/types.ts#L32)*

___

