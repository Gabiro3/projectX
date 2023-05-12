import { type IssueCountType } from "./types";
import { type Issue as IssueType } from "@prisma/client";

export const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const getHeaders = () => {
  return {
    "Content-type": "application/json",
  };
};

export const moveItemWithinArray = (
  arr: unknown[],
  oldIndex: number,
  newIndex: number
) => {
  const arrClone = [...arr];
  arrClone.splice(newIndex, 0, arrClone.splice(oldIndex, 1)[0]);
  return arrClone;
};

export const insertItemIntoArray = (
  arr: unknown[],
  item: unknown,
  index: number
) => {
  // Snippet taken from https://github.com/oldboyxx/jira_clone
  const arrClone = [...arr];
  arrClone.splice(index, 0, item);
  return arrClone;
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const capitalizeMany = (str: string) => {
  return str
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
};

export const getIssueCountByStatus = (issues: IssueType[]) => {
  return issues.reduce(
    (acc, issue) => {
      acc[issue.status]++;
      return acc;
    },
    {
      TODO: 0,
      IN_PROGRESS: 0,
      DONE: 0,
    } as IssueCountType
  );
};

export const hexToRgba = (hex: string, opacity: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
