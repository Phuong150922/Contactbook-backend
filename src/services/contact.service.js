const knex = require('../database/knex');
class ContactService {
    constructor() {
        this.contacts = knex('contacts');
    }

    #getContact(payload) {
        const contact = { ...payload };
        const contactProperties = ["name", "email", "address", "phone", "favorite"];

        Object.keys(contact).forEach(function (key) {
            if (contactProperties.indexOf(key) < 0) {
                delete contact[key]
            }
        })

        return contact;
    }

    async create(payload) {
        const contact = this.#getContact(payload);
        const [id] = await this.contacts.insert(contact);
        return { id, ...contact };
    }

    async all() {
        return await this.contacts.select('*');
    }

    async findByName(name) {
        return await this.contacts
            .where('name', 'like', `%${name}%`)
            .select('*')
    }

    async findById(id) {
        return await this.contacts
            .where('id', id)
            .select('*')
            .first()
    }

    async update(id, payload) {
        const contact = this.#getContact(payload);
        return await this.contacts.where('id', id).update(contact)
    }

    async delete(id) {
        return await this.contacts.where('id', id).del()
    }

    async findAllFavorite() {
        return await this.contacts.where('favorite', 1).select('*')
    }

    async deleteAll() {
        return await this.contacts.del();
    }
}
module.exports = ContactService;
