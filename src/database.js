const mongoose = require('mongoose');

const uri = "mongodb+srv://admin:admin123@cluster0-r17mw.mongodb.net/demoGeo?retryWrites=true&w=majority";
mongoose.set('useFindAndModify', false);
mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));
