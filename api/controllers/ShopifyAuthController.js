const shopifyAPI = require("shopify-node-api");
const uuidv4 = require("uuid/v4");

module.exports = {
    startAuth: function(req, res) {
        /*
            { hmac: '5fbcce31a670d5eb78ac9e5ee90c0c419e9108b4980c1b1d5156c828ad39d190',
  shop: 'miller-furniture.myshopify.com',
  timestamp: '1499727553' }
        */
        const Stores = sails.models.store;
        const nonce = uuidv4();

        Stores.findOne({
            name: req.query.shop,
            accessToken: { "!": null }
        })
            .then(store => {
                return res.redirect("/app");
            })
            .catch(err => {
                Stores.create({
                    name: req.query.shop,
                    nonce: nonce
                }).exec((err, data) => {
                    if (err) return res.serverError(err);
                    else {
                        const Shopify = new shopifyAPI({
                            shop: req.query.shop.replace(".myshopify.com", ""),
                            shopify_api_key: sails.config.presskitty.apiKey,
                            shopify_shared_secret:
                                sails.config.presskitty.secret,
                            redirect_uri:
                                "https://presskitty.fwd.wf/shopify_finish_auth",
                            shopify_scope:
                                "write_content, read_content, read_script_tags, write_script_tags, read_themes",
                            nonce: nonce
                        });
                        const auth_url = Shopify.buildAuthURL();
                        console.log(auth_url);
                        res.redirect(auth_url);
                    }
                });
            });
    },

    finishAuth: function(req, res) {
        const Stores = sails.models.store;

        const suppliedNonce = req.query.state;

        Stores.findOne({
            nonce: suppliedNonce
        })
            .then(store => {
                const Shopify = new shopifyAPI({
                    shop: store.name.replace(".myshopify.com", ""),
                    shopify_api_key: sails.config.presskitty.apiKey,
                    shopify_shared_secret: sails.config.presskitty.secret,
                    nonce: store.nonce
                });

                Shopify.exchange_temporary_token(req.query, function(
                    err,
                    data
                ) {
                    if (err) return res.serverError(err);
                    else {
                        Stores.update(store.id, {
                            accessToken: data.access_token
                        })
                            .then(store => {
                                console.log(store);
                                return res.ok("all good");
                            })
                            .catch(err => {
                                console.log(err);
                                return res.serverError(err);
                            });
                    }
                });
            })
            .catch(err => {
                console.log(err);
                return res.notFound();
            });
    },

    publish: function(req, res) {
        const markup = req.body.markup;
        const Shopify = new shopifyAPI({
            shop: "miller-furniture",
            shopify_api_key: sails.config.presskitty.apiKey,
            shopify_shared_secret: sails.config.presskitty.secret,
            access_token: "e2425c159bc4883abac1b7481af69199"
        });

        const pageData = {
            page: {
                author: "Press Kitty",
                body_html: markup,
                title: "Press",
                published: true
            }
        };

        console.log(req.body);
        console.log(pageData);

        //252037639

        // See if Store object has a `pageId`

        // If it does, update the contents of the page with that id

        // If it does not, create a new page, get the new page ID and store it.

        Shopify.post("/admin/pages.json", pageData, function(
            err,
            data,
            headers
        ) {
            console.log(arguments);
            if (err) return res.serverError(err);
            else {
                return res.json(data);
            }
        });
    }
};
