import joi from "joi";


// {
// 	"firstUser": "fulano",
//   "secondUser": "ciclana"
// }

export const battleSchema = joi.object({
    firstUser: joi.string().required(),
    secondUser: joi.string().required()
});