const Sequelize = require('sequelize')
const config = require('./config.json');
const db = require('./models')(Sequelize, config);

Main();

async function Main() {
    await db.sequelize.sync({force: true});
    
    await require('./insertPizzas')(db);
    await require('./insertWeapons')(db);
    await require('./insertTurtles')(db);

    console.log('Task 1');
    console.log('All turtles:');    
    let result = await db.turtles.findAll();
    result.forEach((val) => {
        console.log(val.name);
    });
    console.log();

    
    console.log('Task 2');
    console.log('favourite pizza is mozzarella');
    result = await db.turtles.findAll({
        where: {
            '$firstFavouritePizza.name$': 'mozzarella'
        },
        include: [{
            model: db.pizzas,
            as: 'firstFavouritePizza'
        }]
     })
     result.forEach((val) => {
         console.log(val.name);
     });
     console.log();

    console.log('Task 3');
    console.log('unique favourite pizzas');
    result = await db.turtles.findAll({
        include: [{
            model: db.pizzas,
            as: 'firstFavouritePizza'
        }]
    });
    result.forEach((val) => {
        console.log(val.firstFavouritePizza.name);
    })
    console.log();

    console.log('Task 4');
    console.log('create new turtles');
    result = await db.turtles.create({
        name: 'Maksic',
        color: 'kermin',
        weaponId: 2,
        firstFavouritePizzaId: 3,
        secondFavouritePizzaId: 2
    })
    console.log(result.dataValues);
    console.log();
 
    console.log('Task 5');
    console.log('update pizza description')
    result = await db.pizzas.update({
            description: "SUPER FAT!"
        },
        {
            where:{
                calories:{
                    $gte: 3000
                }
            }
        }
    );
    console.log('update pizza')
    console.log()

    console.log('Task 6');
    console.log('find dps')
    result = await db.weapons.findAll({
        where: {
            dps:{
                    $gte: 100
                }
        }
    });
    result.forEach((val) => {
        console.log(val.name);
    })
    console.log()

    console.log('Task 7');
    console.log('find pizza id one')
    result = await db.pizzas.findAll({
        where: {
            'id': 1
        }
    });
    result.forEach((val) => {
        console.log(val.name);
    })
    console.log()

    console.log('Task 8');
    console.log('add pizza for turtle')

    result = await db.turtles.update(
    {
        firstFavouritePizzaId: 2
    },
    {
        where: {
            id: 5
        }
    })
    console.log('updated');

    console.log()
}