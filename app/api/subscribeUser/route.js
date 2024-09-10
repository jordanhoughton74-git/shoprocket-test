import { NextResponse } from "next/server";

export async function POST(req, res) {
  //   const { email } = req.body;
  const body = await req.json();
  const { email, firstName, lastName} = body;


  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const SERVER_PREFIX = process.env.MAILCHIMP_API_SERVER;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

  try {
    const data = {
      email_address: email,
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      },
      status: "subscribed",
    };

    const response = await fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `api_key ${API_KEY}`,
      },
    });

    const responseData = await response.json();
    console.log(responseData);
    if (responseData.status >= 400) {
      if (responseData.title === "Member Exists") {
        return NextResponse.json(responseData.title, { status: 500 });
      }
      return NextResponse.json("error", { status: 500 });
    }
    return NextResponse.json("Success", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "There appears to be error",
        details: JSON.stringify(error),
      },
      { status: 500 }
    );
  }
}
