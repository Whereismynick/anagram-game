import Joi from "joi";

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
})

export const registerSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.base": "Имя пользователя должно быть строкой",
      "string.empty": "Имя пользователя не может быть пустым",
      "string.min": "Имя пользователя должно быть минимум 3 символа",
      "string.max": "Имя пользователя должно быть максимум 30 символов",
      "string.alphanum": "Имя пользователя может содержать только буквы и цифры",
      "any.required": "Имя пользователя обязательно"
    }),
  password: Joi.string()
    .min(6)
    .max(50)
    .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*()_+=-]+$"))
    .required()
    .messages({
      "string.base": "Пароль должен быть строкой",
      "string.empty": "Пароль не может быть пустым",
      "string.min": "Пароль должен быть минимум 6 символов",
      "string.max": "Пароль должен быть максимум 50 символов",
      "string.pattern.base": "Пароль содержит недопустимые символы",
      "any.required": "Пароль обязателен"
    })
});