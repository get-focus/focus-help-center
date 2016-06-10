import express from 'express';

export function signinService(app: express.Application) {

    /** Sign in service. */
    app.route('/signin')
        .post((req, res) => {
            if (req.body === 'password') {
                req.session['signedIn'] = true;
                res.json({success: true});
            } else {
                req.session = null;
                res.json({error: 'Incorrect password'});
            }
        })
        .get((req, res) => {
            res.json({success: !!req.session['signedIn']});
        });
}
