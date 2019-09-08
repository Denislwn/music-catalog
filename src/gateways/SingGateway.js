import {SINGS_TABLE} from "../constans";
import { dataBase } from "../components/Root";
import {SingFinder} from "../finders/SingFinders";

export class SingGateway {
    constructor(name, author, description, album, id) {
        this.name = name;
        this.author = author;
        this.description = description;
        this.album = album;
        this.id = id;
    }

    addNewSing() {
        const newSingId = dataBase.insert(SINGS_TABLE, {
            name: this.name,
            author: this.author,
            description: this.description,
            album: this.album,
        });
        dataBase.commit();

        return SingFinder.getSing( { query: { ID: newSingId }})[0];
    }

    editSing() {
        const result = dataBase.update(SINGS_TABLE, {ID: this.id}, (row) => {
            row.name = this.name;
            row.author = this.author;
            row.description = this.description;
            row.album = this.album;

            return row;
        });

        dataBase.commit();

        if (result) {
            return SingFinder.getSing( { query: { ID: this.id }})[0];
        }
    }

    deleteSing() {
        const result = dataBase.deleteRows(SINGS_TABLE, {ID: this.id});

        dataBase.commit();

        return result
    }
}