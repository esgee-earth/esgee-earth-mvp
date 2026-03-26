import { generateClient } from "aws-amplify/api";

import {
  createElectricityRecord,
  deleteElectricityRecord as deleteMutation,
} from "../src/graphql/mutations";

import {
  listElectricityRecords,
} from "../src/graphql/queries";

const client = generateClient();

// ✅ CREATE
export const addElectricityRecord = async (data: {
  year: number;
  month: string;
  kwh: number;
  emissionsT: number;
  provider: string;
}) => {
  return await client.graphql({
    query: createElectricityRecord,
    variables: {
      input: { ...data },
    },
    authMode: "userPool", // 🔥 REQUIRED HERE
  });
};

// ✅ READ
export const fetchElectricityRecords = async () => {
  const res: any = await client.graphql({
    query: listElectricityRecords,
    authMode: "userPool", // 🔥 REQUIRED HERE
  });

  return res.data.listElectricityRecords.items;
};

// ✅ DELETE
export const deleteElectricityRecord = async (id: string) => {
  return await client.graphql({
    query: deleteMutation,
    variables: {
      input: { id },
    },
    authMode: "userPool", // 🔥 REQUIRED HERE
  });
};
