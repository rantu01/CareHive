import { NextResponse } from "next/server"
import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY)


export const POST = async (req) => {

    try {
        const data = await req.json();

        const customer = await stripe.customers.create({
            address: {
                city: "Sylhet",
                country: "BD",
                line1: "1782360372",
                postal_code: "3183",
                state: "Sylhet",
            },
            name: "John Doe",
        });


        const checkoutSession = await stripe.checkout.sessions.create(


            {
                payment_method_types: ['card'],
                mode: 'payment',
                customer: customer.id,
                line_items: [
                    {
                        quantity: 1,
                        price_data: {
                            product_data: {
                                name: data.name,
                            },
                            currency: "BDT",
                            unit_amount: data.price * 100

                        }
                    }
                ],

                // Important: pass metadata here
                metadata: {
                    name:data.name,
                    userEmail:data.userEmail,
                    price:data.price,
                    subscrtiptionType:data?.subscrtiptionType,
                    paymentType:data?.paymentType,
                    userId:data?.userId

                },

                success_url: `https://care-hive-chi.vercel.app/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `https://care-hive-chi.vercel.app/payment-cancel`,
            }
        )

        // session id 

        return NextResponse.json({ success: true, url: checkoutSession.url })
    } catch (error) {
        return NextResponse.json({ "error": error })
    }
}

