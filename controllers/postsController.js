// import array che contiene i post
const postsList = require("../data/posts");

//funzioni delle operazioni CRUD, ognuna con logica corrispondente:
function index(req, res) {
  let filteredPostsList = postsList;

  //Se la richiesta contiene un filtro, allora filtro la lista dei post
  if (req.query.tags) {
    filteredPostsList = postsList.filter((post) =>
      post.tags.includes(req.query.tags),
    );
  }

  res.json({
    total: filteredPostsList.length,
    posts: filteredPostsList,
  });
}

function show(req, res) {
  const post = postsList.find((post) => post.id === parseInt(req.params.id));

  //introduco errore per test middleware errore 500
  // throw new Error("Errore di test middleware");

  // Faccio il controllo
  if (!post) {
    //Imposto lo status 404
    res.status(404);

    // Restituisco un JSON con le altre informazioni
    return res.json({
      error: "Not Found",
      message: "post non trovata",
    });
  }
  res.json(post);
}

function store(req, res) {
  console.log(req.body);

  // Creiamo un nuovo id incrementando l'ultimo id presente
  const newId = postsList[postsList.length - 1].id + 1;
  // Creiamo un nuovo oggetto post
  const newPost = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    tags: req.body.tags,
  };
  // Aggiungiamo la nuova pizza al postsList
  postsList.push(newPost);

  // controlliamo
  console.log(postsList);
  // Restituiamo lo status corretto e la pizza appena creata
  res.status(201);
  res.json(newPost);
}

function update(req, res) {
  console.log(req.body);
  const id = parseInt(req.params.id);
  const post = postsList.find((post) => post.id === id);

  if (!post) {
    res.status(404);

    return res.json({
      status: 404,
      error: "Not Found",
      message: "Post non trovato",
    });
  }

  // Aggiorniamo il post
  post.title = req.body.title;
  post.image = req.body.image;
  post.content = req.body.content;
  post.tags = req.body.tags;

  // Controlliamo la lista dei post
  console.log(postsList);
  // Restituiamo la post appena aggiornata
  res.json(post);
}

function modify(req, res) {
  console.log(req.body);
  const id = parseInt(req.params.id);
  const post = postsList.find((post) => post.id === id);

  if (!post) {
    res.status(404);

    return res.json({
      status: 404,
      error: "Not Found",
      message: "Post non trovato",
    });
  }

  // Aggiorniamo il post
  req.body.title ? (post.title = req.body.title) : (post.title = post.title);
  req.body.image ? (post.image = req.body.image) : (post.image = post.image);
  req.body.tags ? (post.tags = req.body.tags) : (post.tags = post.tags);
  req.body.content
    ? (post.content = req.body.content)
    : (post.content = post.content);

  // Controlliamo la lista dei post
  console.log(postsList);
  // Restituiamo la post appena aggiornata
  res.json(post);
}

function destroy(req, res) {
  const id = parseInt(req.params.id);
  const post = postsList.find((post) => post.id === id);

  if (!post) {
    res.status(404);

    return res.json({
      status: 404,
      error: "Not Found",
      message: "Post non trovato",
    });
  }
  // Rimuovo post dalla lista
  postsList.splice(postsList.indexOf(post), 1);
  console.log(`lista aggiornata`);
  console.log(postsList);
  res.sendStatus(204);
}

module.exports = { index, show, store, update, modify, destroy };
