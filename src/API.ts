/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateElectricityRecordInput = {
  id?: string | null,
  year: number,
  month: string,
  kwh: number,
  emissionsT: number,
  provider?: string | null,
  createdAt?: string | null,
  receiptKey?: string | null,
  receiptUploadedAt?: string | null,
};

export type ModelElectricityRecordConditionInput = {
  year?: ModelIntInput | null,
  month?: ModelStringInput | null,
  kwh?: ModelFloatInput | null,
  emissionsT?: ModelFloatInput | null,
  provider?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  receiptKey?: ModelStringInput | null,
  receiptUploadedAt?: ModelStringInput | null,
  and?: Array< ModelElectricityRecordConditionInput | null > | null,
  or?: Array< ModelElectricityRecordConditionInput | null > | null,
  not?: ModelElectricityRecordConditionInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ElectricityRecord = {
  __typename: "ElectricityRecord",
  id: string,
  year: number,
  month: string,
  kwh: number,
  emissionsT: number,
  provider?: string | null,
  createdAt?: string | null,
  receiptKey?: string | null,
  receiptUploadedAt?: string | null,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateElectricityRecordInput = {
  id: string,
  year?: number | null,
  month?: string | null,
  kwh?: number | null,
  emissionsT?: number | null,
  provider?: string | null,
  createdAt?: string | null,
  receiptKey?: string | null,
  receiptUploadedAt?: string | null,
};

export type DeleteElectricityRecordInput = {
  id: string,
};

export type CreateWaterRecordInput = {
  id?: string | null,
  year: number,
  month: string,
  volume: number,
  provider?: string | null,
  createdAt?: string | null,
  receiptKey?: string | null,
  receiptUploadedAt?: string | null,
};

export type ModelWaterRecordConditionInput = {
  year?: ModelIntInput | null,
  month?: ModelStringInput | null,
  volume?: ModelFloatInput | null,
  provider?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  receiptKey?: ModelStringInput | null,
  receiptUploadedAt?: ModelStringInput | null,
  and?: Array< ModelWaterRecordConditionInput | null > | null,
  or?: Array< ModelWaterRecordConditionInput | null > | null,
  not?: ModelWaterRecordConditionInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type WaterRecord = {
  __typename: "WaterRecord",
  id: string,
  year: number,
  month: string,
  volume: number,
  provider?: string | null,
  createdAt?: string | null,
  receiptKey?: string | null,
  receiptUploadedAt?: string | null,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateWaterRecordInput = {
  id: string,
  year?: number | null,
  month?: string | null,
  volume?: number | null,
  provider?: string | null,
  createdAt?: string | null,
  receiptKey?: string | null,
  receiptUploadedAt?: string | null,
};

export type DeleteWaterRecordInput = {
  id: string,
};

export type ModelElectricityRecordFilterInput = {
  id?: ModelIDInput | null,
  year?: ModelIntInput | null,
  month?: ModelStringInput | null,
  kwh?: ModelFloatInput | null,
  emissionsT?: ModelFloatInput | null,
  provider?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  receiptKey?: ModelStringInput | null,
  receiptUploadedAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelElectricityRecordFilterInput | null > | null,
  or?: Array< ModelElectricityRecordFilterInput | null > | null,
  not?: ModelElectricityRecordFilterInput | null,
  owner?: ModelStringInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelElectricityRecordConnection = {
  __typename: "ModelElectricityRecordConnection",
  items:  Array<ElectricityRecord | null >,
  nextToken?: string | null,
};

export type ModelWaterRecordFilterInput = {
  id?: ModelIDInput | null,
  year?: ModelIntInput | null,
  month?: ModelStringInput | null,
  volume?: ModelFloatInput | null,
  provider?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  receiptKey?: ModelStringInput | null,
  receiptUploadedAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelWaterRecordFilterInput | null > | null,
  or?: Array< ModelWaterRecordFilterInput | null > | null,
  not?: ModelWaterRecordFilterInput | null,
  owner?: ModelStringInput | null,
};

export type ModelWaterRecordConnection = {
  __typename: "ModelWaterRecordConnection",
  items:  Array<WaterRecord | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionElectricityRecordFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  year?: ModelSubscriptionIntInput | null,
  month?: ModelSubscriptionStringInput | null,
  kwh?: ModelSubscriptionFloatInput | null,
  emissionsT?: ModelSubscriptionFloatInput | null,
  provider?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  receiptKey?: ModelSubscriptionStringInput | null,
  receiptUploadedAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionElectricityRecordFilterInput | null > | null,
  or?: Array< ModelSubscriptionElectricityRecordFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionWaterRecordFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  year?: ModelSubscriptionIntInput | null,
  month?: ModelSubscriptionStringInput | null,
  volume?: ModelSubscriptionFloatInput | null,
  provider?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  receiptKey?: ModelSubscriptionStringInput | null,
  receiptUploadedAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionWaterRecordFilterInput | null > | null,
  or?: Array< ModelSubscriptionWaterRecordFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type CreateElectricityRecordMutationVariables = {
  input: CreateElectricityRecordInput,
  condition?: ModelElectricityRecordConditionInput | null,
};

export type CreateElectricityRecordMutation = {
  createElectricityRecord?:  {
    __typename: "ElectricityRecord",
    id: string,
    year: number,
    month: string,
    kwh: number,
    emissionsT: number,
    provider?: string | null,
    createdAt?: string | null,
    receiptKey?: string | null,
    receiptUploadedAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateElectricityRecordMutationVariables = {
  input: UpdateElectricityRecordInput,
  condition?: ModelElectricityRecordConditionInput | null,
};

export type UpdateElectricityRecordMutation = {
  updateElectricityRecord?:  {
    __typename: "ElectricityRecord",
    id: string,
    year: number,
    month: string,
    kwh: number,
    emissionsT: number,
    provider?: string | null,
    createdAt?: string | null,
    receiptKey?: string | null,
    receiptUploadedAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteElectricityRecordMutationVariables = {
  input: DeleteElectricityRecordInput,
  condition?: ModelElectricityRecordConditionInput | null,
};

export type DeleteElectricityRecordMutation = {
  deleteElectricityRecord?:  {
    __typename: "ElectricityRecord",
    id: string,
    year: number,
    month: string,
    kwh: number,
    emissionsT: number,
    provider?: string | null,
    createdAt?: string | null,
    receiptKey?: string | null,
    receiptUploadedAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateWaterRecordMutationVariables = {
  input: CreateWaterRecordInput,
  condition?: ModelWaterRecordConditionInput | null,
};

export type CreateWaterRecordMutation = {
  createWaterRecord?:  {
    __typename: "WaterRecord",
    id: string,
    year: number,
    month: string,
    volume: number,
    provider?: string | null,
    createdAt?: string | null,
    receiptKey?: string | null,
    receiptUploadedAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateWaterRecordMutationVariables = {
  input: UpdateWaterRecordInput,
  condition?: ModelWaterRecordConditionInput | null,
};

export type UpdateWaterRecordMutation = {
  updateWaterRecord?:  {
    __typename: "WaterRecord",
    id: string,
    year: number,
    month: string,
    volume: number,
    provider?: string | null,
    createdAt?: string | null,
    receiptKey?: string | null,
    receiptUploadedAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteWaterRecordMutationVariables = {
  input: DeleteWaterRecordInput,
  condition?: ModelWaterRecordConditionInput | null,
};

export type DeleteWaterRecordMutation = {
  deleteWaterRecord?:  {
    __typename: "WaterRecord",
    id: string,
    year: number,
    month: string,
    volume: number,
    provider?: string | null,
    createdAt?: string | null,
    receiptKey?: string | null,
    receiptUploadedAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetElectricityRecordQueryVariables = {
  id: string,
};

export type GetElectricityRecordQuery = {
  getElectricityRecord?:  {
    __typename: "ElectricityRecord",
    id: string,
    year: number,
    month: string,
    kwh: number,
    emissionsT: number,
    provider?: string | null,
    createdAt?: string | null,
    receiptKey?: string | null,
    receiptUploadedAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListElectricityRecordsQueryVariables = {
  filter?: ModelElectricityRecordFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListElectricityRecordsQuery = {
  listElectricityRecords?:  {
    __typename: "ModelElectricityRecordConnection",
    items:  Array< {
      __typename: "ElectricityRecord",
      id: string,
      year: number,
      month: string,
      kwh: number,
      emissionsT: number,
      provider?: string | null,
      createdAt?: string | null,
      receiptKey?: string | null,
      receiptUploadedAt?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetWaterRecordQueryVariables = {
  id: string,
};

export type GetWaterRecordQuery = {
  getWaterRecord?:  {
    __typename: "WaterRecord",
    id: string,
    year: number,
    month: string,
    volume: number,
    provider?: string | null,
    createdAt?: string | null,
    receiptKey?: string | null,
    receiptUploadedAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListWaterRecordsQueryVariables = {
  filter?: ModelWaterRecordFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListWaterRecordsQuery = {
  listWaterRecords?:  {
    __typename: "ModelWaterRecordConnection",
    items:  Array< {
      __typename: "WaterRecord",
      id: string,
      year: number,
      month: string,
      volume: number,
      provider?: string | null,
      createdAt?: string | null,
      receiptKey?: string | null,
      receiptUploadedAt?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateElectricityRecordSubscriptionVariables = {
  filter?: ModelSubscriptionElectricityRecordFilterInput | null,
  owner?: string | null,
};

export type OnCreateElectricityRecordSubscription = {
  onCreateElectricityRecord?:  {
    __typename: "ElectricityRecord",
    id: string,
    year: number,
    month: string,
    kwh: number,
    emissionsT: number,
    provider?: string | null,
    createdAt?: string | null,
    receiptKey?: string | null,
    receiptUploadedAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateElectricityRecordSubscriptionVariables = {
  filter?: ModelSubscriptionElectricityRecordFilterInput | null,
  owner?: string | null,
};

export type OnUpdateElectricityRecordSubscription = {
  onUpdateElectricityRecord?:  {
    __typename: "ElectricityRecord",
    id: string,
    year: number,
    month: string,
    kwh: number,
    emissionsT: number,
    provider?: string | null,
    createdAt?: string | null,
    receiptKey?: string | null,
    receiptUploadedAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteElectricityRecordSubscriptionVariables = {
  filter?: ModelSubscriptionElectricityRecordFilterInput | null,
  owner?: string | null,
};

export type OnDeleteElectricityRecordSubscription = {
  onDeleteElectricityRecord?:  {
    __typename: "ElectricityRecord",
    id: string,
    year: number,
    month: string,
    kwh: number,
    emissionsT: number,
    provider?: string | null,
    createdAt?: string | null,
    receiptKey?: string | null,
    receiptUploadedAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateWaterRecordSubscriptionVariables = {
  filter?: ModelSubscriptionWaterRecordFilterInput | null,
  owner?: string | null,
};

export type OnCreateWaterRecordSubscription = {
  onCreateWaterRecord?:  {
    __typename: "WaterRecord",
    id: string,
    year: number,
    month: string,
    volume: number,
    provider?: string | null,
    createdAt?: string | null,
    receiptKey?: string | null,
    receiptUploadedAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateWaterRecordSubscriptionVariables = {
  filter?: ModelSubscriptionWaterRecordFilterInput | null,
  owner?: string | null,
};

export type OnUpdateWaterRecordSubscription = {
  onUpdateWaterRecord?:  {
    __typename: "WaterRecord",
    id: string,
    year: number,
    month: string,
    volume: number,
    provider?: string | null,
    createdAt?: string | null,
    receiptKey?: string | null,
    receiptUploadedAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteWaterRecordSubscriptionVariables = {
  filter?: ModelSubscriptionWaterRecordFilterInput | null,
  owner?: string | null,
};

export type OnDeleteWaterRecordSubscription = {
  onDeleteWaterRecord?:  {
    __typename: "WaterRecord",
    id: string,
    year: number,
    month: string,
    volume: number,
    provider?: string | null,
    createdAt?: string | null,
    receiptKey?: string | null,
    receiptUploadedAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
