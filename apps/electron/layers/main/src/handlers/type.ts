export type IsomorphicHandler = (
  e: Electron.IpcMainInvokeEvent,
  ...args: any[]
) => Promise<any>;

export type NamespaceHandlers = {
  [key: string]: IsomorphicHandler;
};
