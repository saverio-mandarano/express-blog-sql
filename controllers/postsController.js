// import array che contiene i post
// const postsList = require("../data/posts");

// import file di connessione al database
const connection = require("../data/db");

//funzioni delle operazioni CRUD, ognuna con logica corrispondente:
function index(req, res) {
  // preparo la query
  const sql = "SELECT * FROM posts";

  // eseguo la query
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });

  // let filteredPostsList = postsList;
  // //Se la richiesta contiene un filtro, allora filtro la lista dei post
  // if (req.query.tags) {
  //   filteredPostsList = postsList.filter((post) =>
  //     post.tags.includes(req.query.tags),
  //   );
  // }
  // res.json({
  //   total: filteredPostsList.length,
  //   posts: filteredPostsList,
  // });
}

function show(req, res) {
  const id = parseInt(req.params.id);

  //query per il post
  const postSql = "SELECT * FROM posts WHERE id = ?";

  //query per i tags del post
  const tagsSql = `SELECT tags.*
  FROM tags
  JOIN post_tag ON tags.id = post_tag.tag_id
  WHERE post_tag.post_id = ?;`;

  //Eseguo la prima query per il post
  connection.query(postSql, [id], (err, postResults) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (postResults.length === 0)
      return res.status(404).json({ error: "Post not found" });

    //recupero il post
    const post = postResults[0];

    //se è andata bene, eseguo la seconda query per i tags del post
    connection.query(tagsSql, [id], (err, tagsResults) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      if (tagsResults.length === 0)
        return res.status(404).json({ error: "tags not found" });

      // Aggiungo i tags al post
      post.tags = tagsResults;
      res.json(post);
    });
  });

  //   const post = postsList.find((post) => post.id === parseInt(req.params.id));

  //   //introduco errore per test middleware errore 500
  //   // throw new Error("Errore di test middleware");

  //   // Faccio il controllo
  //   if (!post) {
  //     //Imposto lo status 404
  //     res.status(404);

  //     // Restituisco un JSON con le altre informazioni
  //     return res.json({
  //       error: "Not Found",
  //       message: "post non trovata",
  //     });
  //   }
  //   res.json(post);
}

function store(req, res) {
  // console.log(req.body);
  // // Creiamo un nuovo id incrementando l'ultimo id presente
  // const newId = postsList[postsList.length - 1].id + 1;
  // // Creiamo un nuovo oggetto post
  // const newPost = {
  //   id: newId,
  //   title: req.body.title,
  //   content: req.body.content,
  //   image: req.body.image,
  //   tags: req.body.tags,
  // };
  // // Aggiungiamo la nuova pizza al postsList
  // postsList.push(newPost);
  // // controlliamo
  // console.log(postsList);
  // // Restituiamo lo status corretto e la pizza appena creata
  // res.status(201);
  // res.json(newPost);
}

function update(req, res) {
  // console.log(req.body);
  // const id = parseInt(req.params.id);
  // const post = postsList.find((post) => post.id === id);
  // if (!post) {
  //   res.status(404);
  //   return res.json({
  //     status: 404,
  //     error: "Not Found",
  //     message: "Post non trovato",
  //   });
  // }
  // // Aggiorniamo il post
  // post.title = req.body.title;
  // post.image = req.body.image;
  // post.content = req.body.content;
  // post.tags = req.body.tags;
  // // Controlliamo la lista dei post
  // console.log(postsList);
  // // Restituiamo la post appena aggiornata
  // res.json(post);
}

function modify(req, res) {
  // console.log(req.body);
  // const id = parseInt(req.params.id);
  // const post = postsList.find((post) => post.id === id);
  // if (!post) {
  //   res.status(404);
  //   return res.json({
  //     status: 404,
  //     error: "Not Found",
  //     message: "Post non trovato",
  //   });
  // }
  // // Aggiorniamo il post
  // req.body.title ? (post.title = req.body.title) : (post.title = post.title);
  // req.body.image ? (post.image = req.body.image) : (post.image = post.image);
  // req.body.tags ? (post.tags = req.body.tags) : (post.tags = post.tags);
  // req.body.content
  //   ? (post.content = req.body.content)
  //   : (post.content = post.content);
  // // Controlliamo la lista dei post
  // console.log(postsList);
  // // Restituiamo la post appena aggiornata
  // res.json(post);
}

function destroy(req, res) {
  // recupero l'id dall' URL
  const { id } = req.params;

  //query per il post
  const postSql = "SELECT * FROM posts WHERE id = ?";

  //query per eliminare il post
  const deletePostSql = "DELETE FROM posts WHERE id = ?";

  //eseguo la prima query per verificare che il post con quell'id esita
  connection.query(postSql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Post not found" });

    //se è andata bene, eseguo la seconda query per eliminare il post
    connection.query(deletePostSql, [id], (err) => {
      if (err) return res.status(500).json({ error: "Failed to delete posts" });
      res.sendStatus(204);
    });
  });

  //Elimino la pizza dal menu
  // connection.query(sql, [id], (err) => {
  //   if (err) return res.status(500).json({ error: "Failed to delete posts" });
  //   res.sendStatus(204);
  // });

  // const id = parseInt(req.params.id);
  // const post = postsList.find((post) => post.id === id);
  // if (!post) {
  //   res.status(404);
  //   return res.json({
  //     status: 404,
  //     error: "Not Found",
  //     message: "Post non trovato",
  //   });
  // }
  // // Rimuovo post dalla lista
  // postsList.splice(postsList.indexOf(post), 1);
  // console.log(`lista aggiornata`);
  // console.log(postsList);
  // res.sendStatus(204);
}

module.exports = { index, show, store, update, modify, destroy };
