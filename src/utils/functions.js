
const formidable = require('formidable');

/**
 * function to return an error object
 *
 * @param {String} errorMessage message to the error
 * @param {Number} statusCode status for the error
 * @returns {Error} object with the informationof the error
 */
const returnError = (errorMessage, statusCode = 500) => {
  const error = new Error(errorMessage);
  error.status = statusCode;
  return error;
};

/**
 * Function to get the no present keys in a object
 * @param {string[]} keys keys to evaluate in the object
 * @param {Object} object object to evaluate
 * @param {int} object way to evaluate the object
 * @returns {string[]} array with the missing keys
 */
const getMissingKeys = (keys, object, way = 0) => {
  // validate the way to evaluate the object
  if (way === 0) {
    const array = keys.map(element => {
      const hasOwnProperty = Object.prototype.hasOwnProperty.call(object, element);
      if (!hasOwnProperty) {
        return element;
      }

      return null;
    })
      .filter(element => element !== null);
    return array;
  }

  const array = [];
  for (const key of keys) {
    if (!object[key]) {
      array.push(key);
    }
  }
  return array;
};

/**
 * Function to get the value of param
 * @param {string[]} parameters Parameters object got
 */
const findParameter = (parameters) => {
  return (name) => {
    const param = parameters.reduce((prev, param) => param.name === name ? param : prev, {});
    if (Object.keys(param).length) {
      return param;
    } else {
      throw new Error(`The parameter with the name ${name}, doesn't have a value or not exist`);
    }
  };
};

/**
 * function to get the __data object from a PersitedModel instance
 *
 * @param {PresistedModel} object a PersistedModel object
 * @returns {object} a __data object representation
 */
const getDataObject = object => {
  let newObject;
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const element = object[key];
      if (key === '__data') {
        newObject = element;
      }
    }
  }
  return newObject;
};

/**
 * function to get a UID
 *
 * @param {*} [a=undefined]
 * @returns {string} the uid
 */
const getUID = (a = undefined) => {
  return a
    ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, getUID);
};

/**
 * Funcion para optener el archivo de una petición
 *
 * @param {Request} req
 * @returns {Promise}
 */
const getFormData = req => {
  return new Promise((resolve, reject) => {
    if (!req.headers['content-type']) {
      return reject(new Error(`can't get the content-type header`));
    }
    const contentTypeHeader = req.headers['content-type'].split(';')[0];
    // console.log('contentTypeHeader', contentTypeHeader);

    if (!['multipart/form-data'].includes(contentTypeHeader)) {
      return reject(new Error(`can't get the multipart/form-data in content-type header`));
    }

    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (Object.keys(req.body).length) return resolve(undefined);
      if (err) return reject(err);

      if (!Object.keys(fields).length && !Object.keys(files).length) return resolve(undefined);

      const fieldsToReturn = {};
      for (const key in fields) {
        fieldsToReturn[key] = fields[key];
      }

      const filesToReturn = {};
      for (const key in files) {
        filesToReturn[key] = files[key];
      }

      const response = {
        fields: fieldsToReturn,
        files: filesToReturn
      };
      return resolve(response);
    });
  });
};

const generateRange = array => {
  const range = {
    array: array,
    [Symbol.iterator] () {
      return this.generator();
    },
    // eslint-disable-next-line func-names
    generator: function * () {
      let i = 0;
      while (i < array.length) {
        yield array[i];
        i += 1;
      }
    }
  };

  return range;
};

/**
 * function to get the currency format
 *
 * @param {number} [value=0]
 * @param {string} [localeCode='en-US']
 * @param {string} [currencyCode='USD']
 * @returns {string} formated number
 */
const getCurrencyFormat = (value = 0, localeCode = 'en-US', currencyCode = 'USD') => {
  const formatter = new Intl.NumberFormat(localeCode, { style: 'currency', currency: currencyCode });
  return formatter.format(value);
};

/**
 *
 *
 * @param {object} object
 * @param {string} path
 * @param {string[]} keysToParse
 */
const getFromObjectPath = (object, path, keysToParse = []) => {
  const attributes = path.split('.');

  let value = { ...object };

  // iterate the atrributes
  for (let index = 0; index < attributes.length; index++) {
    const key = attributes[index];
    // check
    if (!value[key]) {
      // elaborate the message
      const joinedAttributes = attributes.slice(0, index + 1).join('.');
      const message = `can't get ${joinedAttributes} from object param.`;
      throw new Error(message);
    }
    // this is cuz filter from req come as string
    if (keysToParse.includes(key)) {
      // value[key] = JSON.parse(value[key]);
      // console.log('value[key]', value[key]);
      value = { [key]: JSON.parse(value[key]) };
    }
    value = value[key];
  }

  return value;
};

/**
 * function to get the index of the object array
 *
 * @param {object[]} myArray
 * @param {string} propertyToCheck
 * @param {string} valueToCheck
 * @returns
 */
const getIndexOfObjectArray = (myArray, propertyToCheck, valueToCheck) => {
  // console.log('myArray', myArray);
  // console.log('valueToCheck', valueToCheck);
  // console.log('map', myArray.map(item => item[propertyToCheck]));
  const index = myArray.map(item => item[propertyToCheck]).indexOf(valueToCheck);
  // console.log('index in', index);
  return index;
};

/**
 * function to generate a random chain of numbers
 *
 * @param {number} size size of the chain
 * @returns {string} chain of numbers
 */
const generateRandomChainOfNumbers = size => {
  const charset = '0123456789';
  let pass = '';
  while (size--) {
    pass += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return pass;
};

module.exports = {
  returnError,
  getMissingKeys,
  findParameter,
  getDataObject,
  getUID,
  getFormData,
  generateRange,
  getCurrencyFormat,
  getFromObjectPath,
  getIndexOfObjectArray,
  generateRandomChainOfNumbers
};
