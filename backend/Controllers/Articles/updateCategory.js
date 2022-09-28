const Article = require('../../models/Articles')
const Category = require('../../models/Category')

const updateTotArticles = async (categoryName) =>{

    const count = await Article.count({category: categoryName})
    const category = await Category.findOne({name: categoryName}) 
    
    category.totArticles = count
    
    await Category.findOneAndUpdate(
        { _id: category.id },
        { $set: category },
        { new: true }
    )
}

module.exports = updateTotArticles