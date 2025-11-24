import { Inngest } from "inngest";
import connectDB from "./db";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

//Inngest Function to save user data to a database
export const syncUserCreation = inngest.createFunction(
    {
        id: 'sync-user-from-clerk',
    },
    {
        event: 'clerk/user.created'
    },
    async ({ event }) => {
        const { id, first_name, last_name, email, imageUrl } = event.data;
        const userData = {
            _id: id,
            email: email_address[0].email_address,
            name: first_name + " " + last_name,
            imageUrl: imageUrl
        }
        await connectDB();
        await User.create(UserData);
    }
)

//Inngest function to update user data in database
export const syncUserUpdation = inngest.createFunction(
    {
        id: 'update-user-from-clerk'
    },
    {
        event: 'clerk/user.updated'
    },
    async ({ event }) => {
        const { id, first_name, last_name, email, imageUrl } = event.data;
        const userData = {
            _id: id,
            email: email_address[0].email_address,
            name: first_name + " " + last_name,
            imageUrl: imageUrl
        }
        await connectDB();
        await User.findByIdAndUpdate(id, userData);
    }
)

//Inngest function to delete user data from database
export const syncUserDeletion = inngest.createFunction(
    {
        id: 'delete-user-with-clerk'
    },
    {
        event: 'clerk/user.deleted'
    },
    async ({ event }) => {
        const { id } = event.data;
        await connectDB();
        await User.findByIdAndDelete(id);
    }
)