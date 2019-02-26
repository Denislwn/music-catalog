import {SINGS_TABLE} from "../constans";
import { dataBase } from "../components/Root";
import {SingFinder} from "../finders/SingFinders";

export class SingGateway {
    constructor(name, author, description, album) {
        this.name = name;
        this.author = author;
        this.description = description;
        this.album = album;
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

    editSing(singID) {
        const result = dataBase.update(SINGS_TABLE, {ID: singID}, (row) => {
            row.name = this.name;
            row.author = this.author;
            row.description = this.description;
            row.album = this.album;

            return row;
        });

        dataBase.commit();

        if (result) {
            return SingFinder.getSing( { query: { ID: singID }})[0];
        }
    }

    static deleteSing(singId) {
        const result = dataBase.deleteRows(SINGS_TABLE, {ID: singId});

        dataBase.commit();

        return result
    }
}