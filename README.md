# test-task-panel

API панели задач:
1. Авторизация: POST ('/login'), { login, password }. 
2. Регистрация: POST ('/register'), { login, password }. 
3. Получить детали задачи по идентификатору: GET ('/orders/id').
4. Добавить задачу: POST ('/orders'), { title, text, userIds }, где userIds - массив идентификаторов, назначенных на задачу пользователей (к примеру [22,23,25]). 
5. Изменить задачу: PUT ('/orders'), { title, text, userIds }, где userIds - массив идентификаторов, назначенных на задачу пользователей (к примеру [22,23,25]). 
6. Удалить задачу по идентификатору: DELETE ('/orders/id').
7. Получить назначенные на авторизованного пользователя задачи: GET ('/orders'). 
8. Получить созданные авторизованным пользователем задачи: GET ('/my-orders').
