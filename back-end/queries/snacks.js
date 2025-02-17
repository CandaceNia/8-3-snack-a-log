const db = require("../db/dbConfig.js");

//module.exports = {};


getAllSnacks = async () =>{
    try{
        const allSnacks = await db.any("SELECT * FROM snacks");
        return allSnacks;

    }catch(err){
        return err
    }
}

getOneSnack = async(id)=>{
    try{
        const oneSnack = await db.one("SELECT * FROM snacks WHERE id=$1", id);
        return oneSnack;
    }catch(err){
        return err
    }
};

deleteSnack = async (id) =>{
    try{
        const deletedSnack = await db.one(
            "DELETE FROM snacks WHERE id=$1 RETURNING *", id);
            return deletedSnack;
    }catch(err){
        return err
    }
};

createSnack = async (snack) => {
    try{
        const newSnack = await db.one ("INSERT INTO snacks( name, image, fiber, protein, added_sugar, is_healthy) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
        [snack.name, snack.image, snack.fiber, snack.protein, snack.added_sugar, snack.is_healthy]);
        return newSnack;
    }catch (err){
        return err
    }
}

updateSnack = async (id, snack) => {
    try{
        const updatedSnack = await db.one("UPDATE snacks SET name=$1, image=$2, fiber=$3, protein=$4, added_sugar=$5, is_healthy=$6 WHERE id=$7 RETURNING *",
        [snack.name, snack.image, snack.fiber, snack.protein, snack.added_sugar, snack.is_healthy, id]);
        return updatedSnack;

    }catch(err){
        return err
    }
}

module.exports = {getAllSnacks, getOneSnack, deleteSnack, createSnack, updateSnack};