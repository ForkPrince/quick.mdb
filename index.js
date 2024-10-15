const mongoose = require("mongoose");
const fs = require("fs");

class Database {
    constructor(url) {
        mongoose.set("strictQuery", false);
        mongoose.connect(url);

        this.data = mongoose.model("quick.mdb", new mongoose.Schema({
            key: {
                type: String,
                unique: true
            },
            value: mongoose.Schema.Types.Mixed
        }));
    }

    async set(key, value) {
        const data = await this.data.findOne({ key }) || await this.data.create({ key });

        data.value = value;
        await data.save();
    }

    async push(key, value) {
        const data = await this.data.findOne({ key });
        if (!data || !Array.isArray(data.value)) throw new Error(`${key} is not an array`);

        data.value.push(value);
        await data.save();
    }

    async fetch(key) {
        const data = await this.data.findOne({ key });
        return data ? data.value : null;
    }

    async get(key) {
        return this.fetch(key);
    }

    async fetchAll() {
        const data = await this.data.find();
        return data.map(({ key, value }) => ({ key, value }));
    }

    async all() {
        return this.fetchAll();
    }

    async remove(key) {
        await this.data.deleteOne({ key });
    }

    async delete(key, value) {
        const data = await this.data.findOne({ key });
        if (!data || !Array.isArray(data.value)) return;

        data.value = data.value.filter(item => item !== value);
        await data.save();
    }

    async deleteKey(key, subKey) {
        const data = await this.data.findOne({ key });
        if (!data || typeof data.value !== "object") return;

        delete data.value[subKey];
        await data.save();
    }

    async deleteEach(prefix) {
        await this.data.deleteMany({ key: new RegExp(`^${prefix}`) });
    }

    async clear() {
        await this.data.deleteMany({});
    }

    async has(key) {
        const data = await this.data.findOne({ key });
        return !!data;
    }

    async add(key, value) {
        const data = await this.data.findOne({ key });
        if (!data || typeof data.value !== "number") throw new Error(`${key} is not a number`);

        data.value += value;
        await data.save();
    }

    async subtract(key, value) {
        await this.add(key, -value);
    }

    async import(file) {
        const data = JSON.parse(fs.readFileSync(file, "utf-8"));
        for (const [key, value] of Object.entries(data)) await this.set(key, value);
    }

    async export(file) {
        const data = await this.fetchAll();

        const json = data.reduce((acc, { key, value }) => {
            acc[key] = value;
            return acc;
        }, {});

        fs.writeFileSync(file, JSON.stringify(json, null, 2));
    }
}

module.exports = { Database };