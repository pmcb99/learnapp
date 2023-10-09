"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// function askQuestion(query: string): Promise<string> {
//   return new Promise((resolve) => {
//     rl.question(query, (answer) => {
//       resolve(answer);
//     });
//   });
// }
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var dataList, _i, dataList_1, data, subject, topic, definitionString;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dataList = [
                        {
                            name: 'Scientific Method',
                            definition: ['A process of investigation where problems are identified, and their explanations are tested by ', 'carrying out experiments', '.']
                        },
                        {
                            name: 'Observation',
                            definition: ['An unbiased, accurate report of an ', 'event', '.']
                        },
                        {
                            name: 'Hypothesis',
                            definition: ['An educated guess based on ', 'observations', '.']
                        },
                        {
                            name: 'Experiment',
                            definition: ['An experiment is designed to test a ', 'hypothesis', '.']
                        },
                        {
                            name: 'Data',
                            definition: ['Consists of measurements, ', 'observations/information', ' gathered during an experiment.']
                        },
                        {
                            name: 'Replicate',
                            definition: ['A ', 'repeat', ' of an experiment.']
                        },
                        {
                            name: 'Control',
                            definition: ['A comparison used to provide a standard against which the actual experiment can be ', 'judged', '.']
                        },
                        {
                            name: 'Theory',
                            definition: ['A hypothesis that has been supported by ', 'different experiments', '.']
                        },
                        {
                            name: 'Principle/Law',
                            definition: ['A theory that has shown to be valid against ', 'long-term testing', '.']
                        },
                        {
                            name: 'Ethics',
                            definition: ['Refers to whether issues are ', 'right or wrong', '.']
                        }
                    ];
                    _i = 0, dataList_1 = dataList;
                    _a.label = 1;
                case 1:
                    if (!(_i < dataList_1.length)) return [3 /*break*/, 4];
                    data = dataList_1[_i];
                    console.log("For the term: ".concat(data.name));
                    subject = 'BIOLOGY';
                    topic = 'THE SCIENTIFIC METHOD';
                    definitionString = data.definition.join('');
                    return [4 /*yield*/, prisma.definition.create({
                            data: {
                                term: data.name,
                                definition: definitionString,
                                subject: subject,
                                topic: topic
                            }
                        })];
                case 2:
                    _a.sent();
                    console.log("Added ".concat(data.name, " to the database.\n"));
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log('Data inserted successfully.');
                    return [4 /*yield*/, prisma.$disconnect()];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (e) {
    console.error(e);
    prisma.$disconnect();
});
