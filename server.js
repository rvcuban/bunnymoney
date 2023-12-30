const express = require('express');
const stripe = require('stripe')('sk_test_51ORgOgEV9xF2ubpH6HJ8AHCmjTcnxYiRQel5ys4j4EEPT71BxcfJwY8qQI5sJHwYy9nx3sqfsH1CA63uBNq02Azf00AONlCNpD');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.')); // Ahora sirviendo archivos desde la raíz del proyecto


app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: 'Recarga de Monedas',
                    },
                    unit_amount: 1000, // El precio, por ejemplo, 10.00 EUR (1000 centavos)
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'http://localhost:3000/success', // Redirigir aquí después de un pago exitoso
            cancel_url: 'http://localhost:3000/cancel', // Redirigir aquí si el usuario cancela
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});




// Ruta para crear una intención de pago
app.post('/create-payment-intent', async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000, // Ajusta este monto según necesites
            currency: 'eur', // Asegúrate de usar la moneda correcta
        });
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Error en create-payment-intent:", error);
        res.status(500).send({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});