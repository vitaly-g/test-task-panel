const authController = require('./controllers/auth');
const orderController = require('./controllers/order');
const userController = require('./controllers/user');

const authMiddleware = require('./middlewares/auth');

module.exports.set = (app) => {
  // Открытые роуты
  app.post('/login', authController.login);
  app.post('/register', authController.register);

  // Закрытые роуты
  app.get('/orders/:id', authMiddleware.checkAuth, orderController.getOrder); // Получить детали задачи
  app.post('/orders', authMiddleware.checkAuth, orderController.addOrder); // Добавить задачу
  app.put('/orders/:id', authMiddleware.checkAuth, orderController.changeOrder);	// Изменить задачу
  app.delete('/orders/:id', authMiddleware.checkAuth, orderController.deleteOrder); // Удалить задачу

  app.get('/user/orders', authMiddleware.checkAuth, userController.getAppointedOrders); // Получить назначенные пользователю задачи
  app.get('/user/my-orders', authMiddleware.checkAuth, userController.getMyOrders); // Получить созданные пользователем задачи
}
