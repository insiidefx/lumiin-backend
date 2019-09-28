import PersonalData from '../models/PersonalData.js'
import * as Yup from 'yup'

class PersonalDataController {
  async index(req, res) {
    try {
      const personalData = PersonalData.findAll()
      return res.status(200).json(personalData)
    } catch (e) {
      return res.status(400).json({ error: 'Unable to find records. ' })
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      birth_date: Yup.date().required(),
      cpf_cnpj: Yup.integer().required(),
      rg: Yup.integer().required(),
      street: Yup.string().required(),
      house_number: Yup.integer().required(),
      house_complement: Yup.string().required(),
      neighborhood: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      country: Yup.string().required(),
      state_subscription: Yup.integer().required(),
      civic_subscription: Yup.integer().required()
    })

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    try {
      const personalData = await PersonalData.create(req.body)
      return res.status(200).json(personalData)
    } catch (e) {
      return res.status(400).json({ error: 'Unable to create record.' })
    }
  }

  async show(req, res) {
    try {
      const personalData = await PersonalData.findOne({ where: { id: req.params.id } })
      return res.status(200).json(personalData)
    } catch (e) {
      return res.status(400).json({ error: 'Unable to find record. ' })
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      birth_date: Yup.date().required(),
      cpf_cnpj: Yup.integer().required(),
      rg: Yup.integer().required(),
      street: Yup.string().required(),
      house_number: Yup.integer().required(),
      house_complement: Yup.string().required(),
      neighborhood: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      country: Yup.string().required(),
      state_subscription: Yup.integer().required(),
      civic_subscription: Yup.integer().required()
    })

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    try {
      const personalData = await PersonalData.findOne({ where: { id: req.params.id } })
      personalData.update(req.body, { where: { id: req.params.id } })
      return res.status(200).json(personalData)
    } catch (e) {
      return res.status(400).json({ error: 'Unable to update record.' })
    }
  }

  async destroy(req, res) {
    try {
      await PersonalData.destroy({ where: { id: req.params.id } })
      return res.status(200).json({ success: 'Deleted successfully.' })
    } catch (e) {
      return res.status(400).json({ error: 'Unable to delete record.' })
    }
  }
}

export default new PersonalDataController()