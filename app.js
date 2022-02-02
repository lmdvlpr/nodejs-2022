// Import modules
import express from 'express'
import { randomUUID } from 'crypto'
import fs from 'fs'

// Server configuration
const app = express()
const port = process.env.PORT || 4002

// We need to configurate this middleware beacuse express need to identify the body of our requests, in this case, we use JSON, but express can work with so many others formats.
app.use(express.json())

// Array for saving our "produtcs"
let products = []
// This function read the "products file" and pass the data in it to the API
fs.readFile('products.json', 'utf-8', (err, data) => {
	if (err) {
		console.log(err)
	} else {
		products = JSON.parse(data)
	}
})

// HTTP methods for dealing with transactions in database or (in this case), in array.
/**
 * POST  => Insert a new data into the database or (in this case), in array;
 * GET => Search for a data in database or (in this case), in array;
 * PUT => Update a data in database or (in this case), in array;
 * DELETE => Delete a data in database or (in this case), in array.
 */

/**
 * When we work with request parameters, there are some options available to deal with information.
 * BODY => is used to pass information in the "body of the request", use with POST and PUT;
 * PARAMS => is used to pass parameters in "URL". Ex: localhost:3000/produtcs/id <-- the "id" is the parameters
 * QUERY => is used to create a "filter". Ex: localhost:3000/produtcs/?id=2569752368772&value=86848789558 <-- where "?" and "&value=" are the query parameters.
 */

// BASIC ROUTING

// This rout POST a product in the array of products
app.post('/products', (req, res) => {
	const { name, price, category } = req.body
	const produtc = {
		name,
		price,
		category,
		id: randomUUID()
	}

	products.push(produtc)
	productFile()
	return res.json(produtc)
})

// This rout GET all products in the array of products
app.get('/products', (req, res) => {
	return res.json(products)
})

// This rout GET one product by the ID in the array of products
app.get('/products/:id', (req, res) => {
	const { id } = req.params
	const product = products.find((product) => product.id === id)
	return res.json(product)
})

// This rout ALTER one product by the ID in the array of products
app.put('/products/:id', (req, res) => {
	const { id } = req.params
	const { name, price, category } = req.body

	const productIndex = products.findIndex((product) => product.id === id)
	products[productIndex] = {
		...products[productIndex],
		name,
		price,
		category
	}

	productFile()
	return res.json({ message: 'Your product are successfully changed!' })
})

// This rout DELETE one product by the ID in the array of products
app.delete('/products/:id', (req, res) => {
	const { id } = req.params
	const productIndex = products.findIndex((product) => product.id === id)
	products.splice(productIndex, 1)

	productFile()
	return res.json({ message: 'Your product are successfully deleted' })
})

// For better performance I create this function for write file, used on POST and PUT requests
function productFile() {
	fs.writeFile('products.json', JSON.stringify(products), (err) => {
		if (err) {
			console.log(err)
		} else {
			console.log('Product successfully inserted!')
		}
	})
}

// Server initialization
app.listen(port, () => {
	console.log(`Server is online! Listen on port: ${port}`)
})
