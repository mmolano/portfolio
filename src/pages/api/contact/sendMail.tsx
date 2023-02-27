import type { NextApiRequest, NextApiResponse } from "next"
import { render } from "@react-email/render"
import { email } from "@/lib/email/email"
import ContactTemplate from "@/components/emails/ContactTemplate"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === "POST") {
      try {
         await email({
            to: process.env.NEXT_PUBLIC_MAIL!,
            subject: 'hi',
            html: render(ContactTemplate()),
         })
      } catch (error: any) {
         return res.status(400).json({ message: error, ma: error.message });
      }

      return res.status(200).json({ message: "Email sent successfully" });
   }
}