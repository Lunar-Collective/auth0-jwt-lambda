# auth0-jwt-lambda
Quickly integrate Auth0 into your serverless lambda function

## Background
The current instructions for integrating Auth0 depend on the usage of an express server. This package wraps the instructions and make an easy implementation that can be used for any node backend. A common use case may be a lambda serverless function.


## How to use
This is a pretty straightforward package to use. It contains a single function with 2 required parameters -- token and the domain. There are several optional parameters that you can also pass to give more control for auth0.

**Example**


    const authVerify = require('auth0-jwt-lambda');

    const verifiedPromise = authVerify.verify(request.headers.authorization.replace("Bearer ", ""), env.process.AUTH0_DOMAIN);
 
    verifiedPromise.then(userInfo => {
      console.log(userInfo);
    }).catch(err => {
      console.log(err);
    });
 
