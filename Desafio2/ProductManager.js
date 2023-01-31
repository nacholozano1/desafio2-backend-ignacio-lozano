// DESAFIO Nº2 - IGNACIO LOZANO -

import { promises as fs, existsSync, writeFileSync } from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.checkFile();
  }

  checkFile = () => {
    // Si existe el archivo no hace nada, sino lo crea
    if (!existsSync(this.path)) {
      writeFileSync(this.path, "[]", "utf-8");
    }
  };

  async addProduct(title, description, price, thumbnail, code, stock) {
    const prodObject = { title, description, price, thumbnail, code, stock };
    if (!Object.values(prodObject).some(val => !val)) {
      // Leer archivo
      const read = await fs.readFile(this.path, "utf-8");
      let data = JSON.parse(read);
      if (!data.some((elem) => elem.code === prodObject.code)) {
        let newID = data.length ? data[data.length - 1].id + 1 : 1;
        // Pushear objeto
        data.push({ ...prodObject, id: newID });
        // Escribir data
        await fs.writeFile(this.path, JSON.stringify(data), "utf-8");
      } else {
        throw "No se puede añadir porque el código ya existe.";
      }
    } else {
      console.log("Falta el campo del proudcto");
    }
  }

  async getProducts() {
    const read = await fs.readFile(this.path, "utf-8");
    const data = JSON.parse(read);
    console.log(data);
    return data;
  }

  async getProductByID(id) {
    const read = await fs.readFile(this.path, "utf-8");
    const data = JSON.parse(read);
    const found = data.find((prod) => prod.id === id);
    if (found) {
      console.log(found);
      return found;
    } else {
      throw "ID no encontrado";
    }
  }

  async updateProduct(id, title, description, price, thumbnail, code, stock) {
    const read = await fs.readFile(this.path, "utf-8");
    const data = JSON.parse(read);
    const index = data.findIndex((prod) => prod.id === id);
    if (index !== -1) {
      data[index] = { id, title, description, price, thumbnail, code, stock };
      await fs.writeFile(this.path, JSON.stringify(data), "utf-8");
    } else {
      throw "ID no encontrado";
    }
  }

  async deleteProduct(id) {
    const read = await fs.readFile(this.path, "utf-8");
    let data = JSON.parse(read);
    const index = data.findIndex((prod) => prod.id === id);
    if (index !== -1) {
      data.splice(index, 1);
      await fs.writeFile(this.path, JSON.stringify(data), "utf-8");
    } else {
      throw "ID no encontrado";
    }
  }
}

// TEST

// Crear ProductManager
const manager = new ProductManager("./data.json");
// - Agregar productos
//manager.addProduct("FIFA 23", "El mejor juego de futbol", 7999, "img/juegos/fifa-23.jpg", "3A", 500);
//manager.addProduct("","","","","","");
//manager.addProduct("Producto para TESTs","Hola, soy un test",3300,"img/nada","5A",500);
manager.getProducts();
//manager.getProductByID(2);
//manager.updateProduct(...)
//manager.deleteProduct(3)
