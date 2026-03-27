import { generateClient } from "aws-amplify/api";

// ========================
// MUTATIONS
// ========================
import {
  createElectricityRecord,
  deleteElectricityRecord as deleteElectricityMutation,
  createWaterRecord,
  deleteWaterRecord as deleteWaterMutation,
} from "../src/graphql/mutations";

// ========================
// QUERIES
// ========================
import {
  listElectricityRecords,
  listWaterRecords,
} from "../src/graphql/queries";

const client = generateClient();

// ========================
// ELECTRICITY
// ========================

// CREATE
export const addElectricityRecord = async (data: {
  year: number;
  month: string;
  kwh: number;
  emissionsT: number;
  provider: string;
  receiptKey?: string | null;
  receiptUploadedAt?: string | null;
}) => {
  return await client.graphql({
    query: createElectricityRecord,
    variables: { input: { ...data } },
    authMode: "userPool",
  });
};

// READ
export const fetchElectricityRecords = async () => {
  const res: any = await client.graphql({
    query: listElectricityRecords,
    authMode: "userPool",
  });

  return res.data.listElectricityRecords.items;
};

// DELETE
export const deleteElectricityRecord = async (id: string) => {
  return await client.graphql({
    query: deleteElectricityMutation,
    variables: { input: { id } },
    authMode: "userPool",
  });
};

// ========================
// WATER
// ========================

// CREATE
export const addWaterRecord = async (data: {
  year: number;
  month: string;
  volume: number;
  provider?: string;
  receiptKey?: string | null;
  receiptUploadedAt?: string | null;
}) => {
  return await client.graphql({
    query: createWaterRecord,
    variables: { input: { ...data } },
    authMode: "userPool",
  });
};

// READ
export const fetchWaterRecords = async () => {
  const res: any = await client.graphql({
    query: listWaterRecords,
    authMode: "userPool",
  });

  return res.data.listWaterRecords.items;
};

// DELETE
export const deleteWaterRecord = async (id: string) => {
  return await client.graphql({
    query: deleteWaterMutation,
    variables: { input: { id } },
    authMode: "userPool",
  });
};
