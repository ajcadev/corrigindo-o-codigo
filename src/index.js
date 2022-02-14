const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };
	repositories.push(repository)
  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // const { id } = request.params;
  // const updatedRepository = request.body;
  // const repositoryIndex = repositories.findindex(repository => repository.id === id);
  // if (repositoryIndex < 0) {
  //   return response.status(404).json({ error: "Repository not found" });
  // }
  // const repository = { ...repositories[repositoryIndex], ...updatedRepository };
  // repositories[repositoryIndex] = repository;
  // return response.json(repository);
	const { title, url, techs } = request.body
	const { id } = request.params;
	const repository = repositories.find(repo => repo.id === id)
	if(!repository){
		return response.status(404).json({ error: "Repository not found" });
	}
	repository.title = title
	repository.url = url
	repository.techs = techs
	return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
	const repositoryIndex = repositories.findIndex(repository => repository.id === id);
	
  if (repositoryIndex > -1) {
		repositories.splice(repositoryIndex, 1);
		return response.status(204).send();
	}
	return response.status(404).json({ error: "Repository not found" });
});

app.post("/repositories/:id/like", (request, response) => {
  // const { id } = request.params;
  // const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  // if (repositoryIndex < 0) {
  //   return response.status(404).json({ error: "Repository not found" });
  // }
  // const likes = ++repositories[repositoryIndex].likes;
  // return response.json('likes');
	const { id } = request.params;
	const repository = repositories.find(repo => repo.id === id)
	if(!repository){
		return response.status(404).json({ error: "Repository not found" });
	}
	repository.likes = repository.likes + 1
	return response.json(repository)
});

module.exports = app;
