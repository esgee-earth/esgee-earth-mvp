import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "aws-amplify/auth";

import {
  createElectricityRecord,
  deleteElectricityRecord,
} from "../graphql/mutations";

import { listElectricityRecords } from "../graphql/queries";

const client = generateClient();

// CREATE
export const addElectricityRecord = async (data: any) => {
  const user = await getCurrentUser();

  return await client.graphql({
    query: createElectricityRecord,
    variables: {
      input: {
        ...data,
        userId: user.userId,
      },
    },
  });
};

// READ
export const fetchElectricityRecords = async () => {
  const user = await getCurrentUser();

  const res: any = await client.graphql({
    query: listElectricityRecords,
    variables: {
      filter: {
        userId: { eq: user.userId },
      },
    },
  });

  return res.data.listElectricityRecords.items;
};

// DELETE
export const removeElectricityRecord = async (id: string) => {
  return await client.graphql({
    query: deleteElectricityRecord,
    variables: {
      input: { id },
    },
  });
};
