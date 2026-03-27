/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createElectricityRecord = /* GraphQL */ `mutation CreateElectricityRecord(
  $input: CreateElectricityRecordInput!
  $condition: ModelElectricityRecordConditionInput
) {
  createElectricityRecord(input: $input, condition: $condition) {
    id
    year
    month
    kwh
    emissionsT
    provider
    createdAt
    receiptKey
    receiptUploadedAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateElectricityRecordMutationVariables,
  APITypes.CreateElectricityRecordMutation
>;
export const updateElectricityRecord = /* GraphQL */ `mutation UpdateElectricityRecord(
  $input: UpdateElectricityRecordInput!
  $condition: ModelElectricityRecordConditionInput
) {
  updateElectricityRecord(input: $input, condition: $condition) {
    id
    year
    month
    kwh
    emissionsT
    provider
    createdAt
    receiptKey
    receiptUploadedAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateElectricityRecordMutationVariables,
  APITypes.UpdateElectricityRecordMutation
>;
export const deleteElectricityRecord = /* GraphQL */ `mutation DeleteElectricityRecord(
  $input: DeleteElectricityRecordInput!
  $condition: ModelElectricityRecordConditionInput
) {
  deleteElectricityRecord(input: $input, condition: $condition) {
    id
    year
    month
    kwh
    emissionsT
    provider
    createdAt
    receiptKey
    receiptUploadedAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteElectricityRecordMutationVariables,
  APITypes.DeleteElectricityRecordMutation
>;
export const createWaterRecord = /* GraphQL */ `mutation CreateWaterRecord(
  $input: CreateWaterRecordInput!
  $condition: ModelWaterRecordConditionInput
) {
  createWaterRecord(input: $input, condition: $condition) {
    id
    year
    month
    volume
    provider
    createdAt
    receiptKey
    receiptUploadedAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateWaterRecordMutationVariables,
  APITypes.CreateWaterRecordMutation
>;
export const updateWaterRecord = /* GraphQL */ `mutation UpdateWaterRecord(
  $input: UpdateWaterRecordInput!
  $condition: ModelWaterRecordConditionInput
) {
  updateWaterRecord(input: $input, condition: $condition) {
    id
    year
    month
    volume
    provider
    createdAt
    receiptKey
    receiptUploadedAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateWaterRecordMutationVariables,
  APITypes.UpdateWaterRecordMutation
>;
export const deleteWaterRecord = /* GraphQL */ `mutation DeleteWaterRecord(
  $input: DeleteWaterRecordInput!
  $condition: ModelWaterRecordConditionInput
) {
  deleteWaterRecord(input: $input, condition: $condition) {
    id
    year
    month
    volume
    provider
    createdAt
    receiptKey
    receiptUploadedAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteWaterRecordMutationVariables,
  APITypes.DeleteWaterRecordMutation
>;
