export default function hundler(req, res) {
  const { method } = req;
  if (method === "GET") {
    return response.status(200).json(data);
  }
  if (method === "POST") {
    const { body } = request;
    data.push({ ...body, id: data.length + 1 });
    return response.status(200).json(data);
  }
}
