const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');
const aws = require('aws-sdk');
const fs = require('fs');
const multer = require('multer')
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const talksRouter = require('./routes/category.router');
const submissionsRouter = require('./routes/submissions.router');
const usersRouter = require('./routes/users.routers');
const deleteJuror = require('./routes/deleteJuror.router');
const deleteTalk = require('./routes/deleteTalk.router');
const s3UploadRouter = require('./routes/s3.router');
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/users', usersRouter);
app.use('/api/user', userRouter);
app.use('/api/talks', talksRouter);
app.use('/api/submissions', submissionsRouter);
app.use('/api/delete', deleteJuror);
app.use('/api/delete/talk', deleteTalk);
app.use('/', s3UploadRouter);
// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
