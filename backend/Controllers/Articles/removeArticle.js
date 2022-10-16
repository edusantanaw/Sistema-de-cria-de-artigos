const verifyId = require('../../helper/verifyId')
const Article = require('../../models/Articles')
const checkExists = require('../../helper/check-exists')
const updateTotArticles = require('./updateCategory')

const removeArticleById = async (req, res) => {
    const { id } = req.params

    try {
        verifyId(id, 'O id é invalido')
        
        const article = await Article.findOne({ _id: id })
        checkExists(article, 'Artigo não encontrado!') 

        console.log('ola')

        await updateTotArticles(article.category)
        await Article.findOneAndDelete({ _id: id })
        res.status(200).send('Artigo deletado com sucesso!')

    } catch (msg) {
        res.status(400).send(msg)
    }

}

module.exports = removeArticleById