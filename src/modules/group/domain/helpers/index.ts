import { v4 as uuidv4 } from 'uuid';

export const generateGroupSlug = (groupName: string) => {
  const shortId = uuidv4().split('-')[0];
  return groupName
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .concat(`-${shortId}`);
};
