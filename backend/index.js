import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import multer from 'multer'; 
import jwt from 'jsonwebtoken';
import path from 'path';




const app = express();


app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));



// const db = mysql.createPool({
//     connectionLimit: 10,
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "Signup"
// });



// Create a connection pool
const db = mysql.createPool({
  connectionLimit: 10,
  host: "viaduct.proxy.rlwy.net",
  user: "root",
  password: "uiFtYisHByIafuuugdUbYCGNlxlfHbIB",
  port: 43900,
  database: "railway",
  // Add this option to use mysql_native_password authentication plugin
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from("uiFtYisHByIafuuugdUbYCGNlxlfHbIB" + '\0')
  }
});

// Get a connection from the pool
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');

  // Use the connection for querying
  connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    // Release the connection when done with querying
    connection.release();
    
    if (error) {
      console.error('Error executing query:', error);
      return;
    }
    console.log('The solution is: ', results[0].solution);
  });
});



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory where you want to save files
    },
    filename: function (req, file, cb) {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = file.originalname.split('.').pop();
        const filename = uniquePrefix + '.' + extension;
        cb(null, filename);
    }
});


// Multer upload configuration
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Limit file size to 5MB
    },
    fileFilter: function (req, file, cb) {
        const allowedFileTypes = /jpeg|jpg|png|gif/;
        const extension = allowedFileTypes.test(file.originalname.split('.').pop().toLowerCase());
        if (extension) {
            cb(null, true);
        } else {
            cb(new Error('Only images with .jpeg, .jpg, .png, or .gif extensions are allowed.'));
        }
    }
});


// Fetch all products
app.get('/api/products/:farmerId', (req, res) => {
    const farmerEmail = req.params.farmerId; // Accessing farmerId from URL params

    db.query('SELECT * FROM farmer_product WHERE farmer_email = ?', farmerEmail, (err, results) => {
        if (err) {
            console.error('Error fetching products from database:', err);
            return res.status(500).json({ error: 'Error fetching products' });
        }
        res.status(200).json(results);
    });
});


app.get('/api1/products/:id', (req, res) => {
    const productId = req.params.id; // Use consistent variable name
  
    // Query to fetch product details from MySQL database
    const query = `SELECT * FROM farmer_product WHERE id = ?`;
  
    // Execute the query with productId as a parameter
    db.query(query, [productId], (err, results) => {
      if (err) {
        console.error('Error fetching product details:', err);
        res.status(500).json({ error: 'Error fetching product details' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      // Product found, send it as JSON response
      res.json(results[0]);
    });
  });

    // Get all products
app.get('/api/products', (req, res) => {
    const sql = 'SELECT * FROM farmer_product';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(result);
    });
  });

  

// Backend code

app.post('/api/products1', upload.single('image'), (req, res) => {
    console.log(req.file);
    const { name, description, category, price, quantity } = req.body;
    const image = req.file.filename; // Multer saves uploaded file to 'uploads/' directory
    const farmerEmail= req.query.farmerId; // Extract farmer name from query parameters

    const fetchFarmerIdQuery = 'SELECT id, fullName FROM farmer WHERE email = ?';
    db.query(fetchFarmerIdQuery, [farmerEmail], (fetchErr, fetchResult) => {
        if (fetchErr) {
            console.error('Error fetching farmer ID:', fetchErr);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
    
        if (fetchResult.length === 0) {
            console.error('Farmer not found');
            res.status(404).json({ error: 'Farmer not found' });
            return;
        }
    
        // Extract farmer_id and name from fetchResult
        const farmerId = fetchResult[0].id;
        const farmerName = fetchResult[0].fullName;
        
    
        // Insert product into database with farmer_id and farmerName
        const insertProductQuery = 'INSERT INTO farmer_product (name, description, category, price, quantity, image, farmer_id, farmerName, farmer_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(insertProductQuery, [name, description, category, price, quantity, image, farmerId, farmerName, farmerEmail], (insertErr, insertResult) => {
            if (insertErr) {
                console.error('Error inserting product into database:', insertErr);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            console.log('Product added successfully');
            res.status(200).json({ message: 'Product added successfully' });
        });
    });
   
});

app.put('/api/products/:productId', upload.single('image'), (req, res) => {
  const productId = req.params.productId;
  const { name, description, category, price, quantity } = req.body;
  let image = null;

  // Check if an image was uploaded
  if (req.file) {
    image = req.file.filename; // If an image is uploaded, get the filename
  }

  // Retrieve the current image filename from the database
  const getCurrentImageQuery = 'SELECT image FROM farmer_product WHERE id = ?';
  db.query(getCurrentImageQuery, [productId], (imageErr, imageResult) => {
    if (imageErr) {
      console.error('Error retrieving current image filename:', imageErr);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (imageResult.length === 0) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    // If no new image was uploaded, retain the current image filename
    if (!image) {
      image = imageResult[0].image;
    }

    // Update product in the database
    const updateProductQuery = 'UPDATE farmer_product SET name=?, description=?, category=?, price=?, quantity=?, image=? WHERE id=?';
    db.query(updateProductQuery, [name, description, category, price, quantity, image, productId], (updateErr, updateResult) => {
      if (updateErr) {
        console.error('Error updating product:', updateErr);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      console.log('Product updated successfully');
      res.status(200).json({ message: 'Product updated successfully' });
    });
  });
});




// Define route to fetch total products
app.get('/api/totalproducts11', (req, res) => {
  const query = 'SELECT COUNT(*) AS totalProducts FROM farmer_product';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching total products:', err);
      res.status(500).json({ error: 'Error fetching total products' });
      return;
    }
    if (result.length === 0 || result[0].totalProducts === null) {
      res.status(404).json({ error: 'No products found' });
      return;
    }
    
    // Log the fetched result to the console
    console.log('Query Result:', result);

    // Log the fetched total products to the console
    console.log('Total Products:', result[0].totalProducts);

    // Send the total products as JSON response
    res.json({ totalProducts: result[0].totalProducts });
  });
});
// // API endpoint to get total products
// app.get('/api/products/total', (req, res) => {
//   const query = 'SELECT COUNT(*) AS total FROM farmer_product';
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       return res.status(500).send(err);
//     }
//     console.log('Query result:', results); // Log the results
//     res.json({ total: results[0].total });
//   });
// });

  

// Example query execution using the pool
db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }

  });
// Define route to fetch total products, total inventory, order statuses count, and total price of delivered orders
app.get('/api/totaldata', (req, res) => {
  console.log('Request received for /api/totaldata'); // Add a debug statement
  
  const totalProductsQuery = 'SELECT COUNT(*) AS totalProducts FROM farmer_product';
  console.log('Executing total products query:', totalProductsQuery); // Add a debug statement
  
  const totalInventoryQuery = 'SELECT SUM(quantity) AS totalInventory FROM farmer_product';
  console.log('Executing total inventory query:', totalInventoryQuery); // Add a debug statement
  
  const pendingOrdersQuery = 'SELECT COUNT(*) AS pendingOrders FROM orders WHERE status = "pending"';
  console.log('Executing pending orders query:', pendingOrdersQuery); // Add a debug statement
  
  const shippingOrdersQuery = 'SELECT COUNT(*) AS shippingOrders FROM orders WHERE status = "shipping"';
  console.log('Executing shipping orders query:', shippingOrdersQuery); // Add a debug statement
  
  const totalPriceDeliveredQuery = 'SELECT SUM(totalPrice) AS totalPriceDelivered FROM orders WHERE status = "delivered"';
  console.log('Executing total price of delivered orders query:', totalPriceDeliveredQuery); // Add a debug statement
  
  const queries = [
    totalProductsQuery,
    totalInventoryQuery,
    pendingOrdersQuery,
    shippingOrdersQuery,
    totalPriceDeliveredQuery
  ];

  let responseData = {};

  Promise.all(queries.map(query => {
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result[0]);
      });
    });
  }))
  .then(results => {
    responseData = {
      totalProducts: results[0].totalProducts,
      totalInventory: results[1].totalInventory,
      pendingOrders: results[2].pendingOrders,
      shippingOrders: results[3].shippingOrders,
      totalPriceDelivered: results[4].totalPriceDelivered || 0 // Set default value if null
    };
    res.json(responseData);
  })
  .catch(error => {
    console.error('Error fetching total data:', error);
    res.status(500).json({ error: 'Error fetching total data' });
  });
});




// JWT secret key
const JWT_SECRET = 'your_secret_key';

// Middleware to verify JWT token and extract user ID
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ error: 'Token not provided.' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Failed to authenticate token.' });
        }
        req.user = decoded;
        next();
    });
};

app.post("/signup", (req, res) => {
    const { fullName, email, phoneNumber, password } = req.body;

    if (!fullName || !email || !phoneNumber || !password) {
        return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    // Check if the email already exists in the farmer table
    let sql = "SELECT * FROM farmer WHERE email = ?";
    db.query(sql, [email], (err, farmerResult) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            return res.status(500).json({ error: 'An error occurred while signing up. Please try again.' });
        }

        if (farmerResult.length > 0) {
            return res.status(409).json({ error: 'Email already exists as a farmer.' });
        }

        // If not found in the farmer table, check the login table
        sql = "SELECT * FROM login WHERE email = ?";
        db.query(sql, [email], (err, loginResult) => {
            if (err) {
                console.error('Error executing MySQL query:', err);
                return res.status(500).json({ error: 'An error occurred while signing up. Please try again.' });
            }

            if (loginResult.length > 0) {
                return res.status(409).json({ error: 'Email already exists as a user.' });
            }

            // If email is unique, proceed with signup
            const insertSql = "INSERT INTO login (name, email, phone_number, password) VALUES (?, ?, ?, ?)";
            db.query(insertSql, [fullName, email, phoneNumber, password], (err, result) => {
                if (err) {
                    console.error('Error executing MySQL query:', err);
                    return res.status(500).json({ error: 'An error occurred while signing up. Please try again.' });
                }

                console.log('User signed up successfully:', result);
                return res.status(200).json({ message: 'Signup successful' });
            });
        });
    });
});

app.post("/farmer_signup", (req, res) => {
    const { fullName, email, phoneNumber, farmName, farmerAddress, password } = req.body;

    if (!fullName || !email || !phoneNumber || !farmName || !farmerAddress || !password) {
        return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    // Check if the email already exists in the login table
    let sql = "SELECT * FROM login WHERE email = ?";
    db.query(sql, [email], (err, loginResult) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            return res.status(500).json({ error: 'An error occurred while signing up. Please try again.' });
        }

        if (loginResult.length > 0) {
            return res.status(409).json({ error: 'Email already exists as a user.' });
        }

        // If not found in the login table, proceed with signup
        const insertSql = "INSERT INTO farmer (fullName, email, phoneNumber, farmName, farmerAddress, password) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(insertSql, [fullName, email, phoneNumber, farmName, farmerAddress, password], (err, result) => {
            if (err) {
                console.error('Error executing MySQL query:', err);
                return res.status(500).json({ error: 'An error occurred while signing up. Please try again.' });
            }

            console.log('Farmer signed up successfully:', result);
            return res.status(200).json({ message: 'Farmer signup successful' });
        });
    });
});


app.post('/adminsignup/:adminId', (req, res) => {
    const { email, password } = req.body;
    const { adminId } = req.params;
    
    // Query the database to retrieve the email of the admin with the provided adminId
    const getEmailQuery = 'SELECT email FROM admins WHERE admin_id = ?';
    db.query(getEmailQuery, [adminId], (err, result) => {
        if (err) {
            console.error('Error fetching admin email:', err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        
        // Check if admin with the provided adminId exists
        if (result.length === 0) {
            console.error('Admin not found');
            res.status(404).json({ message: 'Admin not found' });
            return;
        }
        
        const createdBy = result[0].email; // Extract email from the result
        
        // Insert into the database with createdBy as the email of the admin
        const sql = 'INSERT INTO admins (email, password, created_by) VALUES (?, ?, ?)';
        db.query(sql, [email, password, createdBy], (err, result) => {
            if (err) {
                console.error('Error signing up admin:', err);
                res.status(500).json({ message: 'Internal server error' });
                return;
            }
            console.log('Admin signed up successfully');
            res.status(201).json({ message: 'Admin signed up successfully' });
        });
    });
});


app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password.' });
    }

    let sql = "SELECT * FROM farmer WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, farmerResult) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            return res.status(500).json({ error: 'An error occurred while logging in. Please try again.' });
        }

        if (farmerResult.length > 0) {
            const farmerName = farmerResult[0].id;
            console.log('Farmer logged in successfully:', farmerName);
            const token = jwt.sign({ email, farmerName, isFarmer: true }, JWT_SECRET);
            console.log('JWT:', token); // Log the JWT token
            return res.json({ token });
        } else {
            // If not found in the farmer table, check the login table
            sql = "SELECT * FROM login WHERE email = ? AND password = ?";
            db.query(sql, [email, password], (err, loginResult) => {
                if (err) {
                    console.error('Error executing MySQL query:', err);
                    return res.status(500).json({ error: 'An error occurred while logging in. Please try again.' });
                }
        
                if (loginResult.length > 0) {
                    const userEmail = loginResult[0].id; // Fetch the user's email from the loginResult
                    console.log('User logged in successfully:', userEmail);
                    const token = jwt.sign({ email: userEmail, isFarmer: false }, JWT_SECRET);
                    console.log('JWT:', token); // Log the JWT token
                    return res.json({ token });
                } else {
                    // If not found in the login table, check the admins table
                    sql = "SELECT * FROM admins WHERE email = ? AND password = ?";
                    db.query(sql, [email, password], (err, adminResult) => {
                        if (err) {
                            console.error('Error executing MySQL query:', err);
                            return res.status(500).json({ error: 'An error occurred while logging in. Please try again.' });
                        }
                
                        if (adminResult.length > 0) {
                            const adminEmail = adminResult[0].admin_id; // Fetch the admin's email from the adminResult
                            console.log('Admin logged in successfully:', adminEmail);
                            const token = jwt.sign({ email: adminEmail, isAdmin: true }, JWT_SECRET);
                            console.log('JWT:', token); // Log the JWT token
                            return res.json({ token });
                        } else {
                            return res.status(401).json({ error: 'Invalid username or password.' });
                        }
                    });
                }
            });
        }
    });
});

//Log the logging activity
app.post('/loginactivity', async (req, res) => {
    const { email, name } = req.body;
  
    try {
      db.query('SELECT name FROM login WHERE email = ?', [email], async (err, results) => {
        if (err) {
          return res.status(500).json({ error: 'Database query error' });
        }
  
        if (results.length === 0) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
  
        const name = results[0].name;
        const loginTime = new Date();
        db.query('INSERT INTO login_activity (name, email, login_time) VALUES (?, ?, ?)', [name, email, loginTime], (err, results) => {
          if (err) {
            console.error('Error logging login activity:', err);
          }
        });
  
        
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  
  

app.delete('/farmers/:id', (req, res) => {
    const { id } = req.params;

    const deleteSql = "DELETE FROM farmer WHERE id = ?";
    db.query(deleteSql, id, (err, result) => {
        if (err) {
            console.error('Error deleting farmer signup:', err);
            res.status(500).json({ error: 'Error deleting farmer signup' });
        } else {
            console.log('Farmer signup deleted successfully:', result);
            res.json({ message: 'Farmer signup deleted successfully' });
        }
    });
});
app.put('/farmers/:id', (req, res) => {
    const { id } = req.params;
    const updatedData = req.body; // Assuming the updated data is sent in the request body

    const updateSql = "UPDATE farmer SET ? WHERE id = ?";
    db.query(updateSql, [updatedData, id], (err, result) => {
        if (err) {
            console.error('Error updating farmer signup:', err);
            res.status(500).json({ error: 'Error updating farmer signup' });
        } else {
            console.log('Farmer signup updated successfully:', result);
            res.json({ message: 'Farmer signup updated successfully' });
        }
    });
});



app.get('/farmers', (req, res) => {
    db.query('SELECT * FROM farmer', (err, results) => {
        if (err) {
            console.error('Error fetching products from database:', err);
            return res.status(500).json({ error: 'Error fetching products' });
        }
        res.status(200).json(results);
    });
});

// Add a new product
app.post('/api/products', (req, res) => {
    const productData = req.body;
    db.query('INSERT INTO farmer_product SET ?', productData, (err, result) => {
        if (err) {
            console.error('Error adding product to database:', err);
            return res.status(500).json({ error: 'Error adding product' });
        }
        console.log('Product added to database:', result);
        const newProduct = { ...productData, id: result.insertId };
        res.status(200).json(newProduct);
    });
});

// Delete an existing product
app.delete('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    db.query('DELETE FROM farmer_product WHERE id = ?', productId, (err, result) => {
        if (err) {
            console.error('Error deleting product from database:', err);
            return res.status(500).json({ error: 'Error deleting product' });
        }
        console.log('Product deleted from database:', result);
        res.status(200).json({ message: 'Product deleted successfully' });
    });
});



// Route to fetch all admins data
app.get('/admins', (req, res) => {
    const selectSql = "SELECT * FROM admins";
    db.query(selectSql, (err, result) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({ error: 'Error fetching admins data' });
        } else {
            console.log('Admins data fetched successfully:', result);
            res.json(result);
        }
    });
});

app.put('/admins/:id', (req, res) => {
  const { id } = req.params;
  const { email, password, created_by } = req.body; // Extract updated admin data from request body

  // Convert the provided datetime value to the desired format
  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

  // Now, update your SQL query to use the dynamic values
  const updateSql = "UPDATE admins SET email = ?, password = ?, created_by = ?, created_at = ? WHERE admin_id = ?";

  // Execute the SQL query with the dynamic values
  db.query(updateSql, [email, password, created_by, createdAt, id], (err, result) => {
    if (err) {
      console.error('Error updating admin:', err);
      res.status(500).json({ error: 'Error updating admin' });
    } else {
      console.log('Admin updated successfully:', result);
      res.json({ message: 'Admin updated successfully' });
    }
  });
});

// Route to delete admin data
app.delete('/admins/:id', (req, res) => {
    const { id } = req.params;

    const deleteSql = "DELETE FROM admins WHERE admin_id = ?";
    db.query(deleteSql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting admin:', err);
            res.status(500).json({ error: 'Error deleting admin' });
        } else {
            if (result.affectedRows > 0) {
                console.log('Admin deleted successfully');
                res.json({ message: 'Admin deleted successfully' });
            } else {
                console.log('Admin not found');
                res.status(404).json({ error: 'Admin not found' });
            }
        }
    });
});

// Route to fetch users from the login table
app.get('/api/users', (req, res) => {
    const selectSql = "SELECT * FROM login";
    db.query(selectSql, (err, result) => {
        if (err) {
            console.error('Error fetching users from database:', err);
            res.status(500).json({ error: 'Error fetching users' });
        } else {
            console.log('Users fetched successfully:', result);
            res.json(result);
        }
    });
});

// Route to delete a user from the login table
app.delete('/api/deleteUser/:id', (req, res) => {
    const userId = req.params.id;
    const deleteSql = "DELETE FROM login WHERE id = ?";
    db.query(deleteSql, userId, (err, result) => {
        if (err) {
            console.error('Error deleting user from database:', err);
            res.status(500).json({ error: 'Error deleting user' });
        } else {
            console.log('User deleted successfully:', result);
            res.status(200).json({ message: 'User deleted successfully' });
        }
    });
});



 //Backend API endpoint to handle adding a product to the cart
 app.post('/api11/products/cart', (req, res) => {
    const { product_name, category, quantity, price } = req.body;
    const timestamp = new Date(); // Generate current timestamp
  
    // Insert the product into the cart_items table in the database
    db.query('INSERT INTO cart_items (product_name, category, quantity, price, timestamp) VALUES (?, ?, ?, ?, ?)',
      [product_name, category, quantity, price, timestamp],
      (error, results) => {
        if (error) {
          console.error('Error adding product to cart:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
  
        return res.status(200).json({ message: 'Product added to cart successfully' });
      }
    );
  });

    // Route to remove an item from the cart
    app.delete('/api11/products/cart/:id', (req, res) => {
        const productId = req.params.id;
        const deleteSql = 'DELETE FROM cart_items WHERE id = ?';
        db.query(deleteSql, productId, (err, result) => {
          if (err) {
            console.error('Error removing product from cart:', err);
            res.status(500).json({ error: 'Error removing product from cart' });
          } else {
            console.log('Product removed from cart successfully:', result);
            res.status(200).json({ message: 'Product removed from cart successfully' });
          }
        });
      });

  // Route to update quantity of an item in the cart
app.patch('/api11/products/cart/:id', (req, res) => {
    const productId = req.params.id;
    const { quantity} = req.body;
    const updateSql = 'UPDATE cart_items SET quantity = ? WHERE id = ?';
    db.query(updateSql, [quantity, productId], (err, result) => {
      if (err) {
        console.error('Error updating product quantity:', err);
        res.status(500).json({ error: 'Error updating product quantity' });
      } else {
        console.log('Product quantity updated successfully:', result);
        res.status(200).json({ message: 'Product quantity updated successfully' });
      }
    });
  });
  
  
  // Endpoint to fetch cart items
app.get('/api11/products/cart', (req, res) => {
    const sql = 'SELECT * FROM cart_items';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching cart items:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(result); // Return cart items as JSON response
    });
  });


  // Route to handle storing user messages
app.post('/api/sendMessage', (req, res) => {
    const { farmerId, message, senderUsername } = req.body;
  
    // Validate request parameters
    if (!farmerId || !message || !senderUsername) {
      return res.status(400).json({ error: 'Invalid request parameters' });
    }
  
    // SQL query to insert the user's message into the database
    const insertSql = 'INSERT INTO user_messages (farmer_id, message, sender, timestamp) VALUES (?, ?, ?, NOW())'; // Assuming 'timestamp' column exists in 'user_messages'
    
    db.query(insertSql, [farmerId, message, senderUsername], (err, result) => {
      if (err) {
        console.error('Error storing user message:', err);
        return res.status(500).json({ error: 'Error storing user message' });
      }
  
      // Message stored successfully
      res.status(201).json({ message: 'User message sent successfully' });
    });
  });

// API endpoints
// Fetch messages for a specific user
app.get('/api/messages/:user', (req, res) => {
    const user = req.params.user;
  
    // Assuming 'user_messages' table schema: id, user_id, message, sender, timestamp
    const query = 'SELECT * FROM user_messages WHERE user_id = ? ORDER BY timestamp';
    
    db.query(query, [user], (err, results) => {
      if (err) {
        console.error('Error fetching messages:', err);
        res.status(500).json({ error: 'Error fetching messages' });
      } else {
        const messages = results.map(row => ({
          text: row.message,
          sender: row.sender,
          timestamp: row.timestamp,
        }));
        res.status(200).json({ messages });
      }
    });
  });

  
  
  app.post('/api11/products/cart/placeOrder', (req, res) => {
    console.log("Received place order request");
    const { buyerName, buyerPhoneNumber, buyerLocation, cartItems, totalPrice } = req.body;
    console.log("Order Details:", { buyerName, buyerPhoneNumber, buyerLocation, totalPrice }); // Log received order details
  
    // Insert order details into the database
    const orderQuery = 'INSERT INTO orders (buyerName, buyerPhoneNumber, buyerLocation, totalPrice) VALUES (?, ?, ?, ?)';
    db.query(orderQuery, [buyerName, buyerPhoneNumber, buyerLocation, totalPrice], (err, result) => {
      if (err) {
        console.error('Error inserting order details into the database:', err);
        return res.status(500).json({ error: 'Error placing order. Please try again.' });
      }
  
      const orderId = result.insertId;
  
      // Fetch productId for each cart item from farmer_product table
      const fetchProductIds = cartItems.map(item => {
        return new Promise((resolve, reject) => {
          const productQuery = 'SELECT id FROM farmer_product WHERE name = ? AND category = ?';
          db.query(productQuery, [item.productName, item.category], (err, results) => {
            if (err) {
              reject(err);
            } else if (results.length > 0) {
              resolve({ ...item, productId: results[0].id });
            } else {
              reject(new Error('Product not found in farmer_product table'));
            }
          });
        });
      });
  
      // Resolve all productId fetch promises
      Promise.all(fetchProductIds)
        .then(itemsWithProductIds => {
          const orderItemsValues = itemsWithProductIds.map(item => [
            orderId, item.productId, item.productName, item.category, item.quantity, item.price, item.price * item.quantity
          ]);
  
          // Insert order items into the database
          const orderItemsQuery = 'INSERT INTO order_item (orderId, productId, productName, category, quantity, price, totalPrice) VALUES ?';
          db.query(orderItemsQuery, [orderItemsValues], (err, result) => {
            if (err) {
              console.error('Error inserting order items into the database:', err);
              return res.status(500).json({ error: 'Error placing order. Please try again.' });
            }
  
            res.status(200).json({ message: 'Order placed successfully!' });
          });
        })
        .catch(err => {
          console.error('Error fetching product IDs:', err);
          res.status(500).json({ error: 'Error fetching product IDs. Please try again.' });
        });
    });
  });
  

    // Route to handle placing orders with validation
app.post('/api11/products/cart/match', (req, res) => {
    const { buyerName } = req.body;
  
    // Check if the provided name matches any entry in the login_activity table
    const sql = 'SELECT * FROM login_activity WHERE name = ?';
    db.query(sql, [buyerName], (err, result) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (result.length > 0) {
        // Match found, proceed to place the order
        // Your existing logic to place the order goes here
        return res.status(200).json({ message: 'Order placed successfully' });
      } else {
        // No match found, return an error
        return res.status(400).json({ error: 'Invalid name. Please check your details and try again.' });
      }
    });
  });

  app.get('/api11/farmer/orders', (req, res) => {
    const query = `
      SELECT 
        o.buyerName,
        o.buyerPhoneNumber,
        o.buyerLocation,
        o.totalPrice,
        o.orderDate,
        o.status, -- Include status column
        oi.orderId, 
        oi.productName,
        oi.productId,
        oi.category,
        oi.quantity,
        oi.price,
        oi.totalPrice AS itemTotalPrice
      FROM orders o
      JOIN order_item oi ON o.new_id = oi.orderId
    `;
  
    db.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching orders from database:', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        const orders = results.reduce((acc, order) => {
          const orderId = order.orderId;
          if (!acc[orderId]) {
            acc[orderId] = {
              buyerName: order.buyerName,
              buyerPhoneNumber: order.buyerPhoneNumber,
              buyerLocation: order.buyerLocation,
              totalPrice: order.totalPrice,
              orderDate: order.orderDate,
              status: order.status, // Include status
              items: []
            };
          }
          acc[orderId].items.push({
            orderId: order.orderId,
            productName: order.productName,
            productId: order.productId,
            category: order.category,
            quantity: order.quantity,
            price: order.price,
            itemTotalPrice: order.itemTotalPrice
          });
          return acc;
        }, {});
  
        res.json(Object.values(orders));
      }
    });
});

// // Define route to fetch total products
// app.get('/api/totalproducts', (req, res) => {
//   const query = 'SELECT COUNT(*) AS totalProducts FROM farmer_product';
//   db.query(query, (err, result) => {
//     if (err) {
//       console.error('Error fetching total products:', err);
//       res.status(500).json({ error: 'Error fetching total products' });
//       return;
//     }
//     if (result.length === 0 || result[0].totalProducts === null) {
//       res.status(404).json({ error: 'No products found' });
//       return;
//     }

//     // Log the fetched total products to the console
//     console.log('Total Products:', result[0].totalProducts);

//     // Send the total products as JSON response
//     res.json({ totalProducts: result[0].totalProducts });
//   });
// });




app.post('/api11/farmer/orders/:orderId/status', (req, res) => {
  const orderId = req.params.orderId;
  const newStatus = req.body.status;

  const query = `
    UPDATE orders
    SET status = ?
    WHERE new_id = ?;
  `;

  db.query(query, [newStatus, orderId], (error, results) => {
    if (error) {
      console.error('Error updating order status in database:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ message: 'Order status updated successfully' });
    }
  });
});

// Endpoint to handle form submission
app.post('/submit-inquiry', (req, res) => {
  const { firstName, lastName, contactNumber, email, message } = req.body;
  
  const sql = `INSERT INTO user_inquiries (firstName, lastName, contactNumber, email, message) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [firstName, lastName, contactNumber, email, message], (err, result) => {
    if (err) {
      console.error('Error storing inquiry:', err);
      return res.status(500).json({ error: 'An error occurred while processing your request' });
    }
    console.log('Inquiry stored successfully');
    res.status(200).json({ message: 'Inquiry stored successfully' });
  });
});

// Endpoint to fetch inquiries
app.get('/get-inquiries', (req, res) => {
  const sql = 'SELECT id, firstName, lastName, contactNumber, email, message FROM user_inquiries';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching inquiries:', err);
      return res.status(500).json({ error: 'An error occurred while fetching inquiries' });
    }
    res.status(200).json(results);
  });
});

// Endpoint to handle form submission
app.post('/submit-inquiry', (req, res) => {
  const { firstName, lastName, contactNumber, email, message } = req.body;
  
  const sql = `INSERT INTO user_inquiries (firstName, lastName, contactNumber, email, message) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [firstName, lastName, contactNumber, email, message], (err, result) => {
    if (err) {
      console.error('Error storing inquiry:', err);
      return res.status(500).json({ error: 'An error occurred while processing your request' });
    }
    console.log('Inquiry stored successfully');
    res.status(200).json({ message: 'Inquiry stored successfully' });
  });
});

// Define route to fetch total data for admin dashboard
app.get('/api/admintotaldata', (req, res) => {
  console.log('Request received for /api/admintotaldata'); // Add a debug statement

  const totalProductsQuery = 'SELECT COUNT(*) AS totalProducts FROM farmer_product';
  console.log('Executing total products query:', totalProductsQuery); // Add a debug statement

  const totalInventoryQuery = 'SELECT SUM(quantity) AS totalInventory FROM farmer_product';
  console.log('Executing total inventory query:', totalInventoryQuery); // Add a debug statement

  const totalOrdersQuery = 'SELECT COUNT(*) AS totalOrders FROM orders';
  console.log('Executing total orders query:', totalOrdersQuery); // Add a debug statement

  const totalFarmersQuery = 'SELECT COUNT(*) AS totalFarmers FROM farmer';
  console.log('Executing total farmers query:', totalFarmersQuery); // Add a debug statement

  const totalUsersQuery = 'SELECT COUNT(*) AS totalUsers FROM login';
  console.log('Executing total users query:', totalUsersQuery); // Add a debug statement

  const totalSalesQuery = 'SELECT SUM(totalPrice) AS totalSales FROM orders';
  console.log('Executing total sales query:', totalSalesQuery); // Debug statement



  // Add queries for total inventory and total sales if applicable

  const queries = [
    totalProductsQuery,
    totalInventoryQuery,
    totalOrdersQuery,
    totalFarmersQuery,
    totalUsersQuery,
    totalSalesQuery
    // Add more queries as needed
  ];

  let responseData = {};

  Promise.all(queries.map(query => {
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result[0]);
      });
    });
  }))
  .then(results => {
    responseData = {
      totalProducts: results[0].totalProducts,
      totalInventory: results[1].totalInventory,
      totalOrders: results[2].totalOrders,
      totalFarmers: results[3].totalFarmers,
      totalUsers: results[4].totalUsers,
      totalSales: results[5].totalSales
      // Add more properties to responseData as needed
    };
    res.json(responseData);
  })
  .catch(error => {
    console.error('Error fetching total admin data:', error);
    res.status(500).json({ error: 'Error fetching total admin data' });
  });
});

      



// Example protected route
app.get("/protected", verifyToken, (req, res) => {
    const userId = req.user.userId; // Accessing user ID from decoded token payload
    res.json({ message: 'This is a protected route!', userId });
});


const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
