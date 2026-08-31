import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    const metadata = req.body;

    // Upload metadata JSON to Pinata
    const upload = await pinata.upload.public.json(metadata);

    const url = `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${upload.cid}`;

    return res.status(200).json({
      success: true,
      cid: upload.cid,
      url,
    });
  } catch (error) {
    console.error("Metadata upload error:", error);

    return res.status(500).json({
      success: false,
      message: "Metadata upload failed",
    });
  }
}
