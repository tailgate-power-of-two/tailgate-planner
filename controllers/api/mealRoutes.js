const router = require('express').Router();
const { User, Party, Meal } = require('../../models');

// all meals for one party
router.get('/party/:id', (req, res) => {
    Meal.findAll({
        where: {
            party_id : req.params.id
        },
        attributes: ['item_name', 'item_type', 'dietary',],
        include: {
          model: User,
          attributes: ['first_name', 'last_name'],
        },
    })
    .then((dbPostData) => {
        if(dbPostData.length == 0){
            res.status(404).json({message: 'No meals found for this party'})
            return;
        }
        const meals = dbPostData.map((meal) => meal.get({ plain: true }));
        res.status(200).json(meals)
      })
    .catch((err) => {
    console.log(err);
    res.status(500).json(err);
    });
})

// all meals for one user
router.get('/user/:id', (req, res) => {
    Meal.findAll({
        where: {
            user_id : req.params.id
        },
        attributes: ['item_name', 'item_type', 'dietary',],
        include: {
          model: User,
          attributes: ['first_name', 'last_name'],
        },
    })
    .then((dbPostData) => {
        console.log(dbPostData)
        if(dbPostData.length == 0){
            res.status(404).json({message: 'No meals found with this user'})
            return;
        }
        const meals = dbPostData.map((meal) => meal.get({ plain: true }));
        res.status(200).json(meals)
      })
    .catch((err) => {
    console.log(err);
    res.status(500).json(err);
    });
})
// specific meal by meal id
router.get('/:id', (req, res) => {
    Meal.findByPk(req.params.id, {
        attributes: ['item_name', 'item_type', 'dietary',],
        include: [
            {
                model: User,
                attributes: ['first_name', 'last_name'],
            },
        ],
      })
        .then((dbPostData) => {
          if (!dbPostData) {
            res.status(404).json({ message: 'No meal found with this id' });
            return;
          }
    
          const post = dbPostData.get({ plain: true });
          res.status(200).json(post)
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
})

// post
router.post('/', async (req, res)=> {
    try {
        const newMeal = await Meal.create({
            ...req.body,
            user_id: req.session.user_id,
        })
        res.status(200).json(newMeal)
    } catch (err){
        res.status(400).json(err)
    }
})
// delete
router.delete('/:id', async (req, res) => {
    try {
        const mealData = await Meal.destroy({
          where: {
            id: req.params.id,
          },
        });
    
        if (!mealData) {
          res.status(404).json({ message: 'No meal found with this id!' });
          return;
        }
    
        res.status(200).json(mealData);
      } catch (err) {
        res.status(500).json(err);
      }
})
// update everything
router.put('/:id', (req, res) => {
    Meal.update(
      {
        item_name: req.body.item_name,
        item_type: req.body.item_type,
        dietary: req.body.dietary,
        party_id: req.body.party_id,
        user_id: req.body.user_id,
      },
      { 
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedMeal) => {
        res.json(updatedMeal);
      })
      .catch((err) => res.json(err));
  });

module.exports = router;