const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/jens_artwork_db',
  {
    // disable logging; default: console.log
    logging: false,
  }
);

const Artist = db.define('artist', {
  name: {
    type: DataTypes.STRING,
  },
});

const Owner = db.define('owner', {
  imageUrl: {
    type: DataTypes.STRING,
  },
  firstName: {
    type: DataTypes.STRING,
    notNull: true,
    unique: true,
  },
  lastName: {
    type: DataTypes.STRING,
    notNull: true,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  notes: {
    type: DataTypes.TEXT,
  },
});

const Artwork = db.define('artwork', {
  title: {
    type: DataTypes.STRING,
  },
});

Artwork.belongsTo(Artist);
Artist.hasMany(Artwork);
Artwork.belongsTo(Owner);
Owner.hasMany(Artwork);

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });

    const michelangelo = await Artist.create({ name: 'Michelangelo' });
    const donatello = await Artist.create({ name: 'Donatello' });
    const raphael = await Artist.create({ name: 'Raphael' });
    const leonardo = await Artist.create({ name: 'Leonardo' });
    const rosie = await Artist.create({ name: 'Rosie' });

    const jack = await Owner.create({
      imageUrl: 'assets/images/jack.jpeg',
      firstName: 'Jack',
      lastName: 'Smith',
      email: 'jack@gmail.com',
      phone: '312-546-4556',
      notes: 'loremipsum',
    });
    const jane = await Owner.create({
      imageUrl: 'assets/images/jane.jpeg',
      firstName: 'Jane',
      lastName: 'Lovelace',
      email: 'jane@gmail.com',
      phone: '313-768-9998',
      notes: 'loremipsum',
    });
    const jen = await Owner.create({
      imageUrl: 'assets/images/jen.jpeg',
      firstName: 'Jen',
      lastName: 'Jackson',
      email: 'jen@gmail.com',
      phone: '212-454-5643',
      notes: 'loremipsum',
    });

    const david = await Artwork.create({ title: 'David' });
    const monaLisa = await Artwork.create({ title: 'Mona Lisa' });
    const dory = await Artwork.create({ title: 'Dory' });
    const stMark = await Artwork.create({ title: 'St. Mark' });
    const parnassus = await Artwork.create({ title: 'The Parnassus' });
    const doniTondo = await Artwork.create({ title: 'Doni Tondo' });

    david.artistId = michelangelo.id;
    david.ownerId = jack.id;
    david.save();

    monaLisa.artistId = leonardo.id;
    monaLisa.ownerId = jane.id;
    monaLisa.save();

    dory.artistId = rosie.id;
    dory.ownerId = jen.id;
    dory.save();

    stMark.artistId = donatello.id;
    stMark.ownerId = jen.id;
    stMark.save();

    parnassus.artistId = raphael.id;
    parnassus.ownerId = jane.id;
    parnassus.save();

    doniTondo.artistId = michelangelo.id;
    doniTondo.ownerId = jack.id;
    doniTondo.save();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { db, models: { Artist, Owner, Artwork }, syncAndSeed };
