"use client";

import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";

Amplify.configure({
  ...awsExports,
  API: {
    GraphQL: {
      defaultAuthMode: "userPool", // 🔥 THIS IS THE KEY
    },
  },
});
