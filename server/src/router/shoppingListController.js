const ShopList = require('../models/shoplistModel');

module.exports.getShopListById = async (req, res, next) => {
    const listId = req.params.id;

    ShopList.findById(listId)
        .then(result => {
            if(result)
                res.send(result);
            else throw new Error({message: 'There is no shoplist with this id'});
        })
        .catch(err => {
            next(err);
        })

};
module.exports.getShopListBySessionId = async (req, res, next) => {
    const sessionId = req.params.sessionId;

    try {
        const result = await ShopList.findOneAndUpdate(
            {
                shopSession: sessionId
            },
            {
                $setOnInsert: {
                    date: Date.now(),
                    shopItems: [],
                    generalCost: 0
                }
            },
            {
                new: true,   // return new doc if one is upserted
                upsert: true // insert the document if it does not exist
            }
        );
        if(result)
            res.send(result);
        else throw new Error({code: 500, message: 'updateShopListBySessionId error'});
    }
    catch (e) {
        next(e)
    }
    // ShopList.findOneAndUpdate(
    //     { shopSession: sessionId },
    //     {
    //         $setOnInsert: { date: Date.now(), shopItems: [], generalCost: 0 }
    //     },
    //     {
    //         new: true,   // return new doc if one is upserted
    //         upsert: true // insert the document if it does not exist
    //     }
    // )
    //     .then(result => {
    //         if(result)
    //             res.send(result);
    //         else throw new Error({code: 404, message: 'There is no shoplist with this session id'});
    //     })
    //     .catch(err => {
    //         next(err);
    //     })

};
module.exports.createShopList = async (req, res, next) => {
    const list = new ShopList(req.body);

    list.save()
        .then(result => {
            if(result)
                res.send(result);
            throw new Error({message: 'Shoplist wasn\'t added'});
        })
        .catch(err => {
            next(err);
        });
};
module.exports.updateShopListById = async (req, res, next) => {
};
module.exports.updateShopListBySessionId = async (req, res, next) => {
    const sessionId = req.params.sessionId;
    const newList = req.body;
    console.log('updateShopListBySessionId');
    console.log(sessionId);
    console.log(newList);

    try {
        const result = await ShopList.findOneAndUpdate(
            {
                shopSession: sessionId
            },
            {
                shopItems: newList.shopItems,
                generalCost: newList.generalCost,
                budget: newList.budget,
            },
            {
                new: true,
                upsert: true
            });
        if(result)
            res.send(result);
        else throw new Error({code: 500, message: 'updateShopListBySessionId error'});
    }
    catch (e) {
        next(e);
    }

    // ShopList.findOneAndUpdate({shopSession: sessionId}, {
    //     shopItems: newList.shopItems,
    //     generalCost: newList.generalCost,
    //     budget: newList.budget,
    // }, {
    //     new: true,
    //     upsert: true
    // })
    //     .then(result => {
    //         if(result)
    //             res.send(result);
    //         else throw new Error({code: 500, message: 'Shoplist wasn\'t added or updated'});
    //     })
    //     .catch(err => {
    //         next(err);
    //     });
};
