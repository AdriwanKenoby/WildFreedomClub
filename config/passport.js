const passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;
User = require('../DB/models/users');

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

passport.use('local-signin', new LocalStrategy({ usernameField: 'email', passReqToCallback : true },
function(req, email, password, done) {
	User.findOne({ email: email }, function(err, user) {
		if (err) { return done(err); }
		if (!user) {
			return done(null, false, { message: 'Incorrect username' });
		}
		if (!user.validPassword(password)) {
			return done(null, false, { message: 'Incorrect password' });
		}
		return done(null, user);
	});
}
));

passport.use('local-signup', new LocalStrategy(
	{
		usernameField: 'email',
		passReqToCallback : true
	}, (req, email, password, done) => {
		User.findOne( { $or: [{ email: email }, {username: req.body.username}] }, (err, user) => {
			if(err) { return done(err) }

			if(user) {
				return done(null, false, { message: 'An account with this email or username already exist' });
			}

			var newUser = new User();
			newUser.username = req.body.username;
			newUser.password = password;
			newUser.email = email;
			newUser.save((err) => {
				if(err) {
					return done(null, false, { message: 'User validation error' });
				}
				return done(null, newUser);
			});
		});
	}
));

module.exports = passport;
