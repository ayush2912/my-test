import { EventEmitter } from 'events';

import { sendMessage } from './slackService';

const EventTypes = {
    CREATING_STRAPI_PROJECT: 'Creating Strapi Project',
    UPDATING_STRAPI_PROJECT: 'Updating Strapi Project',
    DELETING_STRAPI_PROJECT: 'Deleting Strapi Project',
    STRAPI_PROJECT_VALIDATION_FAILED: 'Strapi Project Validation Failed',
};

const events = new EventEmitter();

events.on(EventTypes.CREATING_STRAPI_PROJECT, (ProjectName: string) => {
    sendMessage(
        'Creating New Strapi Project',
        `Project Name: ${ProjectName}
         Environment: ${process.env.ENVIRONMENT || 'Development'}`
    );
});

events.on(EventTypes.UPDATING_STRAPI_PROJECT, (ProjectName: string) => {
    sendMessage(
        'Updating Strapi Project',
        `Project Name: ${ProjectName}
         Environment: ${process.env.ENVIRONMENT || 'Development'}`
    );
});

events.on(EventTypes.DELETING_STRAPI_PROJECT, (ProjectName: string) => {
    sendMessage(
        'Deleting Strapi Project',
        `Project Name: ${ProjectName}
         Environment: ${process.env.ENVIRONMENT || 'Development'}`
    );
});

events.on(
    EventTypes.STRAPI_PROJECT_VALIDATION_FAILED,
    (ProjectName: string, errors: any) => {
        const errorMessage = errors.errors
            .map((error: any) => `msg: ${error.msg}`)
            .join('\n');

        sendMessage(
            'Strapi Project Validation Failed',
            `Project Name: ${ProjectName}
         Environment: ${process.env.ENVIRONMENT || 'development'}
         Errors: ${errorMessage}`
        );
    }
);

export { events, EventTypes };
