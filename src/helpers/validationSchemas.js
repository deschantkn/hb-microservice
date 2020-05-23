import Joi from '@hapi/joi';

const authSchema = Joi.object({
  username: Joi.any().required(),
  password: Joi.any().required(),
});

const jsonPatchSchema = Joi.object({
  json: Joi.required(),
  patch: Joi.required(),
});

const thumbnailSchema = Joi.object({
  imgUrl: Joi.string().required(),
});

export default {
  '/login': authSchema,
  '/patch': jsonPatchSchema,
  '/generate': thumbnailSchema,
};
