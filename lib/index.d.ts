
// / <reference path="node" />

import { Stream, Readable } from 'stream'


export declare class Drive {
  /**
   * 
   * @param adapter 
   */
  constructor(adapter: Adapter);

  /**
   * Create a `File` instance for the given path.
   * 
   * @param path 
   * @param info 
   */
  createFile(path: string, info: FileInfo): File;

  /**
   * Get a file's metadata.
   * 
   * @param filename 
   * @param options 
   */
  readInfo(filename: string, options?: Options): Promise<File>;

  /**
   * Remove a file.
   * 
   * @param filename 
   * @param options 
   */
  remove(filename: string, options?: Options): Promise<any>;

  /**
   * Determine if a file exists.
   * 
   * @param filename 
   * @param options 
   */
  exists(filename: string, options?: Options): Promise<boolean>;

  /**
   * Create a read stream of a file.
   * 
   * @param filename 
   * @param options 
   */
  createReadStream(filename: string, options?: Options): Readable;

  /**
   * Read a file's content.
   * 
   * @param filename 
   * @param options 
   */
  read(filename: string, options?: ReadOptions): Promise<string | Buffer>;

  /**
   * Copy a file to another drive.
   * 
   * @param filename 
   * @param destination 
   * @param options 
   */
  copy(filename: string, destination: Drive, options?: CopyOptions): Promise<File>;

  /**
   * Move a file to another drive.
   * 
   * @param filename 
   * @param destination 
   * @param options 
   */
  move(filename: string, destination: Drive, options?: MoveOptions): Promise<File>;

  /**
   * Put or replace a file's content.
   * 
   * @param filename 
   * @param content 
   * @param options 
   */
  put(filename: string, content: string | Buffer | Stream, options?: WriteOptions): Promise<File>;

  /**
   * Write a file's content.
   * 
   * @param filename 
   * @param content 
   * @param options 
   */
  write(filename: string, content: string | Buffer | Stream, options?: WriteOptions): Promise<File>;
}

export declare class File {
  readonly name: string;
  readonly info: FileInfo;

  /**
   * 
   * @param drive 
   * @param path 
   * @param info 
   */
  constructor(drive: Drive, path: string, info: FileInfo);

  /**
   * Remove the file.
   * 
   * @param options 
   */
  remove(options?: Options): Promise<any>;

  /**
   * Get a readable stream of the content.
   * 
   * @param options 
   */
  createReadStream(options?: Options): Readable;

  /**
   * Read the file content.
   * 
   * @param options 
   */
  read(options?: ReadOptions): Promise<string | Buffer>;

  /**
   * Copy the file to a another drive.
   * 
   * @param destination 
   * @param options 
   */
  copyTo(destination: Drive, options?: CopyOptions): Promise<File>;

  /**
   * Move the file to a another drive.
   * 
   * @param destination 
   * @param options 
   */
  moveTo(destination: Drive, options?: MoveOptions): Promise<File>;
}

export declare class FileSystemError extends Error {
  /**
   * The previous error thrown.
   */
  previous: Error;

  /**
   * The file name.
   */
  filename: string;
}

export interface Adapter {
  remove(filename: string, options?: Options): Promise<any>;
  exists(filename: string, options?: Options): Promise<boolean>;
  createReadStream(filename: string, options?: Options): Readable;
  readInfo(filename: string, options?: Options): Promise<FileInfo>;
  read(filename: string, options?: ReadOptions): Promise<string | Buffer>;
  write(filename: string, content: string | Buffer | Stream, options?: WriteOptions): Promise<FileInfo>;
}

export interface FileInfo {
  size?: number;
  created?: number;
  modified?: number;
  mimeType?: string;

  [field: string]: any;
}

export interface Options {
  [field: string]: any;
}

export interface ReadOptions extends Options {
  encoding?: string;
}

export interface WriteOptions extends Options {
  encoding?: string;
  overwrite?: boolean;
}

export interface CopyOptions extends Options {
  rename?: string;
}

export interface MoveOptions extends Options {
  rename?: string;
}
