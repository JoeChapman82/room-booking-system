module.exports = {
    // base redirects
    index: (req, res) => res.redirect('/'),
    choose: (req, res) => res.redirect('/choose'),
    book: (req, res) => res.redirect(`/book/${req.params.id}`),
    changeBookDate: (req, res) => res.redirect(`/book/${req.params.id}?dateDay=${req.body.dateDay}&dateMonth=${req.body.dateMonth}&dateYear=${req.body.dateYear}`),
    bookCancel: (req, res) => res.redirect(`/book/${req.params.id}`),
    cancelled: (req, res) => res.redirect('/cancelled'),
    goneWrong: (req, res) => res.redirect('/errors/somethings-gone-wrong'),
    // admin redirects
    adminHome: (req, res) => res.redirect('/admin/home'),
    adminSearchResults: (req, res) => res.redirect(`/admin/search-results?search=${res.locals.searchCriteria}`),
    adminNoResults: (req, res) => res.redirect('/admin/no-results'),
    // super redirects
    superHome: (req, res) => res.redirect('/super/home')

};
