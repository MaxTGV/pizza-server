const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const idlength = 8;

/**
 *  @swagger
 *  tags:
 *    name: Orders
 *    description: API заказов.
 */

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Order:
 *        type: object
 *        required:
 *          - ingredients
 *          - size
 *          - dough
 *          - sauces
 *          - price
 *          - address
 *          - name
 *          - card_number
 *          - payment
 *        properties:
 *          id:
 *            type: string
 *            description: Автоматический сгенерированный ID заказа
 *          ingredients:
 *            type: array
 *            items: string
 *            description: Массив с названиями топпингов
 *          size:
 *            type: string
 *            description: Размер пиццы
 *          dough:
 *            type: string
 *            description: Тип теста
 *          sauces:
 *            type: array
 *            items: string
 *            description: Массив с названиями соусов
 *          price:
 *            type: string
 *            description: Цена
 *          address:
 *            type: string
 *            description: Адрес заказа
 *          name:
 *            type: string
 *            description: Имя заказчика
 *          card_number:
 *            type: string
 *            description: Номер карты
 *          payment:
 *            type: string
 *            description: Платежная система
 *        example:
 *           id: d5fE_asz
 *           ingredients:
 *             - cucumber
 *             - salami
 *             - bacon
 *           sauces:
 *             - mayo
 *           size: 30
 *           dough: thick
 *           price: 319
 *           name: Ivan Ivanov
 *           card_number: 4444 4444 4444 4444
 *           address: Sesame Street
 *           payment: visa
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     tags: [Orders]
 *     Summary: Показать все заказы
 *     responses:
 *       200:
 *         description: Список заказов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *
 */
router.get("/", (req, res) => {
  const orders = req.app.db.get("orders");
  res.send(orders);
});

/**
 * @swagger
 * /orders:
 *   post:
 *     tags: [Orders]
 *     description: Создать новый заказ
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Заказ оформлен успешно
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Ошибка на сервере
 *
 */
router.post("/", (req, res) => {
  try {
    const {
      name,
      ingredients,
      size,
      dough,
      sauces,
      price,
      address,
      card_number,
      payment
    } = req.body;

    const newOrder = {
      id: nanoid(idlength),
      name,
      address,
      card_number,
      payment,
      size,
      dough,
      sauces,
      ingredients,
      price
    };

    req.app.db.get("orders").push(newOrder).write();

    return res.send(newOrder);
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;