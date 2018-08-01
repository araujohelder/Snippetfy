const { Snippet, Category } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      const { categoryId } = req.params;
      const snippet = await Snippet.create({ ...req.body, CategoryId: categoryId });
      req.flash('success', 'Snippet criado com sucesso');
      return res.redirect(`/app/categories/${categoryId}/snippets/${snippet.id}`);
    } catch (err) {
      return next(err);
    }
  },
  async show(req, res, next) {
    try {
      const { categoryId, id } = req.params;
      const snippet = await Snippet.findById(id);
      const categories = await Category.findAll({
        include: [Snippet],
        where: {
          UserId: req.session.user.id,
        },
      });
      const snippets = await Snippet.findAll({
        where: {
          CategoryId: categoryId,
        },
      });
      return res.render('snippets/show', {
        activeCategory: categoryId,
        categories,
        snippets,
        currentSnippet: snippet,
      });
    } catch (err) {
      return next(err);
    }
  },
};
