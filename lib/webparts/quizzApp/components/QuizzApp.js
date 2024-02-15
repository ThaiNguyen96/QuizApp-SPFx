var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (_) try {
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
import * as React from 'react';
import styles from './QuizzApp.module.scss';
import { spfi, SPFx } from '@pnp/sp/presets/all';
import '@pnp/sp/lists';
import '@pnp/sp/webs';
import '@pnp/sp/items';
// import { MsalClientSetup } from "@pnp/msaljsclient";
// import { graph } from "@pnp/graph/presets/all";
import { ChoiceGroup, DefaultButton, TextField } from '@fluentui/react/lib';
import axios from 'axios';
var QuizzReact = function (_a) {
    var hasTeamsContext = _a.hasTeamsContext;
    var _b = React.useState({
        name: '',
        address: '',
        responses: {},
    }), user = _b[0], setUser = _b[1];
    var storeUserDetails = function (userName, address) {
        return __awaiter(this, void 0, void 0, function () {
            var sp, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        sp = spfi().using(SPFx);
                        return [4 /*yield*/, sp.web.lists.getByTitle('Users Data').items.add({
                                Username: userName,
                                Address: address,
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error storing user details:', error_1);
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    var validateQuizAnswers = function (answers) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios.post('https://timeapi.io/api/validate-quiz', { answers: answers })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_2 = _a.sent();
                        console.error('Error validating quiz answers:', error_2);
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    var handleQuizSubmission = function () {
        return __awaiter(this, void 0, void 0, function () {
            var validationResponse, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        // save to sp list
                        return [4 /*yield*/, storeUserDetails(user.name, user.address)];
                    case 1:
                        // save to sp list
                        _a.sent();
                        return [4 /*yield*/, validateQuizAnswers(user.responses)];
                    case 2:
                        validationResponse = _a.sent();
                        console.log('Validation response:', validationResponse);
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.error('Error during quiz submission:', error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    var handleQuizResponse = function (questionId, response) {
        setUser(function (prevUser) {
            var _a;
            return (__assign(__assign({}, prevUser), { responses: __assign(__assign({}, prevUser.responses), (_a = {}, _a[questionId] = response, _a)) }));
        });
    };
    var quizQuestions = React.useState([
        //example question
        {
            id: 1,
            question: 'Do you love sport?',
            type: 'multipleChoice',
            options: [
                { key: 'no', text: 'No' },
                { key: 'yes', text: 'Yes' }
            ],
        },
        {
            id: 2,
            question: 'What sport do you play',
            type: 'freeText',
            answer: ''
        },
        {
            id: 3,
            question: 'Do you believe it is beneficial to play sport?',
            type: 'multipleChoice',
            options: [
                { key: 'no', text: 'No' },
                { key: 'yes', text: 'Yes' },
                { key: 'maybe', text: 'MayBe' },
            ],
        }
    ])[0];
    // graph.setup({
    //   graph: {
    //     fetchClientFactory: MsalClientSetup({
    //       auth: {
    //         authority: "https://login.microsoftonline.com/common",
    //         clientId: "00000000-0000-0000-0000-000000000000",
    //         redirectUri: "{your redirect uri}",
    //       },
    //       cache: {
    //         cacheLocation: "sessionStorage",
    //       },
    //     }, ["email", "Files.Read.All", "User.Read.All"]),
    //   },
    // });
    return (React.createElement("section", { className: "".concat(styles.quizzApp, " ").concat(hasTeamsContext ? styles.teams : '') },
        React.createElement("div", { className: styles.welcome },
            React.createElement("h1", null, "Hello Dao Nguyen Quiz App!"),
            React.createElement("div", null,
                React.createElement("label", null, "Name:"),
                React.createElement("input", { type: "text", value: user.name, onChange: function (e) { return setUser(__assign(__assign({}, user), { name: e.target.value })); } }),
                React.createElement("label", null, "Address:"),
                React.createElement("input", { type: "text", value: user.address, onChange: function (e) { return setUser(__assign(__assign({}, user), { address: e.target.value })); } }),
                quizQuestions.map(function (question) { return (React.createElement("div", { key: question.id },
                    React.createElement("p", { className: "".concat(styles.quizzQuestion) }, question.question),
                    (question.type === 'multipleChoice' && (React.createElement(ChoiceGroup, { options: question.options, selectedKey: user.responses[question.id], onChange: function (e, option) { return handleQuizResponse(question.id, option.key); } }))) || question.type === 'freeText' && (React.createElement(TextField, { type: "text", value: '', onChange: function (value) { return handleQuizResponse(question.id, 'value'); } })))); }),
                React.createElement(DefaultButton, { text: "Submit Quiz", onClick: handleQuizSubmission })))));
};
export default QuizzReact;
//# sourceMappingURL=QuizzApp.js.map