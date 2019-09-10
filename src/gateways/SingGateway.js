import {SINGS_TABLE} from "../constans";
import { dataBase } from "../components/Root";
import {SingFinder} from "../finders/SingFinders";

export class SingGateway {
    constructor(name, author, description, album, creatorId, id) {
        this.name = name;
        this.author = author;
        this.description = description;
        this.album = album;
        this.creatorId = creatorId;
        this.id = id;
    }

    addNewSing() {
        const newSingId = dataBase.insert(SINGS_TABLE, {
            name: this.name,
            author: this.author,
            description: this.description,
            album: this.album,
            creatorId: this.creatorId,
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
            row.creatorId = this.creatorId;

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

    deleteAllSingsByAuthor() {
        const result = dataBase.deleteRows(SINGS_TABLE, {author: String(this.author)});

        dataBase.commit();

        return result
    }
}