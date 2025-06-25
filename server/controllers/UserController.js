import { Webhook } from "svix";
import userModel from "../models/userModel.js";

// //API controller function to manage clerk user with the database

//http://localhost:4000/api/user/webhooks

// const clerkWebhooks = async (req, res) => {
//   try {
//     //create a svix instance with clerk webhook secret
//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//     await whook.verify(JSON.stringify(req.body), {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     });

//     const { data, type } = req.body;

//     switch (type) {
//       case "user.created": {
//         const userData = {
//           clerkId: data.id,
//           email: data.email_addresses[0].email_address,
//           firstName: data.first_name,
//           lastName: data.last_name,
//           photo: data.image_url,
//           creditBalance: 5,
//         };

//         await userModel.create(userData);
//         res.json({});
//         return;

//         //break;
//       }

//       case "user.updated": {
//         const userData = {
//           email: data.email_addresses[0].email_address,
//           firstName: data.first_name,
//           lastName: data.last_name,
//           photo: data.image_url,
//         };

//         await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
//         res.json({});
//         return;
//         //break;
//       }

//       case "user.deleted": {
//         await userModel.findOneAndDelete({ clerkId: data.id });
//         res.json({});
//         return;
//         //break;
//       }
//     }
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// //API Controller function to get user available credits data
// const userCredits = async(req, res) => {
//     try{

//         const {clerkId} = req.body

//         const userData = await userModel.findOne({clerkId})

//         res.json({success : true, credits: userData.creditBalance})

//     }catch(error){
//         console.log(error.message)
//         res.json({success:false,message:error.message})
//     }
// }
console.log("before");
const clerkWebhooks = async (req, res) => {
  console.log("🚨 WEBHOOK CALLED AT:", new Date().toISOString());
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SIGNING_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        console.log("Webhook received for user creation:", data.id);
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
          creditBalance: 5,
        };
        console.log("Attempting to create user with data:", userData);

        await userModel.findOneAndUpdate(
          { clerkId: data.id }, // Find by clerkId
          userData, // Update with this data
          {
            upsert: true, // Create if doesn't exist
            new: true, // Return updated document
          }
        );
        res.json({ success: true });
        return; // CRITICAL: Add this
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        res.json({ success: true });
        return; // CRITICAL: Add this
      }

      case "user.deleted": {
        console.log("deleted");
        await userModel.findOneAndDelete({ clerkId: data.id });
        res.json({ success: true });
        return; // CRITICAL: Add this
      }

      default: {
        res.json({ success: true }); // Handle unknown events
        return;
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message }); // Use 500 status
  }
};

const userCredits = async (req, res) => {
  try {
    const { clerkId } = req.body;

    const userData = await userModel.findOne({ clerkId });

    res.json({ success: true, credits: userData.creditBalance });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export { clerkWebhooks, userCredits };
