// import { ENV_VARS } from './env';

// const stripe = require('stripe')(ENV_VARS.STRIPE_API_KEY);

// stripe.products.create({
//   name: 'Starter Subscription',
//   description: '$12/Month subscription',
// }).then((product: { id: string; }) => {
//   stripe.prices.create({
//     unit_amount: 1200,
//     currency: 'usd',
//     recurring: {
//       interval: 'month',
//     },
//     product: product.id,
//   }).then((price: { id: string; }) => {
//     console.log('Success! Here is your starter subscription product id: ' + product.id);
//     console.log('Success! Here is your starter subscription price id: ' + price.id);
//   });
// });
