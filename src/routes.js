const routes = require('express').Router();
const multer = require('multer')
const multerConfig = require('./config/multer');
const fs = require('fs');
const arq = require('./models/arq');

routes.post('/add/file', multer(multerConfig).single('file'), async (req, res) => {
    const post = await arq.create({
        name: req.file.originalname,
        size: req.file.size,
        key: req.file.filename,
        arquivo: req.body.imagem
    })
    return res.json(post);
});

routes.get('/download/file/:file', async (req, res) => {
    res.download(`./uploads/${req.params.file}`)
});

routes.get("/list/file", async (req, res) => {
    try {
        const files = await arq.find();
        return res.send({ files });
    } catch (error) {
        res.status(400).send({ error: "failed get files" });
    }
});

routes.delete('/delet/file/:key', async (req, res) => {
    try {
        arq.findOneAndDelete({ key: req.params.key })
            .then(resp => {
                fs.unlink(`uploads/${req.params.key}`, function (err) {
                    if (err) throw err;
                });
                return res.send({ msg: "Removido com sucesso" })
            })
            .catch(err => {
                console.log(err)
                return res.send({ msg: "Erro ao remover arquivo" })
            })
    } catch (error) {
        return res.status(500).send({
            status: false,
            msg: 'Error performing request',
            error: err
        });
    }
});

routes.get('/get/file/:id', async (req, res) => {
    try {
        arq.findOne({ _id: req.params.id })
            .then(resp => {
                return res.send(resp)
            })
            .catch(err => {
                return res.send({ msg: "./pages/view-files" })
            })
    } catch (error) {
        return res.status(500).send({
            status: false,
            msg: 'Error performing request',
            error: err
        });
    }
});

routes.post('/update/file/:id', async (req, res) => {
    try {
        var query = {_id: req.params.id}
        arq.findOneAndUpdate(query, { name: req.headers.name })
            .then(resp => {
                return res.send({ msg: "./pages/view-files" })
            })
            .catch(err => {
                console.log(err)
                return res.send({ msg: "Erro ao remover arquivo" })
            })
    } catch (error) {
        return res.status(500).send({
            status: false,
            msg: 'Error performing request',
            error: err
        });
    }
});


module.exports = routes;