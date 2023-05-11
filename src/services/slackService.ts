import axios from 'axios';
import { EventTypes } from './events';

const webhookUrl = 'https://hooks.slack.com/services/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'; //fetch
//const webhookUrl = 'https://hooks.slack.com/services/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'

/**
 * To send messages in slack.
 * @param {string} heading heading of the message
 * @returns {string}  data messages that need to send
 */
async function sendMessage(heading: any, data: any) {
    try {
        console.info('----- Sending slack message -----');

        const message = {
            attachments: [{
                color: heading === EventTypes.STRAPI_PROJECT_VALIDATION_FAILED ? '#FF0000' : '#00FF00',
                blocks: [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": `*${heading}*`
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": data
                        }
                    }
                ]
            }],
        }
        const response = await axios.post(webhookUrl, message);
        console.info(`----- Slack message sent successfully: ${(response.data)} -----`);
    } catch (error) {
        console.error('****** Error in sending slack message ******', error);
    }
}

export { sendMessage };

