import fs from 'fs/promises';
import path from 'path';
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const CREDENTIALS_PATH = path.join(__dirname, '..', 'credentials.json');

const getAuthClient = async () => {
    const content = await fs.readFile(CREDENTIALS_PATH, { encoding: 'utf8' })
        .catch((error: Error) => console.log('Error loading client secret file:', error));

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { client_email, private_key } = JSON.parse(content as string);

    const client = new google.auth.JWT({
        email: client_email,
        key: private_key,
        scopes: SCOPES,
    });

    return client;
};

const getApiClient = async () => {
    const authClient = await getAuthClient();
    const { spreadsheets: apiClient } = google.sheets({
        version: 'v4',
        auth: authClient,
    });

    return apiClient;
};

export const getValuesData = async (id: string, range: string) => {
    const response = await (await getApiClient()).values.get({
        spreadsheetId: id,
        range,
    });

    return response.data;
};

export const updateValues = async (id: string, range: string, values: any[][]) => {
    // append finds table and adds to new row after last filled
    const response = await (await getApiClient()).values.append({
        spreadsheetId: id,
        range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values,
        },
    });

    return response;
};
