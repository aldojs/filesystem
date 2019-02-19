
'use strict'

const { File } = require('./file')
const { createReadFileError, createRemoveFileError, createWriteFileError } = require('./error')


exports.Drive = class {
  /**
   * 
   * @param {Object} adapter 
   */
  constructor (adapter) {
    this._adapter = adapter
  }

  /**
   * Create a `File` instance for the given path.
   * 
   * @param {string} path 
   * @param {Object} [metadata] 
   * @public
   */
  createFile (path, metadata = {}) {
    return new File(this, path, metadata)
  }

  /**
   * Read a file's content.
   * 
   * @param {string} filename 
   * @param {Object} [options] 
   * @public
   * @async
   */
  read (filename, options = {}) {
    return this._adapter.read(filename, options).catch((error) => {
      throw createReadFileError(filename, error)
    })
  }

  /**
   * Get a file's metadata.
   * 
   * @param {string} filename 
   * @param {Object} [options] 
   * @public
   * @async
   */
  get (filename, options = {}) {
    return this._adapter.get(filename, content, options)
      .then((metadata) => this.createFile(filename, metadata))
      .catch((error) => { throw createReadFileError(filename, error) })
  }

  /**
   * Determine if a file exists.
   * 
   * @param {string} filename 
   * @param {Object} [options] 
   * @public
   * @async
   */
  exists (filename, options = {}) {
    return this._adapter.exists(filename, options).catch((e) => {
      throw createReadFileError(filename, e)
    })
  }

  /**
   * Remove a file.
   * 
   * @param {string} filename 
   * @param {Object} [options] 
   * @public
   * @async
   */
  remove (filename, options = {}) {
    return this._adapter.remove(filename, options).catch((error) => {
      throw createRemoveFileError(filename, error)
    })
  }

  /**
   * Write a file's content.
   * 
   * @param {string} filename 
   * @param {string | Stream} content 
   * @param {Object} [options] 
   * @public
   * @async
   */
  write (filename, content, options = {}) {
    return this._adapter.write(filename, content, options)
      .then((metadata) => this.createFile(filename, metadata))
      .catch((error) => { throw createWriteFileError(filename, error) })
  }

  /**
   * Put or replace a file's content.
   * 
   * @param {string} filename 
   * @param {Object} options 
   * @public
   * @async
   */
  put (filename, options = {}) {
    return this.write(filename, { overwrite: true, ...options })
  }

  /**
   * Create a read stream of a file.
   * 
   * @param {string} filename 
   * @param {Object} [options] 
   * @public
   */
  createReadStream (filename, options = {}) {
    return this._adapter.createReadStream(filename, options)
  }

  /**
   * Copy a file to another drive.
   * 
   * @param {string} filename 
   * @param {Drive} destination 
   * @param {Object} [options] 
   * @public 
   * @async
   */
  copy (filename, destination, { rename = filename, ...options } = {}) {
    let content = this.createReadStream(filename, options)

    return destination.write(rename, content, options)
  }

  /**
   * Move a file to another drive.
   * 
   * @param {string} filename 
   * @param {Drive} destination 
   * @param {Object} [options] 
   * @public 
   * @async
   */
  async move (filename, destination, options = {}) {
    let file = await this.copy(filename, destination, options)

    await this.remove(filename, options)

    return file
  }
}
