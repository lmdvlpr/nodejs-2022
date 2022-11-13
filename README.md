# A simple Node.js API

This is a project based on a [YouTube Video from Rocketseat channel](https://youtu.be/fm4_EuCsQwg), where the teacher [Dani Leão](https://github.com/danileao) teach us how to create a simple API with Node.js

The project don't use a database like **MySQL**, **PostgreSQL** or **MongoDB**, it only save the information in an array and then save into a file called _"products.json"_ - you can find this file on main folder.

Maybe, in the future, I will implement a better solution for saving data in a database, but for now I will just leave the existing code.

## How do I test?

- Download or clone this repository
- Run **yarn** or **npm install**
- After installing all the packages, run: **yarn dev** or **npm run dev**

After that, you can access the base URL: http://localhost:4002, or whatever you configure at **app.js**

Open you favorite tool for dealing with HTTP requests (there are many options, like: Insomnia, Postman, Thunder Client, REST Client, etc...)

Put the base URL, choose the headers for you requests: 'Content-Type: application/json'

In the body of your request, you can write:

```json
"name": "The Silmarillion",
"price": 32.49,
"category": "Book"
```

PS: the code above is only a example, feel free to modify the content if you want.

So, this is it!

Feel free to contribute (if you want 🙂).
