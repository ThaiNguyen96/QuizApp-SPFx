import * as React from 'react';
import styles from './QuizzApp.module.scss';
import type { IQuizzAppProps, QuizQuestion, User } from './IQuizzAppProps';
import { spfi, SPFx } from '@pnp/sp/presets/all';
import '@pnp/sp/lists';
import '@pnp/sp/webs';
import '@pnp/sp/items';
import { ChoiceGroup, DefaultButton, TextField } from '@fluentui/react/lib';
import axios from 'axios';


const QuizzReact: React.FC<IQuizzAppProps> = ({ hasTeamsContext }) => {
  const [user, setUser] = React.useState<User>({
    name: '',
    address: '',
    responses: {},
  });

  const storeUserDetails = async function (userName: string, address: string): Promise<void> {
    try {
      const sp = spfi().using(SPFx);
      await sp.web.lists.getByTitle('Users Data').items.add({
        Username: userName,
        Address: address,
      });
    } catch (error) {
      console.error('Error storing user details:', error);
      throw error;
    }
  };

  const validateQuizAnswers = async function (answers: Record<string, string>): Promise<object> {
    try {
      const response = await axios.post('https://timeapi.io/api/validate-quiz', { answers });
      return response.data;
    } catch (error) {
      console.error('Error validating quiz answers:', error);
      throw error;
    }
  };

  const handleQuizSubmission = async function (): Promise<void> {
    try {
      // save to sp list
      await storeUserDetails(user.name, user.address);
      // validation TimeIO API
      const validationResponse = await validateQuizAnswers(user.responses);
      
      console.log('Validation response:', validationResponse);
    } catch (error) {
      console.error('Error during quiz submission:', error);
    }
  };

  
  const handleQuizResponse = function (questionId: number, response: string): void {
    setUser((prevUser) => ({
      ...prevUser,
      responses: {
        ...prevUser.responses,
        [questionId]: response,
      },
    }));
  };
  
  const [quizQuestions] = React.useState<QuizQuestion[]>([
    //example question
    {
      id: 1,
      question: 'Do you love sport?',
      type: 'multipleChoice',
      options: [
        { key: 'no', text: 'No' },
        { key: 'yes', text: 'Yes' }      ],
    },
    {
      id: 2,
      question: 'What sport do you play',
      type: 'freeText',
      answer : ''
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
  ]);

  return (
    <section className={`${styles.quizzApp} ${hasTeamsContext ? styles.teams : ''}`}>
      <div className={styles.welcome}>
        <h1>Hello Dao Nguyen Quiz App!</h1>
        <div>
          <label>Name:</label>
          <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />

          <label>Address:</label>
          <input type="text" value={user.address} onChange={(e) => setUser({ ...user, address: e.target.value })} />
          {quizQuestions.map((question) => (
            <div key={question.id}>
              <p className={`${styles.quizzQuestion}`}>{question.question}</p>
              { (question.type === 'multipleChoice' && (
                <ChoiceGroup
                  options={question.options}
                  selectedKey={user.responses[question.id]}
                  onChange={(e, option) => handleQuizResponse(question.id, option!.key)}
                />
              ) ) || question.type === 'freeText' && (<TextField type="text" value='' onChange={(value) => handleQuizResponse(question.id, 'value')}/>)}
            </div>
          ))}
          <DefaultButton text="Submit Quiz" onClick={handleQuizSubmission} />
        </div>
      </div>
    </section>
  );
};

export default QuizzReact;
