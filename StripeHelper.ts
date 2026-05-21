type PaywallConfig = {
    paymentRequired: boolean;
    developmentFree: boolean;
    stripeConfigured: boolean;
    amountLabel: string;
};

type CheckoutSession = {
    id?: string;
    url?: string;
    status?: string;
    payment_status?: string;
};

const stripeApiBase = "https://api.stripe.com/v1";

function getBusinessKitPaywallConfig(): PaywallConfig {
    const forcePaywall = process.env.STRIPE_FORCE_PAYWALL === "true";
    const developmentFree = process.env.NODE_ENV !== "production" && !forcePaywall;
    const paywallEnabled = process.env.STRIPE_PAYWALL_ENABLED === "true" || forcePaywall;
    const stripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_PRICE_ID);

    return {
        paymentRequired: paywallEnabled && !developmentFree,
        developmentFree,
        stripeConfigured,
        amountLabel: process.env.STRIPE_AMOUNT_LABEL ?? "One-time report access",
    };
}

async function createBusinessKitCheckoutSession(baseUrl: string): Promise<{ id: string; url: string }> {
    const config = getBusinessKitPaywallConfig();

    if (!config.paymentRequired) {
        throw new Error("Payment is not required in this environment.");
    }

    const secretKey = process.env.STRIPE_SECRET_KEY;
    const priceId = process.env.STRIPE_PRICE_ID;

    if (!secretKey || !priceId) {
        throw new Error("Stripe paywall is enabled, but STRIPE_SECRET_KEY or STRIPE_PRICE_ID is missing.");
    }

    const normalizedBaseUrl = baseUrl.replace(/\/+$/g, "");
    const params = new URLSearchParams({
        mode: "payment",
        success_url: `${normalizedBaseUrl}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${normalizedBaseUrl}/?payment=cancelled`,
        "line_items[0][price]": priceId,
        "line_items[0][quantity]": "1",
        "metadata[product]": "business_growth_kit",
    });

    const response = await fetch(`${stripeApiBase}/checkout/sessions`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${secretKey}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
    });

    const body = await response.json() as CheckoutSession & { error?: { message?: string } };

    if (!response.ok || !body.id || !body.url) {
        throw new Error(body.error?.message ?? "Stripe did not return a checkout session.");
    }

    return {
        id: body.id,
        url: body.url,
    };
}

async function validatePaidCheckoutSession(sessionId: string | undefined): Promise<boolean> {
    const config = getBusinessKitPaywallConfig();

    if (!config.paymentRequired) {
        return true;
    }

    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey || !sessionId) {
        return false;
    }

    const response = await fetch(`${stripeApiBase}/checkout/sessions/${encodeURIComponent(sessionId)}`, {
        headers: {
            Authorization: `Bearer ${secretKey}`,
        },
    });

    if (!response.ok) {
        return false;
    }

    const body = await response.json() as CheckoutSession;
    return body.payment_status === "paid" && body.status === "complete";
}

export {
    createBusinessKitCheckoutSession,
    getBusinessKitPaywallConfig,
    validatePaidCheckoutSession,
};

export type {
    PaywallConfig,
};
