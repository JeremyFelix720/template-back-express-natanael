import { Router, Response, Request } from "express";
import { Object } from "../index";
export const objectRouter = Router();

// Ajout d'un objet
objectRouter.post("/add", async (req, res) => {
 
  const objectName = req.body.name;
  const objectQuantity = req.body.quantity;
 
  await Object.create({
    name: objectName,
    quantity: objectQuantity,
  });
  
  res.status(200).json(
    {
      message: "L'objet a bien été ajouté.",
      name: objectName,
      quantity: objectQuantity,
    }
  )
})


// Lecture des objets
objectRouter.get("/", async (req, res) => {
  const savedObjects = await Object.findAll();
  res.json(savedObjects);
});


// Lecture d'un objet
objectRouter.get("/:id", async (req, res) => {
  const objectId = req.params.id;
  const savedObject = await Object.findByPk(objectId);
  res.status(200).json(savedObject);
})