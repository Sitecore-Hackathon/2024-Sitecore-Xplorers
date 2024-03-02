import Head from 'next/head';
import { ReactElement } from 'react';
import { useState, useRef, useEffect } from 'react';
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

// You will need to set these environment variables or edit the following values
const { OpenAIClient, AzureKeyCredential } = require('@azure/openai');

const Copilot = (): JSX.Element => {
  return <div />;
};

Copilot.getLayout = function getLayout(page: ReactElement) {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesContainerRef = useRef(null);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Add the user's message to the chat interface
        setMessages([...messages, { text: input, user: true, error: false }]);
        setInput("");

        // Send the user's message to the chat assistant and add its response
        const response = await main(input);
        if (response) {
            const textWithLineBreaks = response.replace(/\n/g, '<br />');
            setMessages((v) => [...v, ...[{ text: textWithLineBreaks, user: false, error: false }]]);
        } else {
            const textWithLineBreaks = "There is a networking or application error, please reload and try again";
            setMessages((v) => [...v, ...[{ text: textWithLineBreaks, user: false, error: true }]]);
        }
    };


  async function main(input) {
    setIsLoading(true);
    const azureApiKey = "xxxxxx";
    const apiUrl = 'https://[Dynamic].openai.azure.com/openai/deployments/[Dynamic]/extensions/chat/completions?api-version=2023-07-01-preview';
    const requestBody = {
        temperature: 0,
        max_tokens: 1000,
        top_p: 1.0,
        dataSources: [
            {
                type: 'AzureCognitiveSearch',
                parameters: {
                    endpoint: 'https://[Dynamic].search.windows.net',
                    key: 'xxxxx',
                    indexName: 'sessions',
                },
            },
        ],
        messages: [
            {
                role: 'user',
                content: input,
            },
        ],
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api-key': azureApiKey,
            },
            body: JSON.stringify(requestBody),
        });
        //console.log("responseai", response);

        const responseData = await response.json();
        console.log("responseai", responseData);
        let message = ''
        message = responseData.choices[0].messages[1].content;
        console.log("combined", message);
        const sentences = message.split('.');

        // Remove [docX] from each sentence
        const cleanedSentences = sentences.map(sentence => {
            const cleaned = sentence.replace(/\[doc\d+\]/g, '').trim();
            return cleaned ? `${cleaned}.` : cleaned;
        });

        // Filter out any empty strings that might have been created
        const finalSentences = cleanedSentences.filter(sentence => sentence.length > 0);

        // Join the sentences back into a single string
        const finalText = finalSentences.join('\n');

        console.log(finalText);
        setIsLoading(false);
        return finalText;
    } catch (error) {
        setIsLoading(false);
        console.error('Error:', error.message);
    }

    console.log("inside")
}

  useEffect(() => {
    // Scroll to the bottom of the messages container when new messages are added
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      <Head>
        <title>PLAY! Summit - Copilot Itegration</title>
      </Head>
      <header>
        <div className="header-eyebrow">
          <div className="content"></div>
        </div>

        <nav className="main-navigation">
          <div className="navigation-content">
            <div className="controls-container container">
              <button className="items-toggle" aria-label="open menu" type="button">
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="items-container closed">
              <ul className="container">
                <li className="text-menu-item">
                  <a href="/sessions">Sessions</a>
                </li>
                <li className="text-menu-item">
                  <a href="/speakers">Speakers</a>
                </li>
                <li className="text-menu-item">
                  <a href="/vendors">Vendors</a>
                </li>
                <li className="text-menu-item">
                  <a href="/sponsors">Sponsors</a>
                </li>
                <li className="text-menu-item">
                  <a href="/about-us">About Us</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="section dynamic-welcome-message">
          <div className="container message-banner">
            <span>Welcome to PLAY! Summit Copilot.</span>
          </div>
        </section>
        <section className="section information-section">
          <div className="section-content container">
            <div className="information-grid">
              <section className="sectionSpace">
                <div className="mainContainer">
                  <div className="content">
                    <div style={{ margin: '0 4em', marginTop: '5px' }}>
                      <h1>Buyer Copilot</h1>
                      <div>I'm here to help</div>
                    </div>
                    <section>
                      {/* <div style={{ margin: "0 16em", padding: "1em 0em" }}></div> */}
                      <div className="card" style={{ margin: '0 4em', padding: '1em 2em' }}>
                        <div
                          className="chat-box"
                          style={{
                            height: '60vh',
                            overflowY: 'auto',
                            marginBottom: '15px',
                            padding: '0 10px',
                          }}
                          ref={messagesContainerRef}
                        >
                          {messages.map((message, index) => (
                            <div key={index}>
                              <div
                                className={`${'card'} ${
                                  message.user == true ? `${'userInput'}` : `${'response'}`
                                }`}
                              >
                                {' '}
                                <div dangerouslySetInnerHTML={{ __html: message.text }} />
                              </div>
                              <br />
                            </div>
                          ))}
                        </div>

                        <div></div>
                        <div
                          className={'card'}
                          style={{
                            margin: '0.5em 0',
                            padding: '10px',
                            backgroundColor: '#F5F7FA',
                            border: 'none',
                          }}
                        >
                          <form
                            onSubmit={handleSubmit}
                            className="input-form"
                            style={{ display: 'flex', justifyContent: 'space-between' }}
                          >
                            <input
                              type="text"
                              value={input}
                              onChange={(e) => setInput(e.target.value)}
                              placeholder="Type a message..."
                              style={{
                                width: '90%',
                                padding: '0 10px',
                                borderRadius: ' 10px',
                                marginRight: '10px',
                              }}
                            />
                            <button type="submit" className="custom-button primary">
                              Send
                            </button>
                          </form>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Copilot;
