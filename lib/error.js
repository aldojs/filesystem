
'use strict'


exports.FileSystemError = class extends Error {
  /**
   * 
   * @param {string} message 
   * @param {string} filename 
   * @param {Error} previousError 
   */
  constructor (message, filename, previousError) {
    super(message)

    this.filename = filename
    this.previous = previousError
  }
}

/**
 * 
 * @param {string} filename 
 * @param {Error} previousError 
 */
exports.createReadFileError = function (filename, previousError) {
  return new FileSystemError(`Error occured while trying to read the file "${filename}"`, filename, previousError)
}

/**
 * 
 * @param {string} filename 
 * @param {Error} previousError 
 */
exports.createRemoveFileError = function (filename, previousError) {
  return new FileSystemError(`Error occured while trying to remove the file "${filename}"`, filename, previousError)
}

/**
 * 
 * @param {string} filename 
 * @param {Error} previousError 
 */
exports.createWriteFileError = function (filename, previousError) {
  return new FileSystemError(`Error occured while trying to write the file "${filename}"`, filename, previousError)
}
