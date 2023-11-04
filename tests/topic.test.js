require("../app/helpers/mongodb")();
const Topic = require('../app/models/topic');
const { saveTopics, getTopics, getTopicsById, updateTopics } = require('../app/controllers/topicController');

// beforeEach(async () => {
//     await Topic.deleteMany();
// })


describe("Topic Controller", () => {
    it("Should save a topic", async () => {
        // Mock des objets request et response
        const req = {
            body: {
                title: "Test Title",
                subject: "Test Subject",
                status: true,
            }
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };

        // Appelez la méthode saveTopics
        await saveTopics(req, res);

        // Assurez-vous que la méthode res.status a été appelée avec le bon code de statut
        expect(res.status).toHaveBeenCalledWith(201);

        // Assurez-vous que la méthode res.json a été appelée avec la réponse attendue
        expect(res.json).toHaveBeenCalledWith({
            error: false,
            type: "success",
            message: "Topic enregistré avec succès",
            topic: expect.any(Object),
        });
    });

    it("Should get a list of topics", async () => {
        // Mock de l'objet response
        const res = {
            json: jest.fn(),
        };

        // Appelez la méthode getTopics avec la requête fictive et le mock de la réponse
        await getTopics({}, res);

        // Assurez-vous que la méthode res.json a été appelée avec la réponse attendue
        expect(res.json).toHaveBeenCalledWith({
            error: false,
            type: "success",
            message: "Topics retrieved successfully",
            topics: expect.any(Array),
        });
    });

    it("Should get a topic by ID", async () => {
        // Récupérez le premier topic de la base de données
        const firstTopic = await Topic.findOne();

        // Assurez-vous que le premier topic existe
        expect(firstTopic).toBeTruthy();

        // Créez un mock de l'objet request avec l'ID du premier topic
        const req = {
            params: {
                id: firstTopic._id.toString(),
            }
        };

        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };

        // Appelez la méthode getTopicsById avec la requête fictive et le mock de la réponse
        await getTopicsById(req, res);

        // Assurez-vous que la méthode res.status a été appelée avec le code de statut HTTP attendu
        expect(res.status).toHaveBeenCalledWith(200);

        // Assurez-vous que la méthode res.json a été appelée avec la réponse attendue
        expect(res.json).toHaveBeenCalledWith({
            error: false,
            type: "success",
            message: "Topic récupéré avec succès",
            topic: expect.any(Object),
        });
    });

    it("Should update a topic by ID", async () => {
        // Récupérez le premier topic de la base de données
        const firstTopic = await Topic.findOne();

        // Assurez-vous que le premier topic existe
        expect(firstTopic).toBeTruthy();

        // Créez un mock de l'objet request avec l'ID du premier topic
        const req = {
            params: {
                id: firstTopic._id.toString(),
            },
            body: {
                title: "The updated title",
                subject: "The updated subject",
                status: false,
            }
        };

        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };

        // Appelez la méthode getTopicsById avec la requête fictive et le mock de la réponse
        await updateTopics(req, res);

        // Assurez-vous que la méthode res.status a été appelée avec le code de statut HTTP attendu
        expect(res.status).toHaveBeenCalledWith(200);

        // Assurez-vous que la méthode res.json a été appelée avec la réponse attendue
        expect(res.json).toHaveBeenCalledWith({
            error: false,
            type: "success",
            message: "Topic récupéré avec succès",
            topic: expect.any(Object),
        });
    });

});


