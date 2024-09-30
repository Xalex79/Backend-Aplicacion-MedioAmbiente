//Users

/*import { UserRepository } from "@repositories/userRepositories";
import { UserService } from "@services/userService";
import { Router } from "express";
import { IUserRepository, IUserService, User } from "types/UsersTypes";
*/

//Mediciones
import { MedicionRepository } from "@repositories/medicionRepositories";
import { MedicionService } from "@services/medicionService";
import { Router } from "express";
import { IMedicionRepository, IMedicionService, Medicion } from "types/MedicionesTypes";

const router = Router();

//Users
/*const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);
*/

//Mediciones
const medicionRepositories: IMedicionRepository = new MedicionRepository();
const medicionService: IMedicionService = new MedicionService(medicionRepositories);


//Mediciones
export default () => {
  router.get("/health", (req, res) => {
    res.send("Api is Healthy!!!");
  });

  //Get
  router.get("/mediciones", async (req, res) => {
    const medicion = await medicionService.findMediciones();
    res.json(medicion);
  });

  router.get("/mediciones/:id", async (req, res) => {
    const mediciones = await medicionService.findMedicionesById(req.params.id);
    res.json(mediciones);
  });

  //Create
  router.post("/mediciones", async (req, res) => {
    const newMedicion: Medicion = req.body;
    const result = await medicionService.createMedicion(newMedicion);

    res.json(result);
  });

  router.put("/mediciones/:id", async (req, res) => {
    const mediciones = await medicionService.updateMedicion(req.params.id, req.body);
    res.json(mediciones);
  });

  router.delete("/mediciones/:id", async (req, res) => {
    const mediciones = await medicionService.deleteMedicion(req.params.id);
    res.json(mediciones);
  });

  return router;
};

//Users
/*export default () => {
  router.get("/health", (req, res) => {
    res.send("Api is Healthy!!!");
  });

  //Get
  router.get("/users", async (req, res) => {
    const users = await userService.findUsers();
    res.json(users);
  });

  router.get("/users/:id", async (req, res) => {
    const users = await userService.findUsersById(req.params.id);
    res.json(users);
  });

  //Create
  router.post("/users", async (req, res) => {
    const newUser: User = req.body;
    const result = await userService.createUser(newUser);

    res.json(result);
  });

  router.put("/users/:id", async (req, res) => {
    const users = await userService.updateUser(req.params.id, req.body);
    res.json(users);
  });

  router.delete("/users/:id", async (req, res) => {
    const users = await userService.deleteUser(req.params.id);
    res.json(users);
  });

  return router;
};*/
