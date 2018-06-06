const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const database = require('../database/index.js');

const app = express();
const path = require('path');

const bcrypt = require('bcrypt');

const saltRounds = 10; // Difficulty  to crack (Incrementing doubles compute time)

const User = require('../database/schemas/UserSchema.js');

// WE NEED BCRYPT HERE TOO

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || '0979zx7v6vvq0398ubvq7w6dc8c7z5rvg7i1',
  cookie: {},
  resave: true,
  saveUninitialized: true,
}));

app.use(express.static(`${__dirname}/../client/dist`));

app.post('/login', (req, res) => {
  const { username, password } = req.body; // might only be req.body

  // If user
  if (username && password) {
    var db = User.find({username}).exec();

    db.then(async (user) => {
        const isValiduser = await bcrypt.compare(password, user[0].hash);
        return {
          user: user[0],
          hash : user[0].hash,
          isValidUser: isValiduser,
        };
      })
      .then(({ user, hash, isValidUser }) => {
        if (!isValidUser) {
          res.end('/login');
        }
        req.session.username = username;
        req.session.hash = hash;
        console.log("here" ,user)
        database.searchForListsAndPopulate(user.grocery_lists, (lists) => {
        let results = {'loc': '\/', 'lists': lists, 'userData': user};
        res.end(JSON.stringify(results));

        })
      })
      .catch((err) => {
        if(err) console.error(err, 'user does not exist.');
      });
  } else {
    res.end('/login');
  }
});

app.get('/logout', (req, res) => {
  // Remove user
  req.session.destroy();
  res.end('/login');
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  /*
  What happens when a username already exists?
  */
  // If user
  if (username && password) {
    bcrypt.hash(password, saltRounds)
      .then(async hash => (
        database.saveUser({
          username,
          hash,
          grocery_list: [],
          last_login: new Date(),
          failed_login_attempts: 0,
        })
      ))
      .then((hash) => {
        req.session.username = username;
        req.session.hash = hash;

        res.end('/');
      })
      .catch();
  } else {
    res.end('/register');
  }
});

// add new categories into DB if not found in DB
app.post('/category/create', function(req, res) {
  database.searchForCategory(req.body, (category) => {
    res.end(JSON.stringify(category));
  })
});

// searches the database for an item, if it doesn't exists a new item
// will be created
app.post('/search/item', (req, res) => {
  database.searchForItem(req.body, (item) => {
    res.end(JSON.stringify(item));
  });
});

app.post('/addItem', (req, res) => {
  console.log('add item endpoint', req.body)
  database.searchForItemInHistory(req.body, (updatedList) =>{
    console.log(updatedList)
    res.end(JSON.stringify(updatedList))
  })
  /*database.searchForItem(req.body, (item) => {
    console.log('callback', item)
    res.end(JSON.stringify(item));
  });*/
});


app.post('/lists/create', function(req, res) {
  console.log("BEFORE",req.body)
  database.createList(req.body, (list) => {
    res.end(JSON.stringify(list))
  });
});

app.get('/store/search', (req, res) => {
  const { name } = req.body;

  const promiseSearch = name ? database.storeSearch({ name }) : database.storeSearch({});

  promiseSearch.then(stores => res.send(stores));
});

app.post('/store/create', (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(404);
    res.send('Require name');
  }

  database.storeSave({ name })
    .then(store => res.send(store))
    .catch(err => {
      console.error(err);
      res.status(500);
      res.send('Apologies for this error. From our expreience this occurs when the store name is a duplicate. We advise checking the store name.');
    })
});


/* KEEP THIS HERE WITHOUT IT WE CANNOT REFRESH OUR PAGES WITHOUT ERRORS*/
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
