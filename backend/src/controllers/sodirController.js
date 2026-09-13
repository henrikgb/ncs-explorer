const sodirService = require('../services/sodirServices');
const { fieldDtoToDomain, getFields } = sodirService;

async function listFields(req, res, next) {
  try {
    const rawFields = await getFields();
    res.status(200).json(rawFields.map((raw) => fieldDtoToDomain(raw)));
  } catch (err) { next(err); }
}

module.exports = { listFields };
