/* eslint-disable no-lonely-if */
/* eslint-disable consistent-return */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const sql = require('mssql');
const config = require('./config');

const createHateoasLinks = (req, records, hateoas) => {
  const recordset = records.recordset.map((record) => {
    record.links = {};

    hateoas.forEach((link) => {
      record.links[link.property.toLowerCase() === 'id' ? 'self' : link.property.toLowerCase()] = `http://${req.headers.host}/api/${link.endpoint}/${record[link.property]}`;
    });

    return record;
  });

  return recordset;
};

const createSqlParameters = (req, res, checkHasId, ...bodyProperties) => {
  try {
    let hasAllBodyProperties = false;
    let id = '';

    if (req.method === 'PUT' && req.params.hasOwnProperty('Id') && req.params.Id > 0) {
      id = `${req.params.Id},`;
    } else if (req.method === 'DELETE' && req.params.hasOwnProperty('Id') && req.params.Id > 0) {
      id = `${req.params.Id}`;
    }

    let sqlParameters = '';

    if (checkHasId) {
      sqlParameters = `${id} `;
    }

    bodyProperties.forEach((prop) => {
      let hasProperty = false;
      let value = null;

      if (typeof prop === 'string') {
        hasProperty = req.body.hasOwnProperty(prop);
        hasAllBodyProperties = hasAllBodyProperties || hasProperty;
        value = req.body[prop];
      } else if (typeof prop === 'object') {
        const propertyName = Object.getOwnPropertyNames(prop)[0];
        hasProperty = req.body.hasOwnProperty(propertyName);
        if (hasProperty) {
          hasAllBodyProperties = hasAllBodyProperties || hasProperty;
          value = req.body[propertyName];
        } else {
          value = prop[propertyName];
        }
      }

      if (checkHasId) {
        if (typeof value === 'string') {
          sqlParameters += `'${value}',`;
        } else if (typeof value === 'number') {
          sqlParameters += `${value},`;
        } else if (typeof value === 'boolean') {
          sqlParameters += value ? '1,' : '0,';
        }
      } else {
        if (typeof prop === 'string') {
          sqlParameters += `'${prop}',`;
        } else if (typeof prop === 'number') {
          sqlParameters += `${prop},`;
        } else if (typeof prop === 'boolean') {
          sqlParameters += prop ? '1,' : '0,';
        }
      }
    });

    if (checkHasId) {
      if (!hasAllBodyProperties && bodyProperties.length > 0) {
        res.sqlError = 'Missing or erroneous properties.';
        res.status(400);
        return;
      }
    }

    res.sqlParameters = sqlParameters.substring(0, sqlParameters.length - 1);
    res.status(201);
  } catch (err) {
    res.sqlError = 'Missing or erroneous properties.';
    res.status(500);
  }
};

const jsonKeysToLowerCase = (record) => {
  const test = Object.fromEntries(Object.entries(record).map(([k, v]) => {
    const camelCaseVariable = [k[0].toLowerCase() + k.substring(1), v];
    return camelCaseVariable;
  }));
  return test;
};

const get = async (req, res, endpoint, containsIdAndAtleastOneParam, hateoas = [], ...params) => {
  try {
    let parameters = '';
    let query = '';

    if (containsIdAndAtleastOneParam) {
      params.forEach((param) => {
        parameters += `, ${param}`;
      });

      query = req.params.Id > 0
        ? `EXEC Get${endpoint} ${req.params.Id}${parameters}`
        : `EXEC Get${endpoint}s ${parameters.length < 2 ? '' : parameters.substr(2)}`;
    } else {
      Object.keys(req.params).forEach((param) => {
        parameters += `${req.params[param]},`;
      });
      parameters = parameters.substring(0, parameters.length - 1);
      query = Object.keys(req.params).length > 1
        ? `EXEC Get${endpoint} ${parameters}`
        : `EXEC Get${endpoint}s ${parameters}`;
    }

    await sql.connect(config);
    const result = await sql.query(query);

    if (result.recordset !== undefined) {
      if (result.recordset.length === 0) {
        res.status(404);
        return result;
      }
    }

    hateoas.push({
      property: 'Id',
      endpoint: `${endpoint}s`,
    });

    let records = '';

    if (result.recordset !== undefined) {
      records = createHateoasLinks(req, result, hateoas);

      return req.params.Id > 0 ? records[0] : records;
    }

    return 'Operation Successful';
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const modify = async (req, res, sp, checkHasId, ...bodyProperties) => {
  try {
    createSqlParameters(req, res, checkHasId, ...bodyProperties);
    if (res.sqlError) {
      return res.send(res.sqlError);
    }

    await sql.connect(config);
    const result = await sql.query(`Exec ${sp} ${res.sqlParameters}`);

    if (req.method === 'PUT' || req.method === 'DELETE') {
      res.status(204);
      return res.send(req.method === 'PUT' ? 'Update successful.' : 'Deleted successfully.');
    }

    // Endast POST
    res.status(201);

    if (checkHasId && req.method === 'GET') {
      return res.json(jsonKeysToLowerCase(result.recordset[0]));
    }

    return res.json({
      result: 'Posted successfully.',
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  get,
  createHateoasLinks,
  createSqlParameters,
  jsonKeysToLowerCase,
  modify,
};
