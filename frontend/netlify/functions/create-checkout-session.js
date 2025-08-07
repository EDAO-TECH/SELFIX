const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const prices = {
  home: 'price_xxx_home',        // Replace with your actual Stripe price IDs
  pro: 'price_xxx_pro',
  team: 'price_xxx_team',
  healing_modules: 'price_addon_1',
  rollback_engine: 'price_addon_2',
  ai_chat: 'price_addon_3',
  book_forgiveness: 'price_addon_4',
  self_audit: 'price_addon_5',
  sandbox: 'price_addon_6',
  sdk: 'price_addon_7',
};

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { package: selectedPackage, selectedAddons = [], seats = 1 } = body;

    const line_items = [];

    if (prices[selectedPackage]) {
      const isPerSeat = selectedPackage === 'team';
      line_items.push({
        price: prices[selectedPackage],
        quantity: isPerSeat ? seats : 1,
      });
    }

    selectedAddons.forEach((addon) => {
      if (prices[addon]) {
        line_items.push({
          price: prices[addon],
          quantity: 1,
        });
      }
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: 'https://www.selfix.pro/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://www.selfix.pro/cancel',
      metadata: {
        selectedPackage,
        selectedAddons: selectedAddons.join(','),
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (err) {
    console.error('Stripe session error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create Stripe session' }),
    };
  }
};
