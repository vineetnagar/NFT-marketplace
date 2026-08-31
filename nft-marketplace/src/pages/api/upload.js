import { PinataSDK } from "pinata";
import formidable from "formidable";
import fs from "fs";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    const form = formidable({ multiples: false });

    const [fields, files] = await form.parse(req);

    const uploadedFile = files.file?.[0];

    if (!uploadedFile) {
      return res.status(400).json({
        message: "No file found",
      });
    }

    const file = new File(
      [fs.readFileSync(uploadedFile.filepath)],
      uploadedFile.originalFilename,
      {
        type: uploadedFile.mimetype,
      },
    );

    const upload = await pinata.upload.public.file(file);
    const url = `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${upload.cid}`;
    return res.status(200).json({
      success: true,
      cid: upload.cid,
      url: url,
    });
  } catch (error) {
    console.error("Pinata upload error:", error);

    return res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
}
