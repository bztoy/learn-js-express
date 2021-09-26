import express from "express";
import path from "path";
import { logger } from "./common/middleware.js";
import { rider_router } from "./routes/api/riders.js";
import { team_router } from "./routes/api/teams.js";
import { riders } from "./data/riders.js";

import exphbs from "express-handlebars";

// Set current directory for ES6
const __dirname = path.resolve();

// Create an Express application
const app = express();

// Init middleware
app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Homepage
app.get('/', (req, res) => res.render('index', {
    title: "This is the title",
    riders: riders
}));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Set rounters
app.use('/api/riders', rider_router);
app.use('/api/teams', team_router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
