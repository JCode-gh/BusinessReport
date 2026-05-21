import dotenv from "dotenv";
dotenv.config();
import {createBusinessKit} from "./BusinessKitHelper.js";
import {buildBusinessKitHtml} from "./BusinessKitReportBuilder.js";
import {
    createBusinessKitCheckoutSession,
    getBusinessKitPaywallConfig,
    validatePaidCheckoutSession,
} from "./StripeHelper.js";
import express from "express";
import path from "node:path";
import {existsSync} from "node:fs";
import {fileURLToPath} from "node:url";
import type { Request, Response } from "express";

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDistPath = path.join(__dirname, "frontend", "dist");

app.use(express.json({limit: "1mb"}));

app.get("/api/paymentConfig", (_req: Request, res: Response) => {
    res.json(getBusinessKitPaywallConfig());
});

app.post("/api/createCheckoutSession", async (req: Request, res: Response) => {
    const config = getBusinessKitPaywallConfig();

    if (!config.paymentRequired) {
        return res.json({
            paymentRequired: false,
            developmentFree: config.developmentFree,
        });
    }

    if (!config.stripeConfigured) {
        return res.status(500).json({
            error: "Stripe paywall is enabled, but STRIPE_SECRET_KEY or STRIPE_PRICE_ID is missing.",
        });
    }

    try {
        const session = await createBusinessKitCheckoutSession(appBaseUrl(req));
        res.json({
            paymentRequired: true,
            sessionId: session.id,
            url: session.url,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Could not start Stripe checkout.",
            details: error instanceof Error ? error.message : String(error),
        });
    }
});

app.post("/api/createBusinessKit", async (req: Request, res: Response) => {
    if (!hasBusinessContext(req.body)) {
        return res.status(400).json({
            error: "Send at least a business type, offer, audience, problem, or goal."
        });
    }

    try {
        const paywall = getBusinessKitPaywallConfig();
        const paymentSessionId = typeof req.body.paymentSessionId === "string" ? req.body.paymentSessionId : undefined;

        if (paywall.paymentRequired) {
            if (!paywall.stripeConfigured) {
                return res.status(503).json({
                    error: "Report payment is required, but Stripe is not configured.",
                    paymentRequired: true,
                });
            }

            const paid = await validatePaidCheckoutSession(paymentSessionId);

            if (!paid) {
                return res.status(402).json({
                    error: "Payment is required before the full report can be generated.",
                    paymentRequired: true,
                });
            }
        }

        const kit = await createBusinessKit(req.body);
        const html = buildBusinessKitHtml(kit);
        const fileName = `${slugify(kit.title)}.html`;

        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.setHeader("Content-Disposition", `inline; filename="${fileName}"`);
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Could not create the business kit.",
            details: error instanceof Error ? error.message : String(error)
        });
    }
});

if (existsSync(frontendDistPath)) {
    app.use(express.static(frontendDistPath));
    app.get(/.*/, (_req: Request, res: Response) => {
        res.sendFile(path.join(frontendDistPath, "index.html"));
    });
}

const server = app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
});

process.on("SIGTERM", () => {
    server.close();
});

function slugify(value: string): string {
    const slug = value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    return slug || "business-kit";
}

function hasBusinessContext(value: unknown): boolean {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
        return false;
    }

    const body = value as Record<string, unknown>;
    const keys = ["businessType", "offer", "audience", "problem", "goal"];

    return keys.some((key) => typeof body[key] === "string" && body[key].trim().length > 0);
}

function appBaseUrl(req: Request): string {
    const configuredBaseUrl = process.env.APP_BASE_URL;

    if (configuredBaseUrl && configuredBaseUrl.trim().length > 0) {
        return configuredBaseUrl.trim();
    }

    const origin = req.get("origin");

    if (origin && origin.trim().length > 0) {
        return origin.trim();
    }

    return `http://localhost:${PORT}`;
}
