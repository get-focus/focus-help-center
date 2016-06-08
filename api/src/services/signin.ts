import express from 'express';

export function signinService(app: express.Application) {

    /** Sign in service. */
    app.route('/signin')
        .post((req, res) => {
            if (req.body === 'password') {
                req.session['signedIn'] = true;
                res.status(200);
                res.send('Authentification successful');
            } else {
                res.status(403);
                req.session = null;
                res.send('Incorrect password');
            }
        })
        .get((req, res) => {
            if (req.session['signedIn']) {
                res.send('Connected');
            } else {
                res.send('Not connected');
            }
        });
}
