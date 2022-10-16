declare module "*.svg" {
  const content: any;
  export default content;
}

export type Debounce<A> = A & { clear(): void } & { flush(): void };