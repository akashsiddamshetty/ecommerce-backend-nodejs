const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_KEY)

router.post('/payment', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: req.body.amount,
          },
        ],
        mode: 'payment',
        success_url: `http://localhost:3000/ecommerce-frontend-react/success`,
        cancel_url: `http://localhost:3000/ecommerce-frontend-react/cancelled`,
      });
      res.redirect(303, session.url);
    
})

module.exports = router