<a href="https://github.com/TryGhost/Ghost"><img src="https://cloud.githubusercontent.com/assets/120485/6622822/c4c639fe-c8e7-11e4-9e64-5bec06c8b4c3.png" alt="Ghost" /></a>

![Ghost Screenshot](https://cloud.githubusercontent.com/assets/120485/6626466/6dae46b2-c8ff-11e4-8c7c-8dd63b215f7b.jpg)

![Ghost is a simple, powerful publishing platform that allows you to share your stories with the world.](https://cloud.githubusercontent.com/assets/120485/6626501/b2bb072c-c8ff-11e4-8e1a-2e78e68fd5c3.png)

[Find full details on Ghost here](https://github.com/tryghost/Ghost)


# Quick Start Install

Make sure you've installed Node.js - We recommend the latest **Node v0.10.x** release.

Ghost is also compatible with **Node v0.12** and **io.js v1.2**, but please note that these versions are more likely to run into installation problems. May contain nuts. Please use the [forum](https://ghost.org/forum/installation/) for help.

1. Download this repo
1. Fire up a terminal
1. `npm install --production`
1. Start Ghost!
    - Local environment: `npm start`
    - On a server: `npm start --production`
1. `http://localhost:2368/ghost` :tada:

More [install docs](http://support.ghost.org/installation/) here in case you got stuck.

<a name="getting-started"></a>


# Deploying Ghost to IBM Bluemix


[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/darcy202/bluemix-ghost)


Or download this repo and run:

1. `cf create-space myblog`
1. `cf target -s myblog`
1. `cf create-service cleardb spark ghost-mysql-db`
1. `cf create-service sendgrid free ghost-sendgrid`
1. `cf push ghost --random-route`


Any image uploads will be lost on app restart, as the file system is not persisted. If you need image/file storage you can:

1. create an account at http://cloudinary.com
1. uncomment the cloudinary config in config.js (look for // UNCOMMENT TO USE CLOUDINARY FILE STORE)
1. create an environment variable containing your cloudinary credentials, in the format of:

`CLOUDINARY='{"cloud_name":"...", "api_key":"...", "api_secret":"..."}'`

`cf set-env ghost CLOUDINARY '{"cloud_name":"...", "api_key":"...", "api_secret":"..."}'`

1. push update and restart app

`cf push ghost`