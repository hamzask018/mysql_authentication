import express from 'express';
import cors from 'cors';
import mysql from 'mysql';

const port = process.env.PORT || 4000;

const app = express();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
};

app.use(express.json());
app.use(cors(corsOptions));


const con = mysql.createConnection(
   {
    user: 'root',
    host: 'localhost',
    password: 'hamza',
    database: 'userauth'
   }
);

app.post("/api/register",(req,res)=>{
    const { name, email, password } = req.body;
    const sql = "INSERT INTO userdata (name, email, password) VALUES (?,?,?)";
    con.query(sql, [name, email, password], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error registering user");
        }
        else {
            console.log(`New user registered with ID: ${result.insertId}`);
             res.status(201).send("User registered successfully");            
        }
    });
})

app.post("/api/login",(req,res)=>{
    const { email, password } = req.body;
    const sql = "SELECT * FROM userdata WHERE email =? AND password =?";
    con.query(sql, [email, password], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error logging in");
        }
        else {
            if(result.length > 0){
                console.log("User logged in successfully");
                res.status(200).send("User logged in successfully");
            }
            else{
                res.status(401).send("Invalid email or password");
            }
        }
    });
});
 


app.listen(port , () => {
    if(con) console.log("DB connection established");
    console.log(`Server running on port ${port}`);
});



