class SurveysHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSurveyHandler = this.postSurveyHandler.bind(this);
    this.getSurveyHandler = this.getSurveyHandler.bind(this);
  }

  async postSurveyHandler(req, res) {
    try {
      await this._validator.validateSurveyPayload(req.body);

      const addedSurvey = await this._service.addSurvey(req.user.id, req.body);

      return res.status(201).json({
        error: false,
        message: 'survey created',
        data: addedSurvey,
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        message: error.message,
      });
    }
  }

  async getSurveyHandler(req, res) {
    try {
      const retrievedSurvey = await this._service.getSurvey(req.user.id);

      return res.status(200).json({
        error: false,
        message: 'survey retrieved',
        data: retrievedSurvey,
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        message: error.message,
      });
    }
  }
}

module.exports = SurveysHandler;
