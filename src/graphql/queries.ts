/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getElectricityRecord = /* GraphQL */ `query GetElectricityRecord($id: ID!) {
  getElectricityRecord(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetElectricityRecordQueryVariables,
  APITypes.GetElectricityRecordQuery
>;
export const listElectricityRecords = /* GraphQL */ `query ListElectricityRecords(
  $filter: ModelElectricityRecordFilterInput
  $limit: Int
  $nextToken: String
) {
  listElectricityRecords(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListElectricityRecordsQueryVariables,
  APITypes.ListElectricityRecordsQuery
>;
export const getWaterRecord = /* GraphQL */ `query GetWaterRecord($id: ID!) {
  getWaterRecord(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetWaterRecordQueryVariables,
  APITypes.GetWaterRecordQuery
>;
export const listWaterRecords = /* GraphQL */ `query ListWaterRecords(
  $filter: ModelWaterRecordFilterInput
  $limit: Int
  $nextToken: String
) {
  listWaterRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListWaterRecordsQueryVariables,
  APITypes.ListWaterRecordsQuery
>;
