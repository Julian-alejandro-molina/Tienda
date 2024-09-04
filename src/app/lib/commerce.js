const Commerce = require('@chec/commerce.js');

const checAPIKey = 'pk_test_581733b81c4f38c1f22263a9c1254f0a2b5606fc6e2df';
const devEnvironment = process.env.NODE_ENV === 'development';

const commerceConfig = {
  axiosConfig: {
    headers: {
      'X-Chec-Agent': 'commerce.js/v2',
      'Chec-Version': '2021-09-29',
    },
  },
};

if (devEnvironment && !checAPIKey) {
  throw new Error('Your public API key must be provided as an environment variable named NEXT_PUBLIC_CHEC_PUBLIC_KEY. Obtain your Chec public key by logging into your Chec account and navigate to Setup > Developer, or can be obtained with the Chec CLI via with the command chec whoami');
}

//const commerce = new Commerce(checAPIKey, devEnvironment, commerceConfig);
const commerce = new Commerce(checAPIKey);


module.exports = commerce;