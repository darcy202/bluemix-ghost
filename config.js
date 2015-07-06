// # Ghost Configuration
// Setup your Ghost install for various environments
// Documentation can be found at http://support.ghost.org/config/

var path = require('path'),
    config;

// my app config
var myapp = {};
myapp.port = (process.env.VCAP_APP_PORT || '2368');
myapp.host = (process.env.VCAP_APP_HOST || '127.0.0.1');
myapp.protocol = 'https://';

if (process.env.VCAP_APPLICATION != undefined) {
    var vcap_application = JSON.parse(process.env.VCAP_APPLICATION);
    myapp.route = vcap_application.application_uris[0];
}

if (process.env.VCAP_SERVICES != undefined) {
    var vcap_services = JSON.parse(process.env.VCAP_SERVICES);

    if (vcap_services.cleardb != undefined) {
        myapp.mysql = vcap_services.cleardb[0].credentials;
    } else {
        console.error('Cannot find cleardb service');
        process.exit(1);
    }

    if (vcap_services.sendgrid != undefined) {
        myapp.sendgrid = vcap_services.sendgrid[0].credentials;
    } else {
        console.error('Cannot find sendgrid service');
        process.exit(1);
    }
}

if (process.env.CLOUDINARY != undefined)
    myapp.cloudinary = JSON.parse(process.env.CLOUDINARY);

// end: my app config


config = {
    // ### Production
    // When running Ghost in the wild, use the production environment
    // Configure your URL and mail settings here
    production: {
        url: myapp.protocol + myapp.route,
        mail: {
            transport: 'SMTP',
            options: {
                service: 'Sendgrid',
                auth: {
                    user: myapp.sendgrid.username,
                    pass: myapp.sendgrid.password
                }
            }
        },
        database: {
          client: 'mysql',
          connection: {
            host: myapp.mysql.hostname,
            port: myapp.mysql.port,
            user: myapp.mysql.username,
            password: myapp.mysql.password,
            database: myapp.mysql.name,
            charset: 'utf8'
          },
          pool: {
            min: 2,
            max: 2
          }
        },
        // UNCOMMENT TO USE CLOUDINARY FILE STORE
        // CREATE AN ACCOUNT AT http://cloudinary.com/
        // CREATE CLOUDINARY ENVIRONMENT VAR WITH CREDENTIALS, E.G.:
        // CLOUDINARY='{"cloud_name":"...", "api_key":"...", "api_secret":"..."}'
        // storage: {
        //     active: 'ghost-cloudinary-store',
        //     'ghost-cloudinary-store': {
        //         cloud_name: myapp.cloudinary.cloud_name,
        //         api_key: myapp.cloudinary.api_key,
        //         api_secret: myapp.cloudinary.api_secret
        //     }
        // },
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: myapp.host,
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: myapp.port
        },
        forceAdminSSL: true
    },

    // ### Development **(default)**
    development: {
        // The url to use when providing links to the site, E.g. in RSS and email.
        // Change this to your Ghost blogs published URL.
        url: 'http://localhost:2368',

        // Example mail config
        // Visit http://support.ghost.org/mail for instructions
        // ```
        //  mail: {
        //      transport: 'SMTP',
        //      options: {
        //          service: 'Mailgun',
        //          auth: {
        //              user: '', // mailgun username
        //              pass: ''  // mailgun password
        //          }
        //      }
        //  },
        // ```

        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-dev.db')
            },
            debug: false
        },
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '127.0.0.1',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '2368'
        },
        paths: {
            contentPath: path.join(__dirname, '/content/')
        }
    },

    // **Developers only need to edit below here**

    // ### Testing
    // Used when developing Ghost to run tests and check the health of Ghost
    // Uses a different port number
    testing: {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-test.db')
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    },

    // ### Testing MySQL
    // Used by Travis - Automated testing run through GitHub
    'testing-mysql': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'mysql',
            connection: {
                host     : '127.0.0.1',
                user     : 'root',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    },

    // ### Testing pg
    // Used by Travis - Automated testing run through GitHub
    'testing-pg': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'pg',
            connection: {
                host     : '127.0.0.1',
                user     : 'postgres',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    }
};

// Export config
module.exports = config;
