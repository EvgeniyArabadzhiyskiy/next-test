// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  // console.log("handler  req", req.body.name);

  const id = req.body.name;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  console.log("handler  data", data.name);

  res.status(200).json({ data: data.name });
}
