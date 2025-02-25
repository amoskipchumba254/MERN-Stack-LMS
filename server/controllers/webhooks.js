import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to Manage Clerk User with database
const clerkWebhooks = async (req, res) => {
    try {
        const Whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        const payload = req.body.toString(); // Convert buffer to string

        await Whook.verify(payload, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        const { data, type } = JSON.parse(payload);

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_address?.[0]?.email_address || '',
                    name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                    imageUrl: data.image_url || '',
                };
                await User.create(userData);
                res.json({});
                break;
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_address?.[0]?.email_address || '',
                    name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                    imageUrl: data.image_url || '',
                };
                await User.findByIdAndUpdate(data.id, userData);
                res.json({});
                break;
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                res.json({});
                break;
            }

            default:
                return res.status(400).json({ success: false, message: "Unhandled event type" });
        }

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export { clerkWebhooks };
