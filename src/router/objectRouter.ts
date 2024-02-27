import { Router, Response, Request } from "express";
import { Object } from "../index";
export const objectRouter = Router();

// Ajout d'un objet
objectRouter.post("/add", async (req, res) => {
 
  const objectName = req.body.name;
  const objectQuantity = req.body.quantity;
 
  const addedObject = await Object.create({
    name: objectName,
    quantity: objectQuantity,
  });
  
  res.status(200).json(
    {
      message: "The object has been added successfully.",
      ...addedObject.dataValues
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


// Modification d'un objet
objectRouter.put("/:id", async (req, res) => {

  const objectId = req.params.id;
  const objectName = req.body.name;
  const objectQuantity = req.body.quantity;

  const modifiedObject = {
    name: objectName,
    quantity: objectQuantity,
  };

  await Object.update(modifiedObject, {where:
      {id: objectId}
    });
  res.status(200).json(modifiedObject);
})


// Suppression d'un objet
objectRouter.delete("/:id", async (req, res) => {
  const savedObject = await Object.findOne({ where: { id: req.params.id } });
  if (savedObject) {
      await savedObject.destroy();
      res.end("The object has been deleted successfully.");
  }
  else {
      res.end("The object was not found.");
  }
});