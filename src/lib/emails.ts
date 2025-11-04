import { Client, SendEmailV3_1, LibraryResponse } from 'node-mailjet';

const mailjet = new Client({
  apiKey: process.env.MJ_APIKEY_PUBLIC,
  apiSecret: process.env.MJ_APIKEY_PRIVATE
});

export async function sendMagicLinkEmail(to: string, magicLink: string) {
  return sendDefaultEmail(to, "Magic Link for ZeroMRR", `<p>Click <a href="${magicLink}">here</a> to login to your ZeroMRR account.</p>`, `Click here to login to your ZeroMRR account: ${magicLink}`);
}

export async function sendDefaultEmail(to: string, subject: string, htmlContent: string, textContent: string) {
  return sendEmail({ email: "noreply@account.zeromrr.app", name: "ZeroMRR" }, to, { email: "contact@kaotech.io", name: "ZeroMRR" }, subject, htmlContent, textContent);
}

export async function sendEmail(from: { email: string, name: string }, to: string, replyTo: { email: string, name: string }, subject: string, htmlContent: string, textContent: string) {
  const data: SendEmailV3_1.Body = {
    Messages: [
      {
        From: {
          Email: from.email,
          Name: from.name
        },
        To: [
          {
            Email: to,
          },
        ],
        ReplyTo: {
          Email: replyTo.email,
          Name: replyTo.name,
        },
        Subject: subject,
        HTMLPart: htmlContent,
        TextPart: textContent
      },
    ],
  };

  const result: LibraryResponse<SendEmailV3_1.Response> = await mailjet.post('send', { version: 'v3.1' }).request(data);
  return result.body.Messages[0].Status == "success";
}