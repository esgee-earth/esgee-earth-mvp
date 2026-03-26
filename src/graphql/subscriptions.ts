/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateElectricityRecord = /* GraphQL */ `subscription OnCreateElectricityRecord(
  $filter: ModelSubscriptionElectricityRecordFilterInput
  $owner: String
) {
  onCreateElectricityRecord(filter: $filter, owner: $owner) {
    id
    year
    month
    kwh
    emissionsT
    provider
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateElectricityRecordSubscriptionVariables,
  APITypes.OnCreateElectricityRecordSubscription
>;
export const onUpdateElectricityRecord = /* GraphQL */ `subscription OnUpdateElectricityRecord(
  $filter: ModelSubscriptionElectricityRecordFilterInput
  $owner: String
) {
  onUpdateElectricityRecord(filter: $filter, owner: $owner) {
    id
    year
    month
    kwh
    emissionsT
    provider
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateElectricityRecordSubscriptionVariables,
  APITypes.OnUpdateElectricityRecordSubscription
>;
export const onDeleteElectricityRecord = /* GraphQL */ `subscription OnDeleteElectricityRecord(
  $filter: ModelSubscriptionElectricityRecordFilterInput
  $owner: String
) {
  onDeleteElectricityRecord(filter: $filter, owner: $owner) {
    id
    year
    month
    kwh
    emissionsT
    provider
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteElectricityRecordSubscriptionVariables,
  APITypes.OnDeleteElectricityRecordSubscription
>;
export const onCreateWaterRecord = /* GraphQL */ `subscription OnCreateWaterRecord(
  $filter: ModelSubscriptionWaterRecordFilterInput
  $owner: String
) {
  onCreateWaterRecord(filter: $filter, owner: $owner) {
    id
    year
    month
    volume
    provider
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateWaterRecordSubscriptionVariables,
  APITypes.OnCreateWaterRecordSubscription
>;
export const onUpdateWaterRecord = /* GraphQL */ `subscription OnUpdateWaterRecord(
  $filter: ModelSubscriptionWaterRecordFilterInput
  $owner: String
) {
  onUpdateWaterRecord(filter: $filter, owner: $owner) {
    id
    year
    month
    volume
    provider
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateWaterRecordSubscriptionVariables,
  APITypes.OnUpdateWaterRecordSubscription
>;
export const onDeleteWaterRecord = /* GraphQL */ `subscription OnDeleteWaterRecord(
  $filter: ModelSubscriptionWaterRecordFilterInput
  $owner: String
) {
  onDeleteWaterRecord(filter: $filter, owner: $owner) {
    id
    year
    month
    volume
    provider
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteWaterRecordSubscriptionVariables,
  APITypes.OnDeleteWaterRecordSubscription
>;
