import { after } from "next/server";

// Example API route demonstrating the 'after' API for background tasks
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // Validate input
    if (!name || !email || !message) {
      return Response.json(
        { error: "Name, email and message are required" },
        { status: 400 },
      );
    }

    // Simulate main processing
    const submissionId = `submission_${Date.now()}`;

    // Background tasks that don't block the response
    after(async () => {
      // Simulate logging to analytics
      console.log("📊 Analytics: New form submission", {
        submissionId,
        name,
        email,
        subject: subject || "No subject",
        timestamp: new Date().toISOString(),
      });

      // Simulate sending notification email (this would be real in production)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(
        "📧 Email notification sent to admin about submission:",
        submissionId,
      );

      // Simulate updating database statistics
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("📈 Database stats updated for submission:", submissionId);
    });

    // Return immediate response (background tasks continue running)
    return Response.json({
      success: true,
      submissionId,
      message: "Thank you for your submission! We will get back to you soon.",
    });
  } catch (error) {
    console.error("Error processing form submission:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
