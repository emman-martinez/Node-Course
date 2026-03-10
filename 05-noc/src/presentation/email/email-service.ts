import * as nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";

interface SendEmailOptions {
  to: string;
  subject: string;
  htmlBody: string;
  // todo: attachments
}

// todo: Attachment

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, htmlBody } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
      });

      console.log("Email sent:", sentInformation);

      return true;
    } catch (error) {
      console.error("Failed to send email:", error);
      return false;
    }
  }
}
