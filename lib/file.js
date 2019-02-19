
'use strict'


exports.File = class {
  /**
   * 
   * @param {Drive} drive 
   * @param {string} filename 
   * @param {Object} metadata 
   */
  constructor (drive, filename, metadata) {
    this._drive = drive
    this._name = filename
    this._metadata = metadata
  }

  /**
   * Get the file name
   */
  get name () {
    return this._name
  }

  /**
   * Get the file info
   */
  get info () {
    return this._metadata
  }

  /**
   * Read the file content
   * 
   * @param {Object} [options] 
   * @public
   * @async
   */
  read (options = {}) {
    return this._drive.read(this._name, options)
  }

  /**
   * Remove the file
   * 
   * @param {Object} [options] 
   * @public
   * @async
   */
  remove (options = {}) {
    return this._drive.remove(this._name, options)
  }

  /**
   * Get a readable stream of the content.
   * 
   * @param {Object} [options] 
   * @public
   */
  createReadStream (options = {}) {
    return this._drive.createReadStream(this.name, options)
  }

  /**
   * Copy the file to a another drive.
   * 
   * @param {Drive} destination 
   * @param {Object} [options] 
   * @public
   * @async
   */
  copyTo (destination, options = {}) {
    return this._drive.copy(this.name, destination, options)
  }

  /**
   * Move the file to a another drive.
   * 
   * @param {Drive} destination 
   * @param {Object} [options] 
   * @public
   * @async
   */
  moveTo (destination, options = {}) {
    return this._drive.move(this.name, destination, options)
  }
}
