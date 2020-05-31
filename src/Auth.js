const Auth = require('express').Router();
const user = require('./models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

Auth.post('/api/login', async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(500).send({ error: 'Fill in the login and password correctly' });
        }

        const auth = await user.findOne({ email });

        if (!auth)
            return res.status(500).send({ error: 'User not exists' });

        if (! await bcrypt.compare(password, auth.password))
            return res.status(500).send({ error: 'Invalid password' });

        const token = auth.id;

        return res.status(200).send({ status: true, name: auth.name, token: token });

    } catch (err) {
        return res.status(500).send({
            errp: err,
            status: false,
            msg: 'Error performing request',
        });
    }
})

Auth.post('/api/register', async (req, res) => {
    try {
        user.findOne({ email: req.body.email })
            .then(resp => {
                if (resp != undefined) {
                    return res.status(500).send({
                        status: false,
                        msg: 'User exist',
                    });
                } else {
                    const passwordHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)
                    req.body.password = passwordHash;

                    user.create(req.body)
                        .then((resp) => {
                            return res.status(200).send({
                                status: true,
                                msg: 'User created successfully',
                            });
                        }).catch((err) => {
                            return res.status(500).send({
                                status: false,
                                msg: 'Error create user',
                                error: err
                            });
                        })
                }
            }).catch((error) => {
                var validation = validationForm(req, res)

                if (validation) {
                    const passwordHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)
                    req.body.password = passwordHash;

                    user.create(req.body)
                        .then((resp) => {
                            return res.status(200).send({
                                status: true,
                                msg: 'User created successfully',
                            });
                        }).catch((err) => {
                            return res.status(500).send({
                                status: false,
                                msg: 'Error create user',
                                error: err
                            });
                        })
                }
            });

    } catch (err) {
        return res.status(500).send({
            status: false,
            msg: 'Error performing request',
            error: err
        });
    }
})

module.exports = Auth