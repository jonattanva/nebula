export type Entity = {
    key: string;
};

export interface Connection<T extends Entity> {
    set(store: string, value: T): void;
    select(): void;
}

export type Range =
    | {
          readonly index: string;
          readonly range: IDBKeyRange;
      }
    | IDBKeyRange;

export type Query = {
    range?: Range;
    count?: number;
};
