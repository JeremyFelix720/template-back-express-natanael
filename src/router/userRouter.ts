import { Router, Response, Request } from "express";
import { User } from "../index";
import bcrypt from "bcrypt";
import "dotenv/config";

export const userRouter = Router();

// Ajout d'un utilisateur
userRouter.post("/local/register", async (req, res) => {

  const userName = req.body.name;
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  // Vérification si un utilisateur existant dans la BDD a le même nom et le même email que celui que l'on souhaite rajouter.
  const sameUserName = await User.findOne( {where: {name: userName} })
  const sameUserEmail = await User.findOne( {where: {email: userEmail} })

  if(sameUserName === null && sameUserEmail === null){ // si aucun utilisateur similaire n'a été trouvé précédement.
    // Le mdp "userPassword" est hashé ici :
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltRounds);
    const newUser = await User.create({
      name: userName,
      email: userEmail,
      password: hashedPassword, // Remplacement de la valeur initialement rentrée par l'utilisateur  
    });

    delete newUser.dataValues.password  // mdp pas supprimé de la BDD mais seulement de l'objet renvoyé à l'utilisateur (qui n'en a pas besoin).

    res.status(200).json(
      {
        message: "The user has been added successfully",
        name: userName,
        email: userEmail,
      }
    )
  } else {
      res.status(400).json(
        {
          message: "There is already a user with the same name or address."
        }
      )
    }
})