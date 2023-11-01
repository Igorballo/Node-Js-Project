const Company = require('../models/company');
const {validateCreateCompany, validateUpdateCompany} = require('../validations/company')

const getCompany = async (req, res) => {
    try {
        const companies = await Company.find();
        return res.json({
            error: false,
            type: "success",
            message: "Company retrieved successfully",
            Companies: companies
        });
    } catch (e) {
        return res.json({
            error: true,
            type: "error",
            message: e.toString()
        }, 500);
    }
}

const saveCompany = async (req, res) => {
    try {
        // Vérifie si l'entreprise existe déjà avec le même e-mail
        const existingCompany = await Company.findOne({ email: req.body.email });
        if (existingCompany) {
            return res.json({
                error: true,
                message: "Cette entreprise existe déjà."
            });
        }

        // Valide les données de la requête en utilisant la fonction validateCompany
        const { error, value } = validateUpdateCompany(req.body);
        if (error) {
            return res.status(400).json(error.details);
        }

        // Crée et enregistre la nouvelle entreprise
        const newCompany = new Company(req.body);
        const savedCompany = await newCompany.save();

        return res.json({
            error: false,
            type: "success",
            message: "Entreprise enregistrée avec succès",
            company: savedCompany
        });
    } catch (e) {
        return res.status(500).json({
            error: true,
            type: "error",
            message: e.toString()
        });
    }
}


module.exports = { getCompany, saveCompany }