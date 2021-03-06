module.exports = {
    // base renders
    index: (req, res) => res.render('index'),
    choose: (req, res) => res.render('user/choose'),
    overview: (req, res) => res.render('user/overview'),
    check: (req, res) => res.render('user/check'),
    book: (req, res) => res.render('user/book'),
    cancel: (req, res) => res.render('user/cancel'),
    cancelled: (req, res) => res.render('user/cancelled'),
    parkingGive: (req, res) => res.render('user/parking-give'),
    parkingTake: (req, res) => res.render('user/parking-take'),
    parkingTakeConfirm: (req, res) => res.render('user/parking-take-confirm'),
    parkingVisitor: (req, res) => res.render('user/parking-visitor'),
    parkingVisitorConfirm: (req, res) => res.render('user/parking-visitor-confirm'),
    parkingCancel: (req, res) => res.render('user/parking-cancel'),
    login: (req, res) => res.render('user/login'),
    trainingSession: (req, res) => res.render('user/training-session'),
    trainingBook: (req, res) => res.render('user/training-book'),
    trainingCancel: (req, res) => res.render('user/training-cancel'),
    goneWrong: (req, res) => res.render('errors/somethings-gone-wrong'),
    // admin renders
    adminHome: (req, res) => res.render('admin/home'),
    adminBooking: (req, res) => res.render('admin/booking'),
    adminBookingCancelled: (req, res) => res.render('admin/booking-cancelled'),
    adminCreateRoom: (req, res) => res.render('admin/create-room'),
    adminEditRoom: (req, res) => res.render('admin/edit-room'),
    adminInviteUser: (req, res) => res.render('admin/invite-user'),
    adminSearchResults: (req, res) => res.render('admin/search-results'),
    adminTrainingOverview: (req, res) => res.render('admin/training-overview'),
    adminNoResults: (req, res) => res.render('admin/no-results'),
    // super renders
    superHome: (req, res) => res.render('super/home'),
    superSeed: (req, res) => res.render('super/seed'),
    superInviteUser: (req, res) => res.render('super/invite-user'),
    superCreateRoom: (req, res) => res.render('super/create-room'),
    superEditRoom: (req, res) => res.render('super/edit-room'),
    superCreateBooking: (req, res) => res.render('super/create-booking'),
    superManageUsers: (req, res) => res.render('super/manage-users'),
    superClearOldBookings: (req, res) => res.render('super/clear-old-bookings'),
    // other renders
    newUser: (req, res) => res.render('user/new-user')
};
