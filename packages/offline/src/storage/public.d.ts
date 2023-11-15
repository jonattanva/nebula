export type Entity = {
    $$key: string;
};

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

export interface Connection<T extends Entity> {
    save(store: string, value: T): Promise<T>;
    select(store: string, query: Query): Promise<T[]>;
}
