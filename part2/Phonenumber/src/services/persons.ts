import axios from "axios";

const baseUrl =
  import.meta.env.VITE_PERSONS_URL ||
  "https://bug-free-trout-v6qr64qv7p9jhw6gg-3005.app.github.dev/persons";

export type Person = {
  id: number | string;
  name: string;
  number: string;
};

const getAll = () => axios.get<Person[]>(baseUrl).then((response) => response.data);

const create = (newObject: Omit<Person, "id">) =>
  axios.post<Person>(baseUrl, newObject).then((response) => response.data);

const update = (id: number | string, newObject: Omit<Person, "id">) =>
  axios.put<Person>(`${baseUrl}/${id}`, newObject).then((response) => response.data);

const remove = (id: number | string) => axios.delete(`${baseUrl}/${id}`);

export default {
  getAll,
  create,
  update,
  remove,
};
