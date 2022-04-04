import mongoose from 'mongoose'

let db

export default class prisdataDAO {
    static async injectDB(db) {
        this.db = db
    }
}

