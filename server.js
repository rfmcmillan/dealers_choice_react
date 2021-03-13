const {
  models: { Owner, Artist, Artwork },
  syncAndSeed,
  db,
} = require('./db');
const express = require('express');
const app = express();
const path = require('path');

app.use('/dist', express.static(path.join(__dirname, './dist')));
app.use('/assets', express.static(path.join(__dirname, './assets')));

app.use(express.urlencoded({ extended: false }));
app.use(require('method-override')('_method'));

app.get('/', async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, './index.html'));
  } catch (error) {
    next(error);
  }
});

app.get('/api/artworks', async (req, res, next) => {
  try {
    res.send(
      await Artwork.findAll({
        include: [
          {
            model: Artist,
            as: 'artist',
          },
          {
            model: Owner,
            as: 'owner',
          },
        ],
      })
    );
  } catch (error) {
    next(error);
  }
});

app.get('/api/owners', async (req, res, next) => {
  try {
    res.send(
      await Owner.findAll({
        include: {
          model: Artwork,
        },
      })
    );
  } catch (error) {
    next(error);
  }
});

app.post('/api/owners', async (req, res, next) => {
  try {
    const requestBody = await req.body;
    console.log(
      `${requestBody.firstName} ${requestBody.lastName} has been entered`
    );
    Owner.create(requestBody);
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

app.post('/api/owners/:ownerId', async (req, res, next) => {
  try {
    const owner = await Owner.findByPk(req.params.ownerId);
    const requestBody = await req.body;
    const newDate = new Date();
    const currDate = `${newDate.getMonth()}/${newDate.getDay()}/${newDate.getFullYear()}`;
    owner.notes += `--${currDate}: ${requestBody.newNote}`;
    await owner.save();
    res.redirect(`/`);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/owners', async (req, res, next) => {
  try {
    const owner = await Owner.findByPk(req.body.id);
    console.log(`${owner.firstName} ${owner.lastName} has been deleted`);
    await owner.destroy();
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

init();
