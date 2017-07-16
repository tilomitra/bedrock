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
                req.session.store = store;
                res.locals.nonce = store.nonce;
                sails.hooks.http.app.expose(store, "App.Store");
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
                                req.session.store = store;
                                res.locals.nonce = store.nonce;
                                sails.hooks.http.app.expose(store, "App.Store");
                                return res.redirect("/app");
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
        const Stores = sails.models.store;
        const store = req.session.store;

        const markup = req.body.markup;
        const cssStyles = req.body.css;
        const Shopify = new shopifyAPI({
            shop: store.name.split(".")[0],
            shopify_api_key: sails.config.presskitty.apiKey,
            shopify_shared_secret: sails.config.presskitty.secret,
            access_token: store.accessToken
        });

        const linktag = `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.3/css/bulma.min.css">
        <link rel="stylesheet" href="https://presskitty.fwd.wf/styles/app.css">
        <link rel="stylesheet" href="https://presskitty.fwd.wf/styles/Template-Miller.css">
        `;

        const css = `<style>${cssStyles}</style>`;

        const pageData = {
            page: {
                author: "Press Kitty",
                body_html: linktag + css + markup,
                title: "Press",
                published: true
            }
        };

        // See if Store object has a `pageId`
        if (store.pageId) {
            console.log(
                `Updating Existing Press Kit with pageId ${store.pageId} for Store ID: ${store.id} `
            );
            // If it does, update the contents of the page with that id
            Shopify.put(`/admin/pages/${store.pageId}.json`, pageData, function(
                err,
                data
            ) {
                if (err) return res.serverError(err);
                else {
                    Stores.update(store.id, { pageId: data.page.id })
                        .then(() => {
                            return res.json(data);
                        })
                        .catch(err => {
                            return res.serverError(err);
                        });
                }
            });
        } else {
            console.log(`Publishing New Press Kit for Store ID: ${store.id} `);
            // If it does not, create a new page, get the new page ID and store it.
            Shopify.post("/admin/pages.json", pageData, function(err, data) {
                if (err) return res.serverError(err);
                else {
                    Stores.update(store.id, { pageId: data.page.id })
                        .then(() => {
                            req.session.store = store;
                            res.locals.nonce = store.nonce;
                            return res.json(data);
                        })
                        .catch(err => {
                            return res.serverError(err);
                        });
                }
            });
        }
    }
};
