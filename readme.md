# RESTful API with NodeJS MySQL JWT



===========================================================================

Task:
Kérlek írj egy RESTful API-t Node.js és Express felhasználásával, hogy egy to-do listát tudj managelni.

A Kódhoz tartozzon futtatható állomány, mely a dependenciák kezelésére szolgál

Az APInak képesnek kell lennie:

    ✓ Regisztráció

    ✓ Login

    ✓ Task létrehozására

    ✓ Összes Task listázása
    ✓ User összes Task-jának listázása

    ✓ Egy Task frissítése

    ✓ Egy Task törlése

A task-okat tárold adatbázisban.

Bónusz:
egyszerű (basic) authentikációt implementálj.

===========================================================================

## Installation

```bash
1) npm install
2) import the DB from the MySQL_schema folder
3) change the ./nodemon.json variables to yours
```

## Usage


```bash
npm start
```

RESTful api single endpoint: /

```
---------------------------------------------------------

PUT - Create user
{
	"email": "AAA@BBB.com",
	"password": "süni",
	"username": "MrJack"
}

---------------------------------------------------------

POST - Login
{
	"email": "asd@asd.com",
    "password": "asd"
}

---------------------------------------------------------

PATCH - Create a task
{   "ACTION_TYPE": "TASK_CREATE",
    "payload": {
		"taskName": "This is the task to perform."
    }
}

---------------------------------------------------------

PATCH - List all tasks
{   "ACTION_TYPE": "TASK_LIST_ALL"
}

---------------------------------------------------------

PATCH - List all owned tasks
{   "ACTION_TYPE": "TASK_LIST_OWNED"
}

---------------------------------------------------------

PATCH - Update a task
{   "ACTION_TYPE": "TASK_UPDATE",
    "payload": {
		"ID": 3,
		"taskName": "Updated task",
		"isFinished": true
	}
}

---------------------------------------------------------

PATCH - Delete a task
{   "ACTION_TYPE": "TASK_DELETE",
    "payload": {
		"ID": 3
	}
}

---------------------------------------------------------



```

## License

created by Norbert Bódi, MIT](https://choosealicense.com/licenses/mit/)
