const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const idlength = 8;

/**
 *  @swagger
 *  tags:
 *    name: Auth
 *    description: API авторизации.
 */

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Auth:
 *        type: object
 *        required:
 *          - email
 *          - password
 *          - app
 *        properties:
 *          id:
 *            type: string
 *            description: Автоматический сгенерированный ID
 *          email:
 *            type: string
 *            description: Логин
 *          password:
 *            type: string
 *            description: Пароль
 *          app:
 *            type: string
 *            description: Тип приложения (admin, client)
 *        example:
 *           id: g8hj_fr4
 *           email: test@mail.ru
 *           password: qwerty12345
 *           app: admin
 */

/**
 * @swagger
 * /authorization:
 *   get:
 *     tags: [Authorization]
 *     Summary: Показать все авторизации
 *     responses:
 *       200:
 *         description: Список авторизованных пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Auth'
 *
 */
router.get("/", (req, res) => {
  const auth = req.app.db.get("authorization");
  res.send(auth);
});

/**
 * @swagger
 * /authorization:
 *   post:
 *     tags: [Authorization]
 *     description: Авторизоваться
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: Авторизация выполнена!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auth'
 *       500:
 *         description: Ошибка на сервере
 *
 */
router.post("/", (req, res) => {
  try {
    const {
      email,
      password,
      app
    } = req.body;

    const newAuth = {
      id: nanoid(idlength),
      email,
      password,
      app
    };

    req.app.db.get("authorization").push(newAuth).write();

    return res.send(newAuth);
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;