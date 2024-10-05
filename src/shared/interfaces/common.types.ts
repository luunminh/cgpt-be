export type DateRange = {
  from: Date | null;
  to: Date | null;
};

export class KeyAndTitlePair<K> {
  key: K;
  title: string;
}

export type PrismaFunctionResponse<T extends (...args: any) => Promise<any>> =
  Awaited<ReturnType<T>>;
