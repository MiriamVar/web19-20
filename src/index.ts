import * as express from "express"; //trieda express
import * as fs from "fs"; 
import * as asideMenu from "./asideMenu.json";
import * as workshopsMenu from "./workshopsMenu.json";

console.log(asideMenu);
const app = express();
const router = express.Router();


app.use(express.static("public")); //ma tahat staticke stranky z public 
app.set("view engine", "ejs");  //ma sa pouzivat ejs 

app.use(router);
app.use(function(_req, res) {
 res.status(404).render("404");
});


// index page , ak su routre tak sa vykonavaju pred app.use(router)
router.get("/", function(_req, res) { //ked premennu nepouzivat v tele tak dam pred nu _
 res.render("index", {page: "home", menu: asideMenu, menu2: workshopsMenu});    //views/index.ejs
});

router.get("/:page", function(req, res) {
    if (fs.existsSync("views/pages/" + req.params.page + ".ejs")) {
        res.render("index", { page: req.params.page, menu: asideMenu, menu2: workshopsMenu});
        } else {
        res.status(404).render("404");
        }       
   });

app.listen(8080);
console.log("listening on port 8080");