import express from 'express';

export function signinService(app: express.Application) {

    /** Sign in service. */
    app.route('/signin')
        .post((req, res) => {
            if (req.body === 'password') {
                req.session['signedIn'] = true;
                res.status(200);
                res.json({success: true});
            } else {
                res.status(403);
                req.session = null;
                res.json({error: 'Incorrect password'});
            }
        })
        .get((req, res) => {
            res.json({success: !!req.session['signedIn']});
        });
}
